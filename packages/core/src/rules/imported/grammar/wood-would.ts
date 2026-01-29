import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wood vs would
 * 
 * Source: LanguageTool (WOOD_WOULD)
 * Category: grammar
 */
export const woodWouldRule: GrammarRule = {
  id: 'wood-would',
  name: 'wood vs would',
  description: 'Did you mean the modal verb would?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwood\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the modal verb would?',
        suggestions: ["would"],
      });
    }
    
    return issues;
  },
};
