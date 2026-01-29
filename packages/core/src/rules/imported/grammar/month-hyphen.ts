import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '2 month cycle'
 * 
 * Source: LanguageTool (MONTH_HYPHEN)
 * Category: grammar
 */
export const monthHyphenRule: GrammarRule = {
  id: 'month-hyphen',
  name: 'missing hyphen in \'2 month cycle\'',
  description: 'When a time span like \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bmonth\b\s+\S+\s+\bpause|semesters?|routine|periods?|intervals?|cycles?|diets?|notice|plan|project|warranty|median|vacation|holiday|trip|milestone|pandemi[ac]|lockdown|shutdown|term|contract|decline|sentence|calendar|intern(ships?)?|training|traineeships?|loans?|forecasts?|hibernation|delivery|lock-?down|shut-?down|decline|sprints?|average|avg\b/gi;
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
