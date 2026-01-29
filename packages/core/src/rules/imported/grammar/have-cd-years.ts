import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong phrase: have x years old (be x years old)
 * 
 * Source: LanguageTool (HAVE_CD_YEARS)
 * Category: grammar
 */
export const haveCdYearsRule: GrammarRule = {
  id: 'have-cd-years',
  name: 'Wrong phrase: have x years old (be x years old)',
  description: 'This phrase is used with \'be\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\byears\b\s+\bold\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is used with \'be\'.',
        suggestions: ["be"],
      });
    }
    
    return issues;
  },
};
