import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Black Sea
 * 
 * Source: LanguageTool (BLACK_SEA)
 * Category: grammar
 */
export const blackSeaRule: GrammarRule = {
  id: 'black-sea',
  name: 'Black Sea',
  description: 'Capitalize if you mean the body of water in southeastern Europe.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bblack|dead\b\s+\bsea\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Capitalize if you mean the body of water in southeastern Europe.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
