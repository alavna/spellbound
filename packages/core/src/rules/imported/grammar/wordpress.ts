import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * WordPress
 * 
 * Source: LanguageTool (WORDPRESS)
 * Category: grammar
 */
export const wordpressRule: GrammarRule = {
  id: 'wordpress',
  name: 'WordPress',
  description: 'The official name of this content management system is spelled with a capital \"P\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwordpress|Wordpress\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The official name of this content management system is spelled with a capital \"P\".',
        suggestions: ["WordPress"],
      });
    }
    
    return issues;
  },
};
