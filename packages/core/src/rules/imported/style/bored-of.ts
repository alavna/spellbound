import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bored of (with)
 * 
 * Source: LanguageTool (BORED_OF)
 * Category: style
 */
export const boredOfRule: GrammarRule = {
  id: 'bored-of',
  name: 'bored of (with)',
  description: 'In standard English it\'s more accepted to use bored with or bored by.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbored\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In standard English it\'s more accepted to use bored with or bored by.',
        suggestions: ["bored with","bored by"],
      });
    }
    
    return issues;
  },
};
