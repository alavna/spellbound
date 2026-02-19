import type { ClassificationScenario } from '../types';

export const CLASSIFICATION_SCENARIOS: ClassificationScenario[] = [
  // --- Style ---
  {
    id: 'cls-style-formal',
    title: 'Style: Formal Business Letter',
    description: 'Formal business writing that should be classified as formal style.',
    source: 'custom',
    paragraphs: [
      'Dear Board of Directors, I am writing to formally submit my quarterly report regarding the fiscal performance of our Southeast Asian operations. The enclosed documentation provides a comprehensive analysis of revenue streams, operational expenditures, and projected growth trajectories for the upcoming fiscal year.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'style', expectedLabel: 'formal' },
    ],
  },
  {
    id: 'cls-style-casual',
    title: 'Style: Casual Blog Post',
    description: 'Casual writing that should be classified as casual style.',
    source: 'custom',
    paragraphs: [
      "Hey everyone! So I just tried this amazing new coffee shop downtown and honestly? It's a total game-changer. The vibes are immaculate, the baristas are super friendly, and don't even get me started on their oat milk latte.",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'style', expectedLabel: 'casual' },
    ],
  },
  {
    id: 'cls-style-academic',
    title: 'Style: Academic Paper',
    description: 'Academic writing with citations and formal structure.',
    source: 'custom',
    paragraphs: [
      'The phenomenon of cognitive dissonance, as first theorized by Festinger (1957), posits that individuals experience psychological discomfort when holding two contradictory beliefs simultaneously. Subsequent meta-analyses (Harmon-Jones & Mills, 2019) have demonstrated that the magnitude of dissonance is modulated by the perceived importance of the conflicting cognitions.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'style', expectedLabel: 'academic' },
    ],
  },
  {
    id: 'cls-style-marketing',
    title: 'Style: Marketing Copy',
    description: 'Persuasive marketing language.',
    source: 'custom',
    paragraphs: [
      "Transform your mornings with our revolutionary SmartBrew Pro! Experience barista-quality coffee at the touch of a button. Limited time offer: 40% off plus FREE shipping. Don't miss out — join 50,000+ happy customers today!",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'style', expectedLabel: 'marketing' },
    ],
  },

  // --- Clarity ---
  {
    id: 'cls-clarity-clear',
    title: 'Clarity: Clear Instructions',
    description: 'Well-structured, easy-to-follow writing.',
    source: 'custom',
    paragraphs: [
      'To reset your password, follow these three steps. First, click the "Forgot Password" link on the login page. Second, enter the email address associated with your account. Third, check your inbox for a reset link and click it within 24 hours.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'clarity', expectedLabel: 'clear' },
    ],
  },
  {
    id: 'cls-clarity-vague',
    title: 'Clarity: Vague Corporate Speak',
    description: 'Vague, unclear corporate language.',
    source: 'custom',
    paragraphs: [
      'Going forward, we need to leverage our synergies to drive meaningful impact across various touchpoints. The team should focus on optimizing holistic solutions that align with our strategic vision and create value-add propositions for key stakeholders in the ecosystem.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'clarity', expectedLabel: 'vague' },
    ],
  },
  {
    id: 'cls-clarity-verbose',
    title: 'Clarity: Overly Verbose',
    description: 'Writing that uses far more words than necessary.',
    source: 'custom',
    paragraphs: [
      'It is absolutely essential and critically important at this particular point in time for us to take into careful and thorough consideration the wide variety of different factors and variables that could potentially have a significant and meaningful impact on the final outcome and result of the project that we are currently in the process of working on.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'clarity', expectedLabel: 'verbose' },
    ],
  },
  {
    id: 'cls-clarity-concise',
    title: 'Clarity: Concise Technical Writing',
    description: 'Efficient, direct communication.',
    source: 'custom',
    paragraphs: [
      'The server crashed at 3:42 AM UTC. Root cause: disk full. Fix: expanded storage to 500GB, added monitoring alert at 80% capacity. ETA for full recovery: 15 minutes.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'clarity', expectedLabel: 'concise' },
    ],
  },

  // --- Tone ---
  {
    id: 'cls-tone-friendly',
    title: 'Tone: Friendly Customer Support',
    description: 'Warm, approachable tone.',
    source: 'custom',
    paragraphs: [
      "Hi there! Thanks so much for reaching out to us. I totally understand how frustrating that must be, and I'm here to help sort this out for you. Let me take a look at your account right away. We'll get this fixed in no time!",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'tone', expectedLabel: 'friendly' },
    ],
  },
  {
    id: 'cls-tone-critical',
    title: 'Tone: Critical Review',
    description: 'Critical, evaluative tone.',
    source: 'custom',
    paragraphs: [
      'The proposed methodology suffers from several fundamental flaws. The sample size is woefully inadequate, the control group was poorly selected, and the statistical analysis fails to account for confounding variables. These oversights undermine the credibility of the entire study.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'tone', expectedLabel: 'critical' },
    ],
  },
  {
    id: 'cls-tone-assertive',
    title: 'Tone: Assertive Leadership',
    description: 'Confident, directive tone.',
    source: 'custom',
    paragraphs: [
      'We will ship this feature by Friday. No exceptions. I need the backend team to finalize the API by Wednesday, QA to complete testing by Thursday, and deployment to happen first thing Friday morning. If you see blockers, escalate immediately.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'tone', expectedLabel: 'assertive' },
    ],
  },
  {
    id: 'cls-tone-empathetic',
    title: 'Tone: Empathetic Communication',
    description: 'Empathetic, understanding tone.',
    source: 'custom',
    paragraphs: [
      "I understand this has been an incredibly difficult time for you and your family. Losing a loved one is never easy, and it's completely natural to feel overwhelmed right now. Please know that there's no rush — take all the time you need, and we're here to support you however we can.",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'tone', expectedLabel: 'empathetic' },
    ],
  },

  // --- Cliche ---
  {
    id: 'cls-cliche-heavy',
    title: 'Cliche: Overused Phrases',
    description: 'Text loaded with cliches.',
    source: 'custom',
    paragraphs: [
      "At the end of the day, it is what it is. We need to think outside the box and push the envelope. Going forward, let's give 110% and leave no stone unturned. It's not rocket science — we just need to hit the ground running and move the needle.",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'cliche', expectedLabel: 'cliche' },
    ],
  },
  {
    id: 'cls-cliche-original',
    title: 'Cliche: Original Phrasing',
    description: 'Fresh, original language.',
    source: 'custom',
    paragraphs: [
      "The startup's culture reminded me of a jazz ensemble — each person improvising within a shared framework, listening intently to one another's contributions while finding unexpected moments of harmony. Mistakes weren't failures; they were riffs that led somewhere new.",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'cliche', expectedLabel: 'original phrasing' },
    ],
  },

  // --- Bias ---
  {
    id: 'cls-bias-neutral',
    title: 'Bias: Neutral Reporting',
    description: 'Balanced, unbiased text.',
    source: 'custom',
    paragraphs: [
      'The city council voted 7-4 to approve the new zoning ordinance. Supporters argued it would encourage affordable housing development, while opponents raised concerns about increased traffic density and infrastructure costs. A public comment period will remain open until March 15.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'bias', expectedLabel: 'neutral' },
    ],
  },
  {
    id: 'cls-bias-loaded',
    title: 'Bias: Loaded Language',
    description: 'Text with loaded, biased language.',
    source: 'custom',
    paragraphs: [
      'The radical activists stormed the meeting, pushing their extreme agenda on hardworking taxpayers. Their reckless demands would devastate local businesses and destroy the character of our beloved neighborhoods. Sensible residents must fight back against this dangerous ideology.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'bias', expectedLabel: 'loaded' },
    ],
  },
  {
    id: 'cls-bias-stereotyping',
    title: 'Bias: Stereotyping Language',
    description: 'Text containing stereotyping assumptions.',
    source: 'custom',
    paragraphs: [
      "It's no surprise the engineering team is struggling — most of them are fresh out of college and don't have the maturity to handle real pressure. You really need experienced older workers who understand how things actually work. Young people these days just want to work from home and avoid responsibility.",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'bias', expectedLabel: 'stereotyping-risk' },
    ],
  },

  // --- Multi-dimension scenarios ---
  {
    id: 'cls-multi-formal-clear',
    title: 'Multi: Formal + Clear Technical Doc',
    description: 'Clear formal writing tested on multiple dimensions.',
    source: 'custom',
    paragraphs: [
      'This API endpoint accepts POST requests with a JSON body containing a "query" field (string, required) and an optional "limit" field (integer, default 10). Responses are returned as JSON arrays sorted by relevance score in descending order. Authentication requires a Bearer token in the Authorization header.',
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'style', expectedLabel: 'formal' },
      { dimension: 'clarity', expectedLabel: 'clear' },
      { dimension: 'tone', expectedLabel: 'assertive' },
    ],
  },
  {
    id: 'cls-multi-casual-cliche',
    title: 'Multi: Casual + Cliche Blog',
    description: 'Casual writing with cliches.',
    source: 'custom',
    paragraphs: [
      "So basically, at the end of the day, this product is a total game-changer. I know everyone says that, but trust me, it really is. It's the best thing since sliced bread. If you're on the fence, just take the plunge — you won't regret it!",
    ],
    expectedIssues: [],
    expectedClassifications: [
      { dimension: 'style', expectedLabel: 'casual' },
      { dimension: 'cliche', expectedLabel: 'cliche' },
    ],
  },
];
