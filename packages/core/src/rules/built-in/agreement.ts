import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

/**
 * Subject-verb agreement rules
 */

/**
 * Rule: Subject-verb agreement
 */
export const subjectVerbAgreement: GrammarRule = {
  id: 'agreement/subject-verb',
  name: 'Subject-Verb Agreement',
  description: 'Subject and verb should agree in number',
  severity: 'error',
  category: 'grammar',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // Singular subjects with plural verbs
    const singularWithPluralVerb = [
      { pattern: /\b(he|she|it)\s+(are)\b/gi, replacement: 'is' },
      { pattern: /\b(he|she|it)\s+(were)\b/gi, replacement: 'was' },
      { pattern: /\b(he|she|it)\s+(have)\b(?!\s+to)/gi, replacement: 'has' },
      { pattern: /\b(he|she|it)\s+(do)\b(?!\s+not)/gi, replacement: 'does' },
      { pattern: /\b(everybody|everyone|somebody|someone|nobody|anyone|anything|everything|nothing)\s+(are)\b/gi, replacement: 'is' },
      { pattern: /\b(everybody|everyone|somebody|someone|nobody|anyone|anything|everything|nothing)\s+(were)\b/gi, replacement: 'was' },
      { pattern: /\b(everybody|everyone|somebody|someone|nobody|anyone|anything|everything|nothing)\s+(have)\b(?!\s+to)/gi, replacement: 'has' },
    ];

    // Plural subjects with singular verbs
    const pluralWithSingularVerb = [
      { pattern: /\b(they|we|you)\s+(is)\b/gi, replacement: 'are' },
      { pattern: /\b(they|we)\s+(was)\b/gi, replacement: 'were' },
      { pattern: /\b(they|we|you)\s+(has)\b(?!\s+to)/gi, replacement: 'have' },
      { pattern: /\b(they|we|you)\s+(does)\b/gi, replacement: 'do' },
    ];

    // "I" special cases
    const iCases = [
      { pattern: /\bI\s+(is)\b/gi, replacement: 'am' },
      { pattern: /\bI\s+(are)\b/gi, replacement: 'am' },
      { pattern: /\bI\s+(was)\s+(are)\b/gi, replacement: 'was' },
      { pattern: /\bI\s+(has)\b(?!\s+to)/gi, replacement: 'have' },
    ];

    const allPatterns = [...singularWithPluralVerb, ...pluralWithSingularVerb, ...iCases];

    for (const { pattern, replacement } of allPatterns) {
      let match: RegExpExecArray | null;
      pattern.lastIndex = 0;

      while ((match = pattern.exec(context.text)) !== null) {
        const subject = match[1];
        // match[2] is the verb but we use the replacement directly

        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + match[0].length,
            match: match[0],
            message: `Subject-verb disagreement: "${subject}" should be used with "${replacement}"`,
            replacements: [subject + ' ' + replacement],
          })
        );
      }
    }

    return issues;
  },
};

/**
 * Rule: There is/are agreement
 */
export const thereAgreement: GrammarRule = {
  id: 'agreement/there-is-are',
  name: 'There Is/Are Agreement',
  description: '"There is" for singular, "there are" for plural',
  severity: 'warning',
  category: 'grammar',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // "There is" followed by plural noun
    const thereIsPlural = /\bthere\s+is\s+(\d+|many|several|some|few|multiple|various|numerous)\s+/gi;
    let match: RegExpExecArray | null;

    while ((match = thereIsPlural.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + 8, // "there is"
          match: 'there is',
          message: 'Use "there are" with plural subjects',
          replacements: ['there are'],
        })
      );
    }

    // "There are" followed by singular article
    const thereAreSingular = /\bthere\s+are\s+(a|an|one|each|every)\s+/gi;

    while ((match = thereAreSingular.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + 9, // "there are"
          match: 'there are',
          message: 'Use "there is" with singular subjects',
          replacements: ['there is'],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Collective noun agreement
 */
export const collectiveNounAgreement: GrammarRule = {
  id: 'agreement/collective-noun',
  name: 'Collective Noun Agreement',
  description: 'Collective nouns typically take singular verbs in American English',
  severity: 'info',
  category: 'grammar',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    const collectiveNouns = [
      'team', 'family', 'group', 'committee', 'class', 'audience', 'crowd',
      'staff', 'company', 'government', 'jury', 'public', 'army', 'band',
      'orchestra', 'choir', 'cast', 'crew', 'board', 'council',
    ];

    for (const noun of collectiveNouns) {
      const pattern = new RegExp(`\\b(the\\s+)?${noun}\\s+(are|were|have)\\b`, 'gi');
      let match: RegExpExecArray | null;

      while ((match = pattern.exec(context.text)) !== null) {
        const verb = match[2].toLowerCase();
        let replacement: string;

        switch (verb) {
          case 'are':
            replacement = 'is';
            break;
          case 'were':
            replacement = 'was';
            break;
          case 'have':
            replacement = 'has';
            break;
          default:
            continue;
        }

        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + match[0].length,
            match: match[0],
            message: `Collective noun "${noun}" typically takes a singular verb in American English`,
            replacements: [(match[1] || '') + noun + ' ' + replacement],
          })
        );
      }
    }

    return issues;
  },
};

/**
 * Plural Noun Agreement
 * Detects common plural nouns incorrectly used with singular verbs
 * Only flags DIRECT patterns (noun + verb) to avoid false positives
 */
const pluralNounAgreement: GrammarRule = {
  id: 'plural-noun-agreement',
  name: 'Plural Noun Agreement',
  description: 'Checks that plural nouns use plural verbs',
  category: 'grammar',
  severity: 'warning',
  enabled: true,

  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // Common plural nouns that are often incorrectly paired with "is/was/has"
    // NOTE: Excluded "data" - commonly treated as singular in American English
    // NOTE: Excluded "statistics" - can be singular when referring to the field of study
    const pluralNouns = [
      'findings', 'results', 'effects', 'studies', 'reports', 'conclusions',
      'recommendations', 'observations', 'outcomes', 'analyses',
      'experiments', 'tests', 'trials', 'surveys', 'reviews', 'assessments',
      'evaluations', 'measurements', 'readings', 'scores', 'grades',
      'values', 'numbers', 'figures', 'facts', 'details',
      'reasons', 'causes', 'factors', 'problems', 'concerns',
      'questions', 'answers', 'solutions', 'options', 'choices', 'alternatives',
      'ideas', 'thoughts', 'opinions', 'views', 'perspectives', 'insights',
      'benefits', 'advantages', 'disadvantages', 'risks', 'challenges',
      'changes', 'improvements', 'developments', 'trends', 'patterns',
      'examples', 'cases', 'instances', 'situations', 'circumstances',
      'conditions', 'requirements', 'criteria', 'standards', 'guidelines',
      'rules', 'regulations', 'laws', 'policies', 'procedures', 'processes',
      'methods', 'techniques', 'approaches', 'strategies', 'tactics', 'plans',
      'goals', 'objectives', 'targets', 'aims', 'purposes', 'functions',
      'roles', 'responsibilities', 'duties', 'tasks', 'activities', 'actions',
      'steps', 'stages', 'phases', 'types', 'kinds', 'sorts',
      'forms', 'categories', 'classes', 'groups', 'sets', 'lists',
      'items', 'elements', 'components', 'parts', 'pieces', 'sections',
      'areas', 'regions', 'zones', 'sectors', 'fields', 'domains', 'aspects',
      'features', 'characteristics', 'properties', 'attributes', 'qualities',
      'traits', 'symptoms', 'signs', 'indicators', 'markers', 'signals',
    ];

    // ONLY match direct patterns: "findings is/was/has" (no words in between)
    // This avoids false positives like "findings of the study is" where "study" is the subject
    for (const noun of pluralNouns) {
      // Direct: "findings is/was/has" - immediately adjacent
      const directPattern = new RegExp(
        `\\b(the\\s+|these\\s+|those\\s+|our\\s+|their\\s+|your\\s+|my\\s+)?(${noun})\\s+(is|was|has)\\b`,
        'gi'
      );
      
      let match: RegExpExecArray | null;
      while ((match = directPattern.exec(context.text)) !== null) {
        const prefix = match[1] || '';
        const matchedNoun = match[2];
        const verb = match[3].toLowerCase();
        let replacement: string;

        switch (verb) {
          case 'is':
            replacement = 'are';
            break;
          case 'was':
            replacement = 'were';
            break;
          case 'has':
            replacement = 'have';
            break;
          default:
            continue;
        }

        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + match[0].length,
            match: match[0],
            message: `"${matchedNoun}" is plural and should use "${replacement}" instead of "${verb}"`,
            replacements: [prefix + matchedNoun + ' ' + replacement],
          })
        );
      }
    }

    return issues;
  },
};

export const agreementRules: GrammarRule[] = [
  subjectVerbAgreement,
  thereAgreement,
  collectiveNounAgreement,
  pluralNounAgreement,
];
