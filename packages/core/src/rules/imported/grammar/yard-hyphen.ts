import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '100 yard house plan'
 * 
 * Source: LanguageTool (YARD_HYPHEN)
 * Category: grammar
 */
export const yardHyphenRule: GrammarRule = {
  id: 'yard-hyphen',
  name: 'missing hyphen in \'100 yard house plan\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byard\b\s+\bhouses?|lines?|challenges?|dumpsters?|shots?|field|fights?|sprints?|recycling|containers?|range|run|shooting|swim|scope|dash\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
