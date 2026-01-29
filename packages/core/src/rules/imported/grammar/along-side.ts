import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * along side (alongside)
 * 
 * Source: LanguageTool (ALONG_SIDE)
 * Category: grammar
 */
export const alongSideRule: GrammarRule = {
  id: 'along-side',
  name: 'along side (alongside)',
  description: 'Did you mean alongside?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\balong\b\s+\bside\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean alongside?',
        suggestions: ["alongside"],
      });
    }
    
    return issues;
  },
};
