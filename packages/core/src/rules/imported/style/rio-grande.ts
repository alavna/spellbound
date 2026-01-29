import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Rio Grande (river)
 * 
 * Source: LanguageTool (RIO_GRANDE)
 * Category: style
 */
export const rioGrandeRule: GrammarRule = {
  id: 'rio-grande',
  name: 'Rio Grande (river)',
  description: '\'\\1\' means river. Simply use \\1 \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brio\b\s+\bbravo|grande\b\s+\briver\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1\' means river. Simply use \\1 \\2.',
        suggestions: ["\\1 \\2"],
      });
    }
    
    return issues;
  },
};
