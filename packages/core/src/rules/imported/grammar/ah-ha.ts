import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ah ha (aha)
 * 
 * Source: LanguageTool (AH_HA)
 * Category: grammar
 */
export const ahHaRule: GrammarRule = {
  id: 'ah-ha',
  name: 'ah ha (aha)',
  description: 'This word is usually spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bah\b\s+\bha\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is usually spelled as one word.',
        suggestions: ["aha"],
      });
    }
    
    return issues;
  },
};
