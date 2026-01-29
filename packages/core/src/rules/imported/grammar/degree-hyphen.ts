import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '10 degree angle'
 * 
 * Source: LanguageTool (DEGREE_HYPHEN)
 * Category: grammar
 */
export const degreeHyphenRule: GrammarRule = {
  id: 'degree-hyphen',
  name: 'missing hyphen in \'10 degree angle\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bdegree\b\s+\S+\s+\bangle|rotation|photos?|panoramas?|cameras?|circles?|marketing|evaluation|videos?|assessments?|appraisals?|system|feedback|turn|elbow|surface|drill|corners?|tilt|ovens?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
