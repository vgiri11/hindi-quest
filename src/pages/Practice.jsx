import Card from '../components/Card'

const groups = [
  {
    label: 'Speaking & Language',
    sessions: [
      {
        id: 'p1',
        icon: '💬',
        title: 'Basic Hindi Conversation',
        description: 'A 15-minute guided conversation in Hindi. Claude adapts to your level and corrects mistakes gently.',
        prompt: 'You are a patient Hindi tutor. I am a German beginner learning Hindi. Start a simple Hindi conversation with me, adapting to my level. Correct my grammar gently after each of my messages, and explain why. Ask me about simple topics like my day, where I live, what I like. If I get stuck, offer a hint in brackets.',
      },
      {
        id: 'p2',
        icon: '📐',
        title: 'Grammar Drill',
        description: 'Deep dive into one grammar concept. Claude explains it, then drills it with exercises until it clicks.',
        prompt: 'You are a Hindi grammar expert. Ask me which grammar topic I want to work on (options: SOV word order, postpositions, verb tenses, questions, negation, commands). Then explain it clearly with examples, give me 10 exercises, and correct each one with a brief explanation.',
      },
      {
        id: 'p3',
        icon: '🎤',
        title: 'Pronunciation Coach',
        description: 'Focus on Hindi sounds that don\'t exist in German. Claude explains mouth position and gives minimal pairs.',
        prompt: 'You are a Hindi pronunciation coach working with a German speaker. Explain the Hindi sounds that German speakers struggle with most: retroflex consonants (ट ठ ड ढ), aspirated stops (ख घ छ झ), and the difference between short and long vowels. Give me example words for each, explain how to position my mouth, and then test me with some minimal pairs.',
      },
      {
        id: 'p4',
        icon: '📖',
        title: 'Vocabulary Builder',
        description: '10 new words chosen for your level — each with a sentence, etymology note, and an Anki-ready definition.',
        prompt: 'You are a Hindi vocabulary teacher. Give me 10 high-frequency Hindi words I likely don\'t know yet, chosen for an intermediate-beginner learner. For each word: (1) the word in Devanagari, (2) romanization, (3) English meaning, (4) an example sentence in Hindi with translation, (5) a one-line memory hook. Format it clearly so I can copy the words into Anki.',
      },
      {
        id: 'p5',
        icon: '✏️',
        title: 'Error Correction',
        description: 'Write a paragraph in Hindi. Claude marks every error, explains each one, and gives you a corrected version.',
        prompt: 'You are a Hindi writing tutor. I will write a short paragraph in Hindi (or a mix of Hindi and romanization if I\'m not confident with the script yet). Please: (1) show my original text, (2) mark every grammar, vocabulary, or word order error with a [bracket] and explanation, (3) give the fully corrected version. Be thorough — I want to catch every mistake.',
      },
      {
        id: 'p6',
        icon: '✍️',
        title: 'Script Practice',
        description: 'Dictation and transliteration exercises to build Devanagari reading and writing speed.',
        prompt: 'You are a Devanagari script teacher. Give me a script practice session: (1) first, give me 10 Hindi words in romanization and ask me to write them in Devanagari — I\'ll type my attempts, (2) then give me 5 simple sentences in Devanagari to read aloud and translate. Correct everything I submit.',
      },
    ],
  },
  {
    label: 'Comedy & Show Prep',
    sessions: [
      {
        id: 'p7',
        icon: '🎭',
        title: 'Clap Back Rehearsal',
        description: 'Claude plays Abhishek Upmanyu. You get called out. Practice responding until it\'s second nature.',
        prompt: 'You are playing Abhishek Upmanyu at a live comedy show. I am a German audience member who speaks some Hindi. Your job is to call me out, make jokes at my expense, and test my Hindi. Be playful but sharp — vary your approaches (ask what I\'m doing there, question my Hindi, call me "gora", etc). After each exchange, briefly note in English what worked and what I could do better.',
      },
      {
        id: 'p8',
        icon: '🎯',
        title: 'Comedy Context',
        description: 'Deep dive into why Rahul\'s jokes work. Learn the cultural logic behind the humor.',
        prompt: 'You are an expert in Indian stand-up comedy, specifically Abhishek Upmanyu\'s style. Explain: (1) what kinds of audience members he typically targets and why, (2) the cultural assumptions behind his "gora at an Indian show" material, (3) why brevity and deadpan delivery work especially well in Hindi comedy, (4) how to use the "surprise competence" move — being assumed clueless, then responding sharply. Give me 3 specific example exchanges I could learn from.',
      },
      {
        id: 'p9',
        icon: '🃏',
        title: 'Audience Member Roleplay',
        description: 'Full show simulation. You\'re in the crowd. Claude is Rahul. No script — improvise.',
        prompt: 'We are going to do a full comedy show simulation. You are Abhishek Upmanyu on stage. I am sitting in the front row as a German audience member. Start the show, do some crowd work, eventually notice me and engage with me. Be natural, be funny, be unpredictable. The whole interaction should be in Hindi — only switch to English briefly if you need to clarify something. Go.',
      },
      {
        id: 'p10',
        icon: '⚡',
        title: 'Improvisation Practice',
        description: 'Random questions in Hindi. You respond immediately — no prep, no pausing, no English.',
        prompt: 'You are going to ask me 15 random questions in Hindi, one at a time. The questions should range from easy (what\'s your name, where are you from) to harder (what do you think about cricket, describe your ideal weekend in Hindi). After I answer each one, give me a one-line feedback note in English. Then immediately ask the next question. Start now.',
      },
    ],
  },
]

export default function Practice() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Practice</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Each session opens Claude with a pre-written prompt. Click Start and go.
        </p>
      </div>

      {groups.map(group => (
        <div key={group.label}>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
            {group.label}
          </h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {group.sessions.map(session => (
              <Card key={session.id} className="p-4 flex flex-col gap-3">
                <div className="text-2xl">{session.icon}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{session.title}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{session.description}</p>
                </div>
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(session.prompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-sm font-medium text-right"
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}
                >
                  Start →
                </a>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
