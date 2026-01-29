import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'two headed monster'
 * 
 * Source: LanguageTool (HEADED_HYPHEN)
 * Category: grammar
 */
export const headedHyphenRule: GrammarRule = {
  id: 'headed-hyphen',
  name: 'missing hyphen in \'two headed monster\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bheaded|tailed|armed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2 \\3"],
      });
    }
    
    return issues;
  },
};
