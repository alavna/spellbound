import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'end-to-end
 * 
 * Source: LanguageTool (END_TO_END_HYPHEN)
 * Category: grammar
 */
export const endToEndHyphenRule: GrammarRule = {
  id: 'end-to-end-hyphen',
  name: 'missing hyphen in \'end-to-end',
  description: 'Did you mean the adjective \\1-\\2-\\3 (spelled with hyphens)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bend\b\s+\bto\b\s+\bend\b\s+\bencrypted|encryptions?|principles?|reinforcement|vectors?|delay|tests?|testings?|journeys?|architectures?|trips?|monitorings?|tracing|traces?|transactions?|process(es)?|solutions?|computing|platforms?|managements?|attacks?|compressions?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective \\1-\\2-\\3 (spelled with hyphens)?',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
