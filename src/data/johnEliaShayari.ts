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
      urdu: "ہنسی آئی تو آنکھوں میں چمک سی آ گئی\nتری یاد آئی تو دنیا بدل سی گئی",
      english: "When laughter came, a sparkle lit my eyes\nWhen your memory came, the whole world transformed",
      poet: "John Elia"
    },
    {
      urdu: "وہ مسکرائے تو گلستاں کھل گیا\nہر خزاں میں بھی بہاروں کا سماں ہو گیا",
      english: "When they smiled, the garden bloomed\nEven in autumn, spring's splendor appeared",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "خوشی اتنی ہے کہ سینے میں سمائے نہیں\nیہ دل ہے کہ اب کسی غم کو پہچانے نہیں",
      english: "Such joy that my heart cannot contain it\nThis heart no longer recognizes any sorrow",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "زندگی کی بہاریں لوٹ آئیں ایسے\nجیسے صحرا میں کہیں چشمہ نکل آیا ہو",
      english: "Life's springs returned in such a way\nAs if a fountain emerged in the desert",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "تیرے ملنے سے پہلے تیرے ملنے کے بعد\nسب کچھ بدلا بدلا سا لگتا ہے مجھے",
      english: "Before meeting you and after meeting you\nEverything feels beautifully changed to me",
      poet: "Parveen Shakir"
    },
    {
      urdu: "کتنی پیاری ہے یہ دنیا آج\nہر طرف نور ہی نور ہے",
      english: "How lovely the world is today\nThere is light everywhere",
      poet: "John Elia"
    },
    {
      urdu: "جب سے دل کو سکون ملا ہے\nہر لمحہ جشن سا لگتا ہے",
      english: "Since the heart found peace\nEvery moment feels like a celebration",
      poet: "Ahmed Faraz"
    },
  ],
  sad: [
    {
      urdu: "اشک آنکھوں میں کب نہیں آتے\nلہو آتا ہے جب نہیں آتے",
      english: "When do tears not come to the eyes\nBlood comes when they don't",
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
      urdu: "وہ فراق اور وہ وصال کہاں\nوہ شب و روز و ماہ و سال کہاں",
      english: "Where is that separation and that union\nWhere are those nights, days, months and years",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "میں نے دیکھے ہیں اُس کی آنکھوں میں آنسو\nاُن کا روپ بدل گیا، میرا قصور نہیں",
      english: "I have seen tears in their eyes\nTheir form changed, it's not my fault",
      poet: "John Elia"
    },
    {
      urdu: "کوئی دن گر زندگانی اور ہے\nاپنے جی میں ہم نے ٹھانی اور ہے",
      english: "If life has a few more days\nWe have resolved something else in our heart",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "غمِ ہستی کا اسد کس سے ہو جز مرگ علاج\nشمع ہر رنگ میں جلتی ہے سحر ہونے تک",
      english: "What cure is there for life's sorrow except death\nThe candle burns in every color until dawn",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "نہ گل نکلے نہ بو آئی بہار آئی نہ آئی\nقفس میں ہی گذر جاتی ہے عمر نالاں کی",
      english: "No flower bloomed, no fragrance came, spring came or not\nLife passes in this cage, lamenting",
      poet: "Faiz Ahmed Faiz"
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
      urdu: "تیری رحمت کے دریا بے حساب\nہم گنہگار تیرے در پہ کھڑے",
      english: "The rivers of Your mercy are countless\nWe sinners stand at Your door",
      poet: "Allama Iqbal"
    },
    {
      urdu: "ہر نفس میں تیرا شکر ادا کروں\nاتنی توفیق کہاں میرے خدا",
      english: "To thank You with every breath\nWhere do I have such ability, my Lord",
      poet: "John Elia"
    },
    {
      urdu: "تو نے بخشا جو درد تو ہم نے سہا\nتو نے دی جو خوشی تو ہم نے جیا",
      english: "The pain You gave, we endured\nThe joy You gave, we lived",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "شکر ہے تیرا کہ آنکھیں دیں مجھے\nورنہ یہ حسن کہاں نظر آتا",
      english: "Thanks to You for giving me eyes\nOtherwise, where would I see this beauty",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "قطرے کو بخشا سمندر بننے کا ہنر\nتیرے کرم کا یہ اندازہ کیا کریں",
      english: "You gave the drop the art of becoming an ocean\nHow do we measure such grace",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "زندگی گزرتی ہے تو گزرنے دو\nہر سانس میں شکر ہے، یہ کافی ہے",
      english: "If life passes, let it pass\nThere's gratitude in every breath, that's enough",
      poet: "Parveen Shakir"
    },
    {
      urdu: "جو ملا رب سے سب عطا ہے\nجو نہ ملا شاید امتحان ہے",
      english: "What we received from the Lord is a gift\nWhat we didn't is perhaps a test",
      poet: "John Elia"
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
      urdu: "چاندنی رات کی خاموشی میں\nدل کو اپنی ہی دھڑکن سنائی دیتی ہے",
      english: "In the silence of a moonlit night\nThe heart can hear its own heartbeat",
      poet: "John Elia"
    },
    {
      urdu: "پرندوں کی طرح آزاد ہوں میں\nنہ کوئی بندھن، نہ کوئی فکر",
      english: "I am free like the birds\nNo bonds, no worries",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "ٹھہرے ہوئے پانی سا یہ دل\nکوئی لہر نہیں، کوئی طوفان نہیں",
      english: "This heart like still water\nNo waves, no storms",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "صبح کی ٹھنڈی ہوا میں\nزندگی کا سکون چھپا ہے",
      english: "In the cool morning breeze\nLife's peace is hidden",
      poet: "Parveen Shakir"
    },
    {
      urdu: "آرام و راحت سب کو نصیب ہو\nہم کو بس تیری یاد کافی ہے",
      english: "May everyone find comfort and rest\nFor us, just your memory is enough",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "نیند آتی ہے سکون سے آج\nکوئی فکر نہیں، کوئی خیال نہیں",
      english: "Sleep comes peacefully today\nNo worries, no thoughts",
      poet: "John Elia"
    },
    {
      urdu: "دریا کے کنارے بیٹھے ہیں ہم\nپانی بہتا ہے، وقت ٹھہرا ہے",
      english: "We sit by the river\nWater flows, time stands still",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "یہ سکون ہے یا خواب ہے\nجو بھی ہے، بس رہنے دو",
      english: "Is this peace or a dream\nWhatever it is, let it stay",
      poet: "Faiz Ahmed Faiz"
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
      urdu: "ہم کو معلوم ہے جنت کی حقیقت لیکن\nدل کو خوش رکھنے کو غالب یہ خیال اچھا ہے",
      english: "We know the reality of paradise, but\nTo keep the heart happy, Ghalib, this thought is good",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "کوئی نہیں ہے کوئی یہاں\nمیں ہوں مگر میں کہاں ہوں",
      english: "There is no one here\nI exist, but where am I",
      poet: "John Elia"
    },
    {
      urdu: "تنہائی نے سکھایا ہے مجھے\nاپنا ہمدم خود بننا",
      english: "Loneliness has taught me\nTo become my own companion",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "چاند بھی تنہا ہے آسمان میں\nتارے دور سے دیکھتے ہیں بس",
      english: "The moon is also lonely in the sky\nStars only watch from afar",
      poet: "Parveen Shakir"
    },
    {
      urdu: "شور میں سب سے جدا ہوں\nخاموشی میرا گھر ہے",
      english: "I am separate from all in the noise\nSilence is my home",
      poet: "John Elia"
    },
    {
      urdu: "لوگ کہتے ہیں کہ تنہائی بری ہے\nمیں کہتا ہوں یہ سچی ہے",
      english: "People say loneliness is bad\nI say it is honest",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "وہ ملے تو گھڑیاں بن جائیں صدیاں\nاب کے وہ بچھڑے تو ملتے نہیں",
      english: "When we met, hours became centuries\nNow that we parted, we don't meet again",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "بے نام سی تنہائی میں\nخود کو پہچاننے لگا ہوں",
      english: "In this nameless solitude\nI've started recognizing myself",
      poet: "John Elia"
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
      urdu: "محبت کرنے والے کم نہ ہوں گے\nتری محفل میں لیکن ہم نہ ہوں گے",
      english: "Those who love will not be few\nBut in your gathering, I will not be there",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "ہم تو محبت کا بت ہیں، ہم کو سجدہ کریں سب\nہم بھی سجدے میں گرے ہیں جس کی صورت دیکھ کر",
      english: "I am an idol of love, everyone bows to me\nI too fell prostrate seeing someone's face",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "تجھ سے نظر ملی تو یہ آنکھیں نہ کام آئیں\nاب میری آنکھوں میں تو ہی رہتا ہے",
      english: "When my eyes met yours, they stopped working\nNow only you live in my eyes",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "اک فقیرانہ آیا، صدا کر چلا\nمیں نے پوچھا محبت؟ وہ مسکرا چلا",
      english: "A beggar came and called out\nI asked, 'Love?' He smiled and walked away",
      poet: "John Elia"
    },
    {
      urdu: "تیری آنکھوں کے سوا دنیا میں رکھا کیا ہے\nسارا جہاں ہے تو کیا، تو نہیں تو کیا ہے",
      english: "What else is there in this world but your eyes\nWhat is the whole world, if you're not there, what is there",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "دل کی بات لبوں تک آتے آتے رک گئی\nاور وہ سمجھ گئے، یہی تو محبت ہے",
      english: "The heart's words stopped before reaching my lips\nAnd they understood - this is love",
      poet: "Parveen Shakir"
    },
    {
      urdu: "عشق ہے تو سمجھ میں آئے گا\nعشق نہیں تو کچھ بھی سمجھایا نہیں جا سکتا",
      english: "If it's love, you will understand\nIf it's not, nothing can be explained",
      poet: "John Elia"
    },
    {
      urdu: "رنگ لایا ہے خون دل آخر\nچمن ہی چمن گلزار ہو گیا",
      english: "The heart's blood has finally borne fruit\nGarden after garden has bloomed",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "کبھی ہم میں تم میں چرچا تھا\nکبھی ہم سے تم سے ملنا تھا",
      english: "Once there was talk between us\nOnce we used to meet",
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
      urdu: "ہر اک بات پہ کہتے ہو تم کہ تو کیا ہے\nتمہیں کہوں میں کہ تم کیا ہو، تو کیا ہے",
      english: "At everything you ask, 'What are you?'\nShall I tell you what you are, what is there",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "کچھ تو لوگ کہیں گے، لوگوں کا کام ہے کہنا\nچھوڑو بیکار کی باتوں میں کہیں بیت نہ جائے رینا",
      english: "People will say something, it's their job to talk\nLeave the useless matters, don't let the night pass in them",
      poet: "Faiz Ahmed Faiz"
    },
    {
      urdu: "ہزار داغ ہیں اور ہر داغ پہ روتا ہوں\nجو تو نے چھیڑا میرے دل کا راز تو کیا ہوتا",
      english: "I have a thousand wounds and I weep at each\nWhat would have happened if you had revealed my heart's secret",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "یہ زندگی کسی منزل کی تلاش میں ہے\nاور منزل بھی ہے کہ بس ملتی نہیں",
      english: "This life is in search of a destination\nAnd the destination simply cannot be found",
      poet: "Ahmed Faraz"
    },
    {
      urdu: "بے خودی لے گئی کہاں ہم کو\nدیر سے انتظار ہے اپنا",
      english: "Where has this rapture taken us\nWe have been waiting for ourselves for long",
      poet: "Mirza Ghalib"
    },
    {
      urdu: "ہر لمحہ ایک نیا سفر ہے\nاور ہر سفر میں اپنی کہانی",
      english: "Every moment is a new journey\nAnd every journey has its own story",
      poet: "Parveen Shakir"
    },
    {
      urdu: "وہ لوگ بہت خوش نصیب تھے\nجنہوں نے محبت کی، جی بھر کے",
      english: "Those people were very fortunate\nWho loved, with all their heart",
      poet: "John Elia"
    },
  ],
};

export const getShayariForMood = (mood?: string): Shayari => {
  const normalizedMood = mood?.toLowerCase() || 'default';
  const shayariList = johnEliaShayari[normalizedMood] || johnEliaShayari['default'];
  const randomIndex = Math.floor(Math.random() * shayariList.length);
  return shayariList[randomIndex];
};
