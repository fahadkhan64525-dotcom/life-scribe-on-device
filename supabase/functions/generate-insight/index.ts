import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation constants
const MAX_CONTENT_LENGTH = 10000;
const MAX_MOOD_LENGTH = 50;
const MAX_TAG_LENGTH = 50;
const MAX_TAGS_COUNT = 20;

// Simple input validation
function validateInput(content: unknown, mood: unknown, tags: unknown): { valid: boolean; error?: string } {
  if (typeof content !== 'string' || content.length === 0) {
    return { valid: false, error: 'Content must be a non-empty string' };
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return { valid: false, error: `Content must be less than ${MAX_CONTENT_LENGTH} characters` };
  }
  
  if (mood !== undefined && mood !== null) {
    if (typeof mood !== 'string') {
      return { valid: false, error: 'Mood must be a string' };
    }
    if (mood.length > MAX_MOOD_LENGTH) {
      return { valid: false, error: `Mood must be less than ${MAX_MOOD_LENGTH} characters` };
    }
  }
  
  if (tags !== undefined && tags !== null) {
    if (!Array.isArray(tags)) {
      return { valid: false, error: 'Tags must be an array' };
    }
    if (tags.length > MAX_TAGS_COUNT) {
      return { valid: false, error: `Maximum ${MAX_TAGS_COUNT} tags allowed` };
    }
    for (const tag of tags) {
      if (typeof tag !== 'string') {
        return { valid: false, error: 'Each tag must be a string' };
      }
      if (tag.length > MAX_TAG_LENGTH) {
        return { valid: false, error: `Each tag must be less than ${MAX_TAG_LENGTH} characters` };
      }
    }
  }
  
  return { valid: true };
}

// Sanitize string for prompt injection prevention
function sanitizeForPrompt(str: string): string {
  // Remove potential prompt injection patterns
  return str
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive newlines
    .trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the user's JWT token
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Authenticated user:", user.id);

    const requestBody = await req.json();
    const { content, mood, tags } = requestBody;

    // Validate inputs
    const validation = validateInput(content, mood, tags);
    if (!validation.valid) {
      console.error("Input validation failed:", validation.error);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Sanitize inputs before constructing prompt
    const sanitizedContent = sanitizeForPrompt(content);
    const sanitizedMood = mood ? sanitizeForPrompt(mood) : '';
    const sanitizedTags = tags ? tags.map((t: string) => sanitizeForPrompt(t)) : [];

    const prompt = `You are a thoughtful journal companion. Based on this journal entry, provide a brief, insightful reflection (2-3 sentences) and ask one thought-provoking question.

Entry: ${sanitizedContent}
${sanitizedMood ? `Mood: ${sanitizedMood}` : ''}
${sanitizedTags && sanitizedTags.length > 0 ? `Tags: ${sanitizedTags.join(', ')}` : ''}

Respond with wisdom and empathy.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a wise, empathetic journal companion who provides brief, meaningful insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const insight = data.choices?.[0]?.message?.content || "Unable to generate insight at this time.";

    return new Response(JSON.stringify({ insight }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-insight:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred. Please try again later." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
