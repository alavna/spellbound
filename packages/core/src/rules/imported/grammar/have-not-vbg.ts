import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * We have not onboarding anyone this month
 * 
 * Source: LanguageTool (HAVE_NOT_VBG)
 * Category: grammar
 */
export const haveNotVbgRule: GrammarRule = {
  id: 'have-not-vbg',
  name: 'We have not onboarding anyone this month',
  description: 'TBD',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'TBD',
        suggestions: ["\\1 \\2","be not \\3"],
      });
    }
    
    return issues;
  },
};
