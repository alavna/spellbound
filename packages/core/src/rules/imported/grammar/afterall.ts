import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * afterall (after all)
 * 
 * Source: LanguageTool (AFTERALL)
 * Category: grammar
 */
export const afterallRule: GrammarRule = {
  id: 'afterall',
  name: 'afterall (after all)',
  description: 'Did you mean after all?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bafterall\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean after all?',
        suggestions: ["after all"],
      });
    }
    
    return issues;
  },
};
