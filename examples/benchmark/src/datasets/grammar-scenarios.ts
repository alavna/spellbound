import type { TestScenario } from '../types';

/**
 * Grammar-focused scenarios modeled after ESL-learner errors commonly found in
 * CoNLL-2014 and BEA-2019 datasets. These cover the standard GEC error taxonomy:
 *
 * - Article errors (a/an/the/∅)
 * - Preposition errors (in/on/at/to/for)
 * - Subject-verb agreement
 * - Noun number (singular/plural)
 * - Verb tense / verb form
 * - Word form (adjective/adverb/noun confusion)
 * - Pronoun errors
 * - Word choice
 * - Sentence fragments and run-ons
 * - Redundancy / wordiness
 *
 * All scenarios use source: 'custom' so they get standard F0.5 evaluation.
 */

export const grammar_articles: TestScenario = {
  id: 'grammar-articles',
  title: 'Grammar: Article Errors',
  description: 'Tests detection of missing, extra, and wrong articles (a/an/the).',
  source: 'custom',
  paragraphs: [
    `I went to university in United States. It was best decision of my life. I studied the computer science for four years and graduated with the honors.`,
    `She is a honest person who always tells truth. Yesterday she found the wallet on street and returned it to owner immediately.`,
    `The life is short, so we should enjoy every moment. I believe that the education is important for the success in modern world.`,
    `He bought a new car last week. Car is very expensive but he needed the reliable transportation for his job at the hospital.`,
    `An European tourist asked me for directions to a airport. I told her to take the bus number 42 and get off at the third stop.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'in United States', expectedFix: 'in the United States', description: 'Missing article: the United States' },
    { type: 'grammar', originalText: 'was best decision', expectedFix: 'was the best decision', description: 'Missing article before superlative' },
    { type: 'grammar', originalText: 'the computer science', expectedFix: 'computer science', description: 'Unnecessary article before uncountable noun' },
    { type: 'grammar', originalText: 'with the honors', expectedFix: 'with honors', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'a honest', expectedFix: 'an honest', description: 'Wrong article: a → an before silent h' },
    { type: 'grammar', originalText: 'tells truth', expectedFix: 'tells the truth', description: 'Missing article' },
    { type: 'grammar', originalText: 'on street', expectedFix: 'on the street', description: 'Missing article' },
    { type: 'grammar', originalText: 'to owner', expectedFix: 'to the owner', description: 'Missing article' },
    { type: 'grammar', originalText: 'The life is', expectedFix: 'Life is', description: 'Unnecessary article before general concept' },
    { type: 'grammar', originalText: 'the education is important', expectedFix: 'education is important', description: 'Unnecessary article before general concept' },
    { type: 'grammar', originalText: 'for the success', expectedFix: 'for success', description: 'Unnecessary article before uncountable noun' },
    { type: 'grammar', originalText: 'in modern world', expectedFix: 'in the modern world', description: 'Missing article' },
    { type: 'grammar', originalText: 'Car is', expectedFix: 'The car is', description: 'Missing article for previously mentioned noun' },
    { type: 'grammar', originalText: 'An European', expectedFix: 'A European', description: 'Wrong article: an → a before /j/ sound' },
    { type: 'grammar', originalText: 'to a airport', expectedFix: 'to an airport', description: 'Wrong article: a → an before vowel' },
  ],
};

export const grammar_prepositions: TestScenario = {
  id: 'grammar-prepositions',
  title: 'Grammar: Preposition Errors',
  description: 'Tests detection of wrong, missing, and extra prepositions.',
  source: 'custom',
  paragraphs: [
    `I arrived to the office at 9 AM and waited the bus for thirty minutes. My colleague depends of public transport too.`,
    `She is interested on learning new languages. She has been studying since three years and is good in speaking French.`,
    `The professor discussed about the new findings in the Monday lecture. He emphasized at the importance of critical thinking.`,
    `We need to focus in our goals this quarter. The team is responsible of completing the project until the deadline.`,
    `He apologized for being late and explained about the traffic situation. I told him not to worry of it because these things happen at everyone.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'arrived to', expectedFix: 'arrived at', description: 'Wrong preposition: arrived to → arrived at' },
    { type: 'grammar', originalText: 'waited the bus', expectedFix: 'waited for the bus', description: 'Missing preposition: waited for' },
    { type: 'grammar', originalText: 'depends of', expectedFix: 'depends on', description: 'Wrong preposition: depends of → depends on' },
    { type: 'grammar', originalText: 'interested on', expectedFix: 'interested in', description: 'Wrong preposition: interested on → interested in' },
    { type: 'grammar', originalText: 'since three years', expectedFix: 'for three years', description: 'Wrong preposition: since → for (duration)' },
    { type: 'grammar', originalText: 'good in speaking', expectedFix: 'good at speaking', description: 'Wrong preposition: good in → good at' },
    { type: 'grammar', originalText: 'discussed about', expectedFix: 'discussed', description: 'Extra preposition: discussed about → discussed' },
    { type: 'grammar', originalText: 'in the Monday', expectedFix: 'in the Monday', description: 'Wrong preposition: in → on (days)' },
    { type: 'grammar', originalText: 'emphasized at', expectedFix: 'emphasized', description: 'Extra preposition after emphasize' },
    { type: 'grammar', originalText: 'focus in', expectedFix: 'focus on', description: 'Wrong preposition: focus in → focus on' },
    { type: 'grammar', originalText: 'responsible of', expectedFix: 'responsible for', description: 'Wrong preposition: responsible of → responsible for' },
    { type: 'grammar', originalText: 'until the deadline', expectedFix: 'by the deadline', description: 'Wrong preposition: until → by (deadlines)' },
    { type: 'grammar', originalText: 'explained about', expectedFix: 'explained', description: 'Extra preposition after explain' },
    { type: 'grammar', originalText: 'worry of', expectedFix: 'worry about', description: 'Wrong preposition: worry of → worry about' },
    { type: 'grammar', originalText: 'happen at everyone', expectedFix: 'happen to everyone', description: 'Wrong preposition: happen at → happen to' },
  ],
};

export const grammar_subject_verb: TestScenario = {
  id: 'grammar-subject-verb',
  title: 'Grammar: Subject-Verb Agreement',
  description: 'Tests detection of subject-verb agreement errors.',
  source: 'custom',
  paragraphs: [
    `The list of requirements are very long. Each of the students have to submit their assignment by Friday. Neither the teacher nor the students was prepared for the test.`,
    `Mathematics are my favorite subject. The news about the economy were very concerning. Everyone in the class have finished their homework.`,
    `There is many reasons to be optimistic about the future. The quality of these products have improved significantly. One of my friends are moving to another city next month.`,
    `The team are performing well this season. A number of employees has complained about the new policy. The data shows that sales is increasing.`,
    `Bread and butter are my favorite breakfast. Every student and teacher were invited to the ceremony. The committee have reached a decision after hours of deliberation.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'list of requirements are', expectedFix: 'list of requirements is', description: 'Subject-verb: "list" is singular' },
    { type: 'grammar', originalText: 'Each of the students have', expectedFix: 'Each of the students has', description: 'Subject-verb: "each" is singular' },
    { type: 'grammar', originalText: 'nor the students was', expectedFix: 'nor the students were', description: 'Subject-verb: neither/nor agrees with nearest subject' },
    { type: 'grammar', originalText: 'Mathematics are', expectedFix: 'Mathematics is', description: 'Subject-verb: "mathematics" is singular' },
    { type: 'grammar', originalText: 'news about the economy were', expectedFix: 'news about the economy was', description: 'Subject-verb: "news" is singular' },
    { type: 'grammar', originalText: 'Everyone in the class have', expectedFix: 'Everyone in the class has', description: 'Subject-verb: "everyone" is singular' },
    { type: 'grammar', originalText: 'There is many reasons', expectedFix: 'There are many reasons', description: 'Subject-verb: "reasons" is plural' },
    { type: 'grammar', originalText: 'quality of these products have', expectedFix: 'quality of these products has', description: 'Subject-verb: "quality" is singular' },
    { type: 'grammar', originalText: 'One of my friends are', expectedFix: 'One of my friends is', description: 'Subject-verb: "one" is singular' },
    { type: 'grammar', originalText: 'A number of employees has', expectedFix: 'A number of employees have', description: 'Subject-verb: "a number of" takes plural verb' },
    { type: 'grammar', originalText: 'sales is increasing', expectedFix: 'sales are increasing', description: 'Subject-verb: "sales" is plural' },
    { type: 'grammar', originalText: 'Bread and butter are', expectedFix: 'Bread and butter is', description: 'Subject-verb: compound noun treated as unit' },
    { type: 'grammar', originalText: 'student and teacher were', expectedFix: 'student and teacher was', description: 'Subject-verb: "every" makes compound subject singular' },
  ],
};

export const grammar_verb_tense: TestScenario = {
  id: 'grammar-verb-tense',
  title: 'Grammar: Verb Tense Errors',
  description: 'Tests detection of wrong verb tenses and tense consistency.',
  source: 'custom',
  paragraphs: [
    `Yesterday I go to the store and buy some groceries. I have been living here since I was born and I never leave this town until last year.`,
    `She said that she will come to the party tomorrow, but now she changes her mind. By the time we arrived, the movie already started.`,
    `I am studying English for five years now. When I was young, I use to play outside every day. My parents always told me that education is important.`,
    `The company was founded in 2010 and grows rapidly since then. Last year they launch three new products and hire fifty new employees.`,
    `If I knew about the problem earlier, I would have fix it right away. He wishes he can travel more often, but his job keeps him too busy.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'Yesterday I go', expectedFix: 'Yesterday I went', description: 'Wrong tense: present → past (yesterday)' },
    { type: 'grammar', originalText: 'and buy', expectedFix: 'and bought', description: 'Wrong tense: present → past (sequence)' },
    { type: 'grammar', originalText: 'I never leave', expectedFix: 'I had never left', description: 'Wrong tense: needs past perfect' },
    { type: 'grammar', originalText: 'she will come', expectedFix: 'she would come', description: 'Wrong tense: reported speech needs would' },
    { type: 'grammar', originalText: 'she changes', expectedFix: 'she has changed', description: 'Wrong tense: needs present perfect' },
    { type: 'grammar', originalText: 'the movie already started', expectedFix: 'the movie had already started', description: 'Wrong tense: needs past perfect with "by the time"' },
    { type: 'grammar', originalText: 'I am studying English for five years', expectedFix: 'I have been studying English for five years', description: 'Wrong tense: needs present perfect continuous for duration' },
    { type: 'grammar', originalText: 'I use to play', expectedFix: 'I used to play', description: 'Wrong form: use to → used to' },
    { type: 'grammar', originalText: 'grows rapidly since', expectedFix: 'has grown rapidly since', description: 'Wrong tense: needs present perfect with since' },
    { type: 'grammar', originalText: 'they launch', expectedFix: 'they launched', description: 'Wrong tense: needs past (last year)' },
    { type: 'grammar', originalText: 'and hire', expectedFix: 'and hired', description: 'Wrong tense: needs past (sequence)' },
    { type: 'grammar', originalText: 'would have fix', expectedFix: 'would have fixed', description: 'Wrong form: needs past participle' },
    { type: 'grammar', originalText: 'he can travel', expectedFix: 'he could travel', description: 'Wrong tense: wishes requires subjunctive/past' },
  ],
};

export const grammar_noun_number: TestScenario = {
  id: 'grammar-noun-number',
  title: 'Grammar: Noun Number Errors',
  description: 'Tests detection of singular/plural noun errors.',
  source: 'custom',
  paragraphs: [
    `I have many informations about this topic. She gave me several advices on how to improve my writing. The furnitures in the office need to be replaced.`,
    `There are three childs playing in the park. The sheeps in the field look healthy. He caught two fishs in the river yesterday.`,
    `The company needs more equipments for the new project. Her researches show that people make less mistake when they are not tired.`,
    `We received many feedbacks from our customer. The homeworks are due next Monday. I need to buy new luggages for my trip.`,
    `The team members shared their knowledges during the meeting. She has a lot of experiences in marketing. The polices arrived quickly at the scene.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'many informations', expectedFix: 'much information', description: 'Uncountable: information has no plural' },
    { type: 'grammar', originalText: 'several advices', expectedFix: 'several pieces of advice', description: 'Uncountable: advice has no plural' },
    { type: 'grammar', originalText: 'furnitures', expectedFix: 'furniture', description: 'Uncountable: furniture has no plural' },
    { type: 'grammar', originalText: 'childs', expectedFix: 'children', description: 'Irregular plural: childs → children' },
    { type: 'grammar', originalText: 'sheeps', expectedFix: 'sheep', description: 'Irregular plural: sheep is unchanged' },
    { type: 'grammar', originalText: 'fishs', expectedFix: 'fish', description: 'Irregular plural: fish is unchanged' },
    { type: 'grammar', originalText: 'equipments', expectedFix: 'equipment', description: 'Uncountable: equipment has no plural' },
    { type: 'grammar', originalText: 'researches', expectedFix: 'research', description: 'Uncountable: research has no plural (in this context)' },
    { type: 'grammar', originalText: 'less mistake', expectedFix: 'fewer mistakes', description: 'Countable: less → fewer, singular → plural' },
    { type: 'grammar', originalText: 'many feedbacks', expectedFix: 'much feedback', description: 'Uncountable: feedback has no plural' },
    { type: 'grammar', originalText: 'customer', expectedFix: 'customers', description: 'Should be plural: many feedbacks from customers' },
    { type: 'grammar', originalText: 'homeworks', expectedFix: 'homework assignments', description: 'Uncountable: homework has no plural' },
    { type: 'grammar', originalText: 'luggages', expectedFix: 'luggage', description: 'Uncountable: luggage has no plural' },
    { type: 'grammar', originalText: 'knowledges', expectedFix: 'knowledge', description: 'Uncountable: knowledge has no plural' },
    { type: 'grammar', originalText: 'experiences', expectedFix: 'experience', description: 'Uncountable (in this context): experience in marketing' },
    { type: 'grammar', originalText: 'polices', expectedFix: 'police', description: 'Collective noun: police (no -s)' },
  ],
};

export const grammar_word_form: TestScenario = {
  id: 'grammar-word-form',
  title: 'Grammar: Word Form Errors',
  description: 'Tests detection of adjective/adverb/noun/verb form confusion.',
  source: 'custom',
  paragraphs: [
    `She spoke very quick during the presentation. The project was complete successful. He made a carefully analysis of the data.`,
    `The meeting was very productivity. I am confidence that we will succeed. The new system works more efficient than the old one.`,
    `His decide to leave the company surprised everyone. The explain was not clear enough. We need to strong our security measures.`,
    `She performed good on the exam despite being nervous. The results were real impressive. He drove very careful on the icy roads.`,
    `The economical situation is getting worse. This is a very interested book about history. The building was damage during the storm.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'very quick', expectedFix: 'very quickly', description: 'Word form: adjective → adverb (modifying verb)' },
    { type: 'grammar', originalText: 'complete successful', expectedFix: 'completely successful', description: 'Word form: adjective → adverb (modifying adjective)' },
    { type: 'grammar', originalText: 'a carefully analysis', expectedFix: 'a careful analysis', description: 'Word form: adverb → adjective (modifying noun)' },
    { type: 'grammar', originalText: 'very productivity', expectedFix: 'very productive', description: 'Word form: noun → adjective' },
    { type: 'grammar', originalText: 'am confidence', expectedFix: 'am confident', description: 'Word form: noun → adjective' },
    { type: 'grammar', originalText: 'more efficient', expectedFix: 'more efficiently', description: 'Word form: adjective → adverb (modifying verb)' },
    { type: 'grammar', originalText: 'His decide', expectedFix: 'His decision', description: 'Word form: verb → noun' },
    { type: 'grammar', originalText: 'The explain', expectedFix: 'The explanation', description: 'Word form: verb → noun' },
    { type: 'grammar', originalText: 'to strong', expectedFix: 'to strengthen', description: 'Word form: adjective → verb' },
    { type: 'grammar', originalText: 'performed good', expectedFix: 'performed well', description: 'Word form: adjective → adverb' },
    { type: 'grammar', originalText: 'real impressive', expectedFix: 'really impressive', description: 'Word form: adjective → adverb' },
    { type: 'grammar', originalText: 'very careful', expectedFix: 'very carefully', description: 'Word form: adjective → adverb (modifying verb)' },
    { type: 'grammar', originalText: 'economical situation', expectedFix: 'economic situation', description: 'Word form: economical (thrifty) → economic (of the economy)' },
    { type: 'grammar', originalText: 'interested book', expectedFix: 'interesting book', description: 'Word form: past participle → present participle' },
    { type: 'grammar', originalText: 'was damage', expectedFix: 'was damaged', description: 'Word form: base form → past participle (passive)' },
  ],
};

export const grammar_pronouns: TestScenario = {
  id: 'grammar-pronouns',
  title: 'Grammar: Pronoun Errors',
  description: 'Tests detection of pronoun reference, case, and agreement errors.',
  source: 'custom',
  paragraphs: [
    `Me and my friend went to the concert last night. Her and I have been friends since childhood. Between you and I, the project is not going well.`,
    `Each student must bring their own textbook to class. If someone calls, tell them I will call back later. The committee made their decision yesterday.`,
    `The dog wagged it's tail when the owner came home. Who's book is this on the table? Give the report to John and myself when it is ready.`,
    `Every employee should submit his timesheet by Friday. Nobody finished their assignment on time. The company released it's quarterly earnings report.`,
    `Him being late caused problems for the whole team. Us engineers need better tools. Her running the meeting was a surprise to everyone.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'Me and my friend', expectedFix: 'My friend and I', description: 'Pronoun case: object → subject pronoun, and order' },
    { type: 'grammar', originalText: 'Her and I', expectedFix: 'She and I', description: 'Pronoun case: object → subject pronoun' },
    { type: 'grammar', originalText: 'you and I', expectedFix: 'you and me', description: 'Pronoun case: after preposition "between" needs object' },
    { type: 'grammar', originalText: "it's tail", expectedFix: 'its tail', description: "Wrong: it's (contraction) → its (possessive)" },
    { type: 'grammar', originalText: "Who's book", expectedFix: 'Whose book', description: "Wrong: who's (contraction) → whose (possessive)" },
    { type: 'grammar', originalText: 'John and myself', expectedFix: 'John and me', description: 'Pronoun: reflexive "myself" incorrect as object' },
    { type: 'grammar', originalText: "it's quarterly", expectedFix: 'its quarterly', description: "Wrong: it's (contraction) → its (possessive)" },
    { type: 'grammar', originalText: 'Him being late', expectedFix: 'His being late', description: 'Pronoun case: needs possessive before gerund' },
    { type: 'grammar', originalText: 'Us engineers', expectedFix: 'We engineers', description: 'Pronoun case: object → subject pronoun' },
  ],
};

export const grammar_sentence_structure: TestScenario = {
  id: 'grammar-sentence-structure',
  title: 'Grammar: Sentence Structure Errors',
  description: 'Tests detection of fragments, run-ons, dangling modifiers, and parallelism.',
  source: 'custom',
  paragraphs: [
    `Running through the park on a sunny day. The children laughed and played while their parents watched from benches. Because it was the first warm day of spring.`,
    `The report was finished on time the team celebrated their success they went out for dinner. She not only completed the project but also she presented it to the board.`,
    `After reviewing the data, the conclusion was clear that sales had increased. Driving to work this morning, the traffic was terrible and caused delays.`,
    `The manager wanted to quickly and efficiently complete the project, to reduce costs, and improving customer satisfaction.`,
    `Although being tired. She continued working on the assignment, she knew the deadline was approaching she could not afford to stop now.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'Running through the park on a sunny day.', expectedFix: 'Running through the park on a sunny day, the children laughed...', description: 'Sentence fragment: no main clause' },
    { type: 'grammar', originalText: 'Because it was the first warm day of spring.', expectedFix: '...because it was the first warm day of spring.', description: 'Sentence fragment: dependent clause alone' },
    { type: 'grammar', originalText: 'the team celebrated their success they went out for dinner', description: 'Run-on sentence: needs punctuation between independent clauses' },
    { type: 'grammar', originalText: 'not only completed the project but also she presented', expectedFix: 'not only completed the project but also presented', description: 'Correlative conjunction: parallel structure needed' },
    { type: 'grammar', originalText: 'After reviewing the data, the conclusion was clear', expectedFix: 'After reviewing the data, the team concluded', description: 'Dangling modifier: "the conclusion" cannot review data' },
    { type: 'grammar', originalText: 'Driving to work this morning, the traffic was terrible', expectedFix: 'Driving to work this morning, I found the traffic terrible', description: 'Dangling modifier: "the traffic" cannot drive' },
    { type: 'grammar', originalText: 'to reduce costs, and improving', expectedFix: 'to reduce costs, and to improve', description: 'Parallel structure: mixing infinitive and gerund' },
    { type: 'grammar', originalText: 'Although being tired.', expectedFix: 'Although she was tired,', description: 'Sentence fragment and wrong form' },
    { type: 'grammar', originalText: 'on the assignment, she knew the deadline was approaching she could not afford', description: 'Run-on / comma splice: needs proper conjunction or punctuation' },
  ],
};

export const grammar_mixed_esl: TestScenario = {
  id: 'grammar-mixed-esl-1',
  title: 'Grammar: Mixed ESL Errors (Essay 1)',
  description: 'A full ESL-style essay with mixed grammar errors across all categories.',
  source: 'custom',
  paragraphs: [
    `The Importance of the Education in Modern Society`,
    `In today's world, education play a crucial role in shaping our futures. Many peoples believe that getting a good education is the key to success, and I am agree with this opinion. In this essay, I will discuss about why education is so important and how it effects our lives.`,
    `Firstly, education help us to develop critical thinking skills. When students learn to analyze informations and make decisions based on evidences, they become better at solving problems in their daily lifes. For an example, a person who has studied the science can understand complex issues like the climate change more better than someone who has not.`,
    `Secondly, education provides peoples with more opportunities for employment. According to researches, people with higher education earns significantly more than those without. Companies are more likely to hire candidates who has demonstrated their abilities through formal education. This is because educated workers tends to be more productive and innovative.`,
    `However, it is important to notice that education is not only about getting a degree. The true value of education lays in the knowledge and skills that we gain during the process. Some of the most successful entrepreneurs in the world, such like Steve Jobs and Bill Gates, did not finished their college education but continued to learn throughout their lifes.`,
    `In the conclusion, education is essential for personal growth and societal development. Goverments should invest more in education to ensure that every citizen have access to quality learning. I strong believe that if we prioritize education, we can create a more better world for the future generations.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'the Education', expectedFix: 'Education', description: 'Unnecessary article before general concept' },
    { type: 'grammar', originalText: 'education play', expectedFix: 'education plays', description: 'Subject-verb agreement' },
    { type: 'grammar', originalText: 'peoples', expectedFix: 'people', description: 'Noun number: people is already plural' },
    { type: 'grammar', originalText: 'am agree', expectedFix: 'agree', description: 'Wrong verb form: no auxiliary needed' },
    { type: 'grammar', originalText: 'discuss about', expectedFix: 'discuss', description: 'Extra preposition after discuss' },
    { type: 'grammar', originalText: 'effects our', expectedFix: 'affects our', description: 'Wrong word: effects (noun) → affects (verb)' },
    { type: 'grammar', originalText: 'education help', expectedFix: 'education helps', description: 'Subject-verb agreement' },
    { type: 'grammar', originalText: 'informations', expectedFix: 'information', description: 'Uncountable noun' },
    { type: 'grammar', originalText: 'evidences', expectedFix: 'evidence', description: 'Uncountable noun' },
    { type: 'grammar', originalText: 'lifes', expectedFix: 'lives', description: 'Irregular plural' },
    { type: 'grammar', originalText: 'For an example', expectedFix: 'For example', description: 'Wrong: no article in "for example"' },
    { type: 'grammar', originalText: 'the science', expectedFix: 'science', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'the climate change', expectedFix: 'climate change', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'more better', expectedFix: 'better', description: 'Double comparative: more better → better' },
    { type: 'grammar', originalText: 'peoples', expectedFix: 'people', description: 'Noun number: people is already plural' },
    { type: 'grammar', originalText: 'researches', expectedFix: 'research', description: 'Uncountable noun' },
    { type: 'grammar', originalText: 'education earns', expectedFix: 'education earn', description: 'Subject-verb: "people" is plural' },
    { type: 'grammar', originalText: 'who has demonstrated', expectedFix: 'who have demonstrated', description: 'Subject-verb: "candidates" is plural' },
    { type: 'grammar', originalText: 'workers tends', expectedFix: 'workers tend', description: 'Subject-verb agreement' },
    { type: 'grammar', originalText: 'to notice', expectedFix: 'to note', description: 'Word choice: notice → note' },
    { type: 'grammar', originalText: 'lays in', expectedFix: 'lies in', description: 'Wrong word: lays → lies' },
    { type: 'grammar', originalText: 'such like', expectedFix: 'such as', description: 'Wrong phrase: such like → such as' },
    { type: 'grammar', originalText: 'did not finished', expectedFix: 'did not finish', description: 'Wrong form: past participle after did not' },
    { type: 'grammar', originalText: 'In the conclusion', expectedFix: 'In conclusion', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'citizen have', expectedFix: 'citizen has', description: 'Subject-verb: "every citizen" is singular' },
    { type: 'grammar', originalText: 'strong believe', expectedFix: 'strongly believe', description: 'Word form: adjective → adverb' },
    { type: 'grammar', originalText: 'more better', expectedFix: 'better', description: 'Double comparative' },
    { type: 'grammar', originalText: 'the future generations', expectedFix: 'future generations', description: 'Unnecessary article' },
  ],
};

export const grammar_mixed_esl_2: TestScenario = {
  id: 'grammar-mixed-esl-2',
  title: 'Grammar: Mixed ESL Errors (Essay 2)',
  description: 'A second ESL-style essay with mixed grammar errors for comprehensive testing.',
  source: 'custom',
  paragraphs: [
    `The Impact of the Technology on Modern Communication`,
    `Technology has changed the way how people communicate with each others. In the past, people had to write letters or to meet face to face in order to share informations. Nowadays, we can send a message to anyone in the world with just few clicks.`,
    `The most significant change have been the rise of social medias. Platforms like Facebook and Twitter allows people to share their thoughts and opinions instantly. However, this has also lead to several problems, include the spread of misinformation and cyberbullying.`,
    `Many experts argues that social media has negative effects on the mental health, especially for young peoples. Studies have shown that spending too much time on social media can cause of depression and anxiety. Furthermore, the constant comparing ourselves to others can damage our self-esteem.`,
    `On the other hand, technology has also brought many benefits to the communication. Video calling has made it possible for families which live far apart to stay connected. Online education has opened up the learning opportunities for people who cannot attend to traditional schools.`,
    `Despite of the challenges, I believe that the advantages of the modern communication technology outweigh the disadvantages. If we use these tools responsible and teach our children about the digital safety, we can enjoy the benefits while avoiding most of the risks.`,
  ],
  expectedIssues: [
    { type: 'grammar', originalText: 'the Technology', expectedFix: 'Technology', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'the way how', expectedFix: 'the way', description: 'Redundant: "how" unnecessary after "the way"' },
    { type: 'grammar', originalText: 'each others', expectedFix: 'each other', description: 'Wrong form: each other (no -s)' },
    { type: 'grammar', originalText: 'or to meet', expectedFix: 'or meet', description: 'Parallel structure: no extra "to" needed' },
    { type: 'grammar', originalText: 'informations', expectedFix: 'information', description: 'Uncountable noun' },
    { type: 'grammar', originalText: 'just few', expectedFix: 'just a few', description: 'Missing article' },
    { type: 'grammar', originalText: 'change have', expectedFix: 'change has', description: 'Subject-verb agreement' },
    { type: 'grammar', originalText: 'social medias', expectedFix: 'social media', description: 'Noun: media is already plural' },
    { type: 'grammar', originalText: 'allows people', expectedFix: 'allow people', description: 'Subject-verb: "platforms" is plural' },
    { type: 'grammar', originalText: 'has also lead', expectedFix: 'has also led', description: 'Wrong past participle: lead → led' },
    { type: 'grammar', originalText: 'include the', expectedFix: 'including the', description: 'Word form: needs present participle' },
    { type: 'grammar', originalText: 'experts argues', expectedFix: 'experts argue', description: 'Subject-verb agreement' },
    { type: 'grammar', originalText: 'the mental health', expectedFix: 'mental health', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'young peoples', expectedFix: 'young people', description: 'Noun: people is already plural' },
    { type: 'grammar', originalText: 'can cause of', expectedFix: 'can cause', description: 'Extra preposition' },
    { type: 'grammar', originalText: 'the constant comparing', expectedFix: 'constantly comparing', description: 'Word form: article+adjective → adverb' },
    { type: 'grammar', originalText: 'the communication', expectedFix: 'communication', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'families which live', expectedFix: 'families who live', description: 'Pronoun: which → who (for people)' },
    { type: 'grammar', originalText: 'the learning opportunities', expectedFix: 'learning opportunities', description: 'Unnecessary article' },
    { type: 'grammar', originalText: 'attend to traditional', expectedFix: 'attend traditional', description: 'Extra preposition after attend' },
    { type: 'grammar', originalText: 'Despite of', expectedFix: 'Despite', description: 'Extra preposition: despite of → despite' },
    { type: 'grammar', originalText: 'tools responsible', expectedFix: 'tools responsibly', description: 'Word form: adjective → adverb' },
    { type: 'grammar', originalText: 'the digital safety', expectedFix: 'digital safety', description: 'Unnecessary article' },
  ],
};

export const ALL_GRAMMAR_SCENARIOS: TestScenario[] = [
  grammar_articles,
  grammar_prepositions,
  grammar_subject_verb,
  grammar_verb_tense,
  grammar_noun_number,
  grammar_word_form,
  grammar_pronouns,
  grammar_sentence_structure,
  grammar_mixed_esl,
  grammar_mixed_esl_2,
];
