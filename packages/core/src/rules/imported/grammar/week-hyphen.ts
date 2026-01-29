import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '8 week semester'
 * 
 * Source: LanguageTool (WEEK_HYPHEN)
 * Category: grammar
 */
export const weekHyphenRule: GrammarRule = {
  id: 'week-hyphen',
  name: 'missing hyphen in \'8 week semester\'',
  description: 'When a time span like \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bweek\b\s+\S+\s+\bpause|semesters?|pandemi[ac]|vacation|holiday|notice|diets?|periods?|moving|streak|cycles?|arrangements?|routine|gym|plan|work\.?out|project|pregnancy|fetus|trip|training|program|courses?|highs?|lows?|trial|rotation|intervals?|warranty|delivery|median|lock-?down|shut-?down|decline|sprints?|average|avg\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When a time span like \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
