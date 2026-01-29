import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma in 'ok ok'
 * 
 * Source: LanguageTool (OK_OK_COMMA)
 * Category: grammar
 */
export const okOkCommaRule: GrammarRule = {
  id: 'ok-ok-comma',
  name: 'Comma in \'ok ok\'',
  description: 'Consider adding a comma between these interjections.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bok(ay)?|no|yes|thanks\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider adding a comma between these interjections.',
        suggestions: ["\\1, \\2","\\1"],
      });
    }
    
    return issues;
  },
};
