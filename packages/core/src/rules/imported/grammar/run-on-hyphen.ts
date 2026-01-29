import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'run on'
 * 
 * Source: LanguageTool (RUN_ON_HYPHEN)
 * Category: grammar
 */
export const runOnHyphenRule: GrammarRule = {
  id: 'run-on-hyphen',
  name: 'missing hyphen in \'run on\'',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brun\b\s+\bon\b\s+\bsentences?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
