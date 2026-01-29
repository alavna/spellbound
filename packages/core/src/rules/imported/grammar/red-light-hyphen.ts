import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'red light district'
 * 
 * Source: LanguageTool (RED_LIGHT_HYPHEN)
 * Category: grammar
 */
export const redLightHyphenRule: GrammarRule = {
  id: 'red-light-hyphen',
  name: 'missing hyphen in \'red light district\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bred\b\s+\blight\b\s+\bdistricts?|streets?/gi;
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
