import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'drop dead'
 * 
 * Source: LanguageTool (DROP_DEAD_HYPHEN)
 * Category: grammar
 */
export const dropDeadHyphenRule: GrammarRule = {
  id: 'drop-dead-hyphen',
  name: 'missing hyphen in \'drop dead\'',
  description: 'The adjective or adverb \\1-\\2 is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdrop\b\s+\bdead\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective or adverb \\1-\\2 is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
