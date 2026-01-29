import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Please do this by expire (expiring|the expiration)
 * 
 * Source: LanguageTool (BY_EXPIRE)
 * Category: grammar
 */
export const byExpireRule: GrammarRule = {
  id: 'by-expire',
  name: 'Please do this by expire (expiring|the expiration)',
  description: 'The preposition \"by\" usually has to be followed by a noun phrase or a verb ending in \"-ing\". Did you mean something else?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bby\b\s+\bexpire\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The preposition \"by\" usually has to be followed by a noun phrase or a verb ending in \"-ing\". Did you mean something else?',
        suggestions: ["expiring","the expiration"],
      });
    }
    
    return issues;
  },
};
