import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he didin't (didn't)
 * 
 * Source: LanguageTool (DIDINT)
 * Category: grammar
 */
export const didintRule: GrammarRule = {
  id: 'didint',
  name: 'he didin\'t (didn\'t)',
  description: 'Did you mean didn\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdidin|diden|din|did\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean didn\\2t?',
        suggestions: ["didn\\2t"],
      });
    }
    
    return issues;
  },
};
