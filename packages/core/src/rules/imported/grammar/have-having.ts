import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * have having → have been having
 * 
 * Source: LanguageTool (HAVE_HAVING)
 * Category: grammar
 */
export const haveHavingRule: GrammarRule = {
  id: 'have-having',
  name: 'have having → have been having',
  description: 'Did you mean been having?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhave\b\s+\bhaving\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean been having?',
        suggestions: ["been having"],
      });
    }
    
    return issues;
  },
};
