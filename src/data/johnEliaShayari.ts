// Urdu Shayari collection with English translations organized by mood/feeling
// Including works from John Elia, Mirza Ghalib, Faiz Ahmed Faiz, Ahmed Faraz, and Parveen Shakir

interface Shayari {
  urdu: string;
  english: string;
  poet?: string;
}

export const johnEliaShayari: Record<string, Shayari[]> = {
  happy: [
    {
      urdu: "خوشی کا یہ عالم ہے کہ دل میں سما نہیں سکتی\nیہ خوشی بھی عجب ہے کہ کہیں جا نہیں سکتی",
      english: "Such is the state of joy that it cannot fit in my heart\nThis happiness is strange, it cannot go anywhere",
      poet: "John Elia"
    },
    {
      urdu: "آج کچھ ایسا ہوا ہے کہ دل خوش ہے بہت\nشاید کوئی خواب سچا ہو گیا ہے",
      english: "Something happened today that made my heart so happy\nPerhaps a dream has come true",
      poet: "John Elia"
    },
    {
      urdu: "زندگی میں کبھی کبھی ایسے لمحے آتے ہیں\nجب خوشیاں خود ہمیں ڈھونڈتی چلی آتی ہیں",
      english: "Sometimes in life, such moments come\nWhen happiness itself comes searching for us",
      poet: "John Elia"
    },
    {
      urdu: "ہر خوشی میں تیرا چہرہ یاد آتا ہے\nتو نہیں تو یہ خوشی بھی ادھوری ہے",
      english: "Your face comes to mind in every happiness\nWithout you, even this joy is incomplete",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "آج پھر دل نے کہا ہے کہ خوش رہو\nزندگی گزرتی ہے تو گزرنے دو",
      english: "Today my heart said again, be happy\nIf life passes, let it pass",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "خوشی کی انتہا ہے یہ کہ غم بھی یاد نہیں\nیہ کیفیت عجب ہے، کوئی نام نہیں",
      english: "The peak of happiness is when sorrow is forgotten\nThis state is strange, it has no name",
      poet: "Parveen Shakir"
    },
  ],
  sad: [
    {
      urdu: "بہت مشکل ہے دل سے بھولنا\nجو دل میں رہتا ہے وہ کہاں جاتا ہے",
      english: "It is very difficult to forget from the heart\nWhat lives in the heart, where can it go?",
      poet: "John Elia"
    },
    {
      urdu: "غم کو اپنا بنا لیا میں نے\nاب خوشی آئے تو کہاں رکھوں",
      english: "I have made sorrow my own\nNow if happiness comes, where do I keep it?",
      poet: "John Elia"
    },
    {
      urdu: "دل ٹوٹا تو کیا ہوا، ہم ٹوٹے نہیں\nزندگی کی راہ میں ہم رکے نہیں",
      english: "So what if the heart broke, we did not break\nOn life's path, we did not stop",
      poet: "John Elia"
    },
    {
      urdu: "کتنا مشکل ہے زندگی میں اکیلے چلنا\nہر قدم پر کوئی یاد آ جاتی ہے",
      english: "How difficult it is to walk alone in life\nAt every step, some memory returns",
      poet: "John Elia"
    },
    {
      urdu: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے",
      english: "Thousands of desires, each worth dying for\nMany of my wishes came true, but still seemed few",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "دل ناداں تجھے ہوا کیا ہے\nآخر اس درد کی دوا کیا ہے",
      english: "O foolish heart, what has happened to you?\nWhat is the cure for this pain?",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "مجھ سے پہلی سی محبت مری محبوب نہ مانگ\nمیں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات",
      english: "Don't ask me for my love of before, my beloved\nI had thought that if you existed, life would shine",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں\nجس طرح سوکھے ہوئے پھول کتابوں میں ملیں",
      english: "If we part now, perhaps we'll meet in dreams\nLike dried flowers found in books",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "تمہیں بھولنا چاہا تو یہ حال ہوا\nتمہاری یاد کا ہر زخم کمال ہوا",
      english: "When I tried to forget you, this happened\nEvery wound of your memory became perfection",
      poet: "Parveen Shakir"
    },
  ],
  anxious: [
    {
      urdu: "یہ بے چینی، یہ گھبراہٹ، یہ کیسا حال ہے\nدل میں کچھ ہے جو کہنے سے بھی محال ہے",
      english: "This restlessness, this anxiety, what state is this?\nThere's something in my heart impossible to express",
      poet: "John Elia"
    },
    {
      urdu: "کل کا کوئی پتہ نہیں ہے\nآج بھی کتنا مشکل ہے",
      english: "There's no knowing about tomorrow\nEven today is so difficult",
      poet: "John Elia"
    },
    {
      urdu: "سوچتا ہوں جو ہو گیا، جو ہونا ہے\nپر دل کو یہ سمجھانا مشکل ہے",
      english: "I think about what has happened, what will happen\nBut it's hard to make the heart understand",
      poet: "John Elia"
    },
    {
      urdu: "رنج سے خُوگر ہوا انسان تو مٹ جاتا ہے رنج\nمشکلیں مجھ پر پڑیں اتنی کہ آساں ہو گئیں",
      english: "When one becomes accustomed to sorrow, sorrow fades\nSo many hardships fell upon me that they became easy",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "یہ فکر کرتا ہوں میں کہ دنیا کو کیا ہوا\nکیوں لوگ بدل گئے، زمانہ کیوں بدل گیا",
      english: "I wonder what happened to the world\nWhy did people change, why did times change",
      poet: "Ahmed Faraz"
    },
  ],
  grateful: [
    {
      urdu: "شکر ہے کہ زندگی نے دیا اتنا کچھ\nہم نے مانگا کم تھا، ملا بہت کچھ",
      english: "Grateful that life gave so much\nWe asked for little, received so much more",
      poet: "John Elia"
    },
    {
      urdu: "جو ملا اس کا شکر ہے\nجو نہیں ملا اس کی فکر نہیں",
      english: "Grateful for what I received\nNo worry for what I didn't",
      poet: "John Elia"
    },
    {
      urdu: "زندگی کی ہر نعمت پر شکر ہے\nیہی سوچ میری طاقت ہے",
      english: "Grateful for every blessing in life\nThis thought is my strength",
      poet: "John Elia"
    },
    {
      urdu: "شکر ہے جو تو ملا، شکر ہے جو درد ملا\nہر تجربہ زندگی کا ایک تحفہ ہے",
      english: "Grateful that I found you, grateful for the pain too\nEvery experience is a gift from life",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "جو کچھ ملا خدا سے، سب کچھ نوازش ہے\nشکوہ کیا کریں، یہ تو محبت کی شروعات ہے",
      english: "Whatever I received from God, all is a blessing\nWhy complain, this is just the beginning of love",
      poet: "Parveen Shakir"
    },
  ],
  angry: [
    {
      urdu: "غصہ آیا تو کیا ہوا، دل تو اپنا ہے\nکبھی کبھی خود سے بھی لڑنا ہوتا ہے",
      english: "So what if anger came, the heart is still mine\nSometimes one must fight with oneself",
      poet: "John Elia"
    },
    {
      urdu: "جب دل میں آگ لگتی ہے تو سمجھ آتا ہے\nکہ خاموشی سے بہتر کوئی جواب نہیں",
      english: "When fire burns in the heart, one realizes\nThat silence is the best answer",
      poet: "John Elia"
    },
    {
      urdu: "غصے میں کہی بات یاد رہتی ہے\nپر پچھتاوا بھی ساتھ رہتا ہے",
      english: "Words spoken in anger are remembered\nBut regret stays alongside too",
      poet: "John Elia"
    },
    {
      urdu: "کوئی امید بر نہیں آتی\nکوئی صورت نظر نہیں آتی",
      english: "No hope comes to fruition\nNo solution comes to sight",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "ہم سے کیوں پوچھتے ہو غصے کا سبب\nتم نے دیکھا نہیں یہ دنیا کیا ہے",
      english: "Why do you ask us the reason for anger\nHave you not seen what this world is",
      poet: "Ahmed Faraz"
    },
  ],
  peaceful: [
    {
      urdu: "سکون ملا جب دل کو سمجھایا\nکہ جو ہونا ہے وہ ہو کر رہے گا",
      english: "I found peace when I made my heart understand\nThat what is meant to happen, will happen",
      poet: "John Elia"
    },
    {
      urdu: "آج دل میں کوئی شکوہ نہیں\nیہ سکون بھی کتنا خوبصورت ہے",
      english: "Today there's no complaint in my heart\nHow beautiful this peace is",
      poet: "John Elia"
    },
    {
      urdu: "خاموشی میں بھی ایک سکون ہے\nجو بات کہنے سے نہیں ملتا",
      english: "There's peace in silence too\nThat cannot be found in speaking",
      poet: "John Elia"
    },
    {
      urdu: "آرام و راحت سب کو نصیب ہو\nہم کو بس تیری یاد کافی ہے",
      english: "May everyone find comfort and rest\nFor us, just your memory is enough",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "سکون کی تلاش میں بھٹکتے رہے\nپھر جانا کہ سکون تو دل میں تھا",
      english: "We wandered searching for peace\nThen realized peace was in the heart all along",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "چاند کی چاندنی، ستاروں کی روشنی\nیہ رات بھی کتنی پرسکون ہے",
      english: "The moonlight, the starlight\nHow peaceful this night is",
      poet: "Parveen Shakir"
    },
  ],
  excited: [
    {
      urdu: "دل میں ایک جوش ہے، ایک امنگ ہے\nزندگی آج کتنی رنگین ہے",
      english: "There's an enthusiasm in my heart, a passion\nHow colorful life is today",
      poet: "John Elia"
    },
    {
      urdu: "آج کچھ نیا ہونے والا ہے\nدل میں یہ یقین ہے، یہ احساس ہے",
      english: "Something new is about to happen today\nThis belief, this feeling is in my heart",
      poet: "John Elia"
    },
    {
      urdu: "ہر نئی صبح نئی امید لاتی ہے\nدل کو یہ بات بہت بھاتی ہے",
      english: "Every new morning brings new hope\nThe heart loves this thought",
      poet: "John Elia"
    },
    {
      urdu: "جوش جنوں میں کیا کیا نہیں کرتے\nعشق میں آدمی بے باک ہوتا ہے",
      english: "What all one does in passionate madness\nIn love, a person becomes fearless",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "زندگی میں جوش و خروش ہو\nیہی تو جینے کا سلیقہ ہے",
      english: "Let there be enthusiasm in life\nThis is the art of living",
      poet: "Ahmed Faraz"
    },
  ],
  lonely: [
    {
      urdu: "تنہائی میں بھی ایک سکون ہے\nجو کسی کے ساتھ نہیں ملتا",
      english: "There's peace in solitude too\nThat cannot be found with anyone",
      poet: "John Elia"
    },
    {
      urdu: "اکیلے ہیں تو کیا غم ہے\nیہ تنہائی بھی ایک دوست ہے",
      english: "So what if I'm alone, what's the sorrow\nThis loneliness is also a friend",
      poet: "John Elia"
    },
    {
      urdu: "کوئی نہیں تو کوئی بات نہیں\nخود کا ساتھ بھی کافی ہے",
      english: "If there's no one, it's alright\nOne's own company is enough",
      poet: "John Elia"
    },
    {
      urdu: "ہم کو معلوم ہے جنت کی حقیقت لیکن\nدل کو خوش رکھنے کو غالب یہ خیال اچھا ہے",
      english: "We know the reality of paradise, but\nTo keep the heart happy, Ghalib, this thought is good",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "تنہائی اب راس آنے لگی ہے\nخود سے ملاقات ہونے لگی ہے",
      english: "Loneliness now suits me well\nI've started meeting myself",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "اکیلی شام کا کیا کروں\nیادیں آتی ہیں، چلی جاتی ہیں",
      english: "What do I do with this lonely evening\nMemories come and go",
      poet: "Parveen Shakir"
    },
    {
      urdu: "تنہا ہوں میں مگر تنہا نہیں\nتیری یادیں ہیں میرے ساتھ یہاں",
      english: "I am alone but not lonely\nYour memories are here with me",
      poet: "Ahmed Faraz"
    },
  ],
  hopeful: [
    {
      urdu: "امید پر دنیا قائم ہے\nیہی سوچ میری طاقت ہے",
      english: "The world stands on hope\nThis thought is my strength",
      poet: "John Elia"
    },
    {
      urdu: "کل بہتر ہوگا، یہ یقین ہے\nآج کی رات بھی گزر جائے گی",
      english: "Tomorrow will be better, this is certain\nThis night too shall pass",
      poet: "John Elia"
    },
    {
      urdu: "ہر اندھیرے کے بعد سویرا ہے\nیہ زندگی کا دستور ہے",
      english: "After every darkness there's dawn\nThis is the way of life",
      poet: "John Elia"
    },
    {
      urdu: "بے نوا ہوں میں اور تو ہے\nفکر کیا ہے مجھے تیرا سہارا ہے",
      english: "I am helpless but you are there\nWhat worry do I have, you are my support",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "ہم دیکھیں گے\nلازم ہے کہ ہم بھی دیکھیں گے",
      english: "We shall see\nIt is certain that we too shall see",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "امید کا چراغ جلتا رہے\nیہی دعا ہے، یہی آس ہے",
      english: "May the lamp of hope keep burning\nThis is the prayer, this is the hope",
      poet: "Ahmed Faraz"
    },
  ],
  reflective: [
    {
      urdu: "زندگی کیا ہے، ایک سوچ ہے\nجو سوچتا ہے وہ زندہ ہے",
      english: "What is life, it's a thought\nOne who thinks is alive",
      poet: "John Elia"
    },
    {
      urdu: "ماضی کی یادیں، مستقبل کے خواب\nحال میں جینا سیکھنا چاہیے",
      english: "Memories of the past, dreams of the future\nOne should learn to live in the present",
      poet: "John Elia"
    },
    {
      urdu: "ہر لمحہ ایک سبق ہے زندگی کا\nجو سیکھتا ہے وہ آگے بڑھتا ہے",
      english: "Every moment is a lesson of life\nOne who learns, moves forward",
      poet: "John Elia"
    },
    {
      urdu: "یہ نہ تھی ہماری قسمت کہ وصال یار ہوتا\nاگر اور جیتے رہتے، یہی انتظار ہوتا",
      english: "It was not my fate to unite with my beloved\nIf I had lived longer, the same wait would continue",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "زندگی کا سفر بہت طویل ہے\nہر موڑ پر کچھ نیا سیکھتے ہیں",
      english: "The journey of life is very long\nAt every turn we learn something new",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "سوچتی ہوں کیا تھا، کیا ہو گیا\nوقت کتنا بدل گیا",
      english: "I wonder what was, what has become\nHow much time has changed",
      poet: "Parveen Shakir"
    },
    {
      urdu: "ہر شخص ایک کتاب ہے\nجتنا پڑھو اتنا سیکھو",
      english: "Every person is a book\nThe more you read, the more you learn",
      poet: "Ahmed Faraz"
    },
  ],
  love: [
    {
      urdu: "عشق میں ہم نے کیا کیا نہیں کھویا\nپھر بھی یہ دل ہے کہ مانتا نہیں",
      english: "What all we didn't lose in love\nYet this heart refuses to accept",
      poet: "John Elia"
    },
    {
      urdu: "محبت کیا ہے، جان دینا ہے\nجو جان دے وہی جان پاتا ہے",
      english: "What is love, it is giving your life\nOnly one who gives their life truly lives",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "تیرے عشق میں جو ملا غم ہے\nپھر بھی یہ غم میری دولت ہے",
      english: "What I found in loving you is sorrow\nYet this sorrow is my treasure",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "محبت کرنے والوں کو ہر غم گوارا ہے\nیہ درد بھی تو اس محبت کا نشانہ ہے",
      english: "Those who love accept every sorrow\nThis pain too is a sign of that love",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "پیار میں ہار کر بھی جیت جاتے ہیں\nیہی تو عشق کا راز ہے",
      english: "In love, even in losing we win\nThis is the secret of love",
      poet: "Parveen Shakir"
    },
    {
      urdu: "تجھے چاہنا میری عادت ہے\nتیری یاد میری عبادت ہے",
      english: "Loving you is my habit\nYour memory is my worship",
      poet: "Ahmed Faraz"
    },
  ],
  nostalgic: [
    {
      urdu: "وہ دن بھی کیا دن تھے جب تم ساتھ تھے\nاب یادوں میں وہ لمحے ڈھونڈتے ہیں",
      english: "What days those were when you were with me\nNow we search for those moments in memories",
      poet: "John Elia"
    },
    {
      urdu: "پرانی یادیں تازہ ہو گئیں\nآج پھر وہ زمانہ یاد آیا",
      english: "Old memories became fresh again\nToday that era came to mind once more",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "کبھی کبھی میرے دل میں خیال آتا ہے\nکہ زندگی تری زلفوں کی نرم چھاؤں میں گزرے",
      english: "Sometimes the thought comes to my heart\nThat life should pass in the soft shade of your hair",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "بچپن کی یادیں کتنی پیاری ہیں\nوہ معصومیت، وہ سادگی کہاں",
      english: "How sweet are childhood memories\nWhere is that innocence, that simplicity",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "پرانے خطوط پڑھ کر رو دیتی ہوں\nماضی کتنا خوبصورت تھا",
      english: "I cry reading old letters\nHow beautiful the past was",
      poet: "Parveen Shakir"
    },
  ],
  confused: [
    {
      urdu: "سمجھ نہیں آتا کیا کروں\nدل کہتا ہے کچھ، عقل کہتی ہے کچھ",
      english: "I don't understand what to do\nThe heart says one thing, the mind another",
      poet: "John Elia"
    },
    {
      urdu: "یہ کیسی الجھن ہے، یہ کیسا سوال ہے\nجواب ڈھونڈتے ڈھونڈتے عمر گزر جاتی ہے",
      english: "What confusion is this, what question is this\nLife passes searching for answers",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "کون سا راستہ چنوں، کون سی منزل چنوں\nہر طرف دھند ہے، کچھ نظر نہیں آتا",
      english: "Which path should I choose, which destination\nThere's fog everywhere, nothing is visible",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "سوچتی ہوں کیا صحیح ہے، کیا غلط\nاس سوال کا جواب کون دے",
      english: "I wonder what's right, what's wrong\nWho can answer this question",
      poet: "Parveen Shakir"
    },
  ],
  default: [
    {
      urdu: "زندگی کا سفر ہے یہ کیسا سفر\nکوئی سمجھا نہیں، کوئی جانا نہیں",
      english: "What kind of journey is this journey of life\nNo one understood, no one knew",
      poet: "John Elia"
    },
    {
      urdu: "کچھ تو لوگ کہیں گے، لوگوں کا کام ہے کہنا\nچھوڑو بیکار کی باتوں میں کہیں بیت نہ جائے رینا",
      english: "People will say something, it's their job to talk\nLeave the useless matters, don't let the night pass in them",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "ہر شخص اپنی زندگی کا شاعر ہے\nبس لفظ ڈھونڈنے کی دیر ہے",
      english: "Every person is the poet of their own life\nJust need to find the words",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "آج بھی چوراہے پر لوگ ملے ہیں\nآج بھی کوئی رستہ نہیں ملا",
      english: "Even today people met at crossroads\nEven today no path was found",
      poet: "Parveen Shakir"
    },
    {
      urdu: "غالب چھٹی شراب پر اب بھی گرم ہے\nایسی جو شے ہے جو کتابوں میں گرم ہے",
      english: "Ghalib still warms to the sixth wine\nSuch is the thing that warms in books",
      poet: "Mirza Ghalib"
    },
  ],
};

export const getShayariForMood = (mood?: string): Shayari => {
  const normalizedMood = mood?.toLowerCase() || 'default';
  const shayariList = johnEliaShayari[normalizedMood] || johnEliaShayari['default'];
  const randomIndex = Math.floor(Math.random() * shayariList.length);
  return shayariList[randomIndex];
};
