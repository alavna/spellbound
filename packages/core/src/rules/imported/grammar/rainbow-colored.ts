import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * rainbow(-)colored leaves
 * 
 * Source: LanguageTool (RAINBOW_COLORED)
 * Category: grammar
 */
export const rainbowColoredRule: GrammarRule = {
  id: 'rainbow-colored',
  name: 'rainbow(-)colored leaves',
  description: 'This word is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brainbow|cream\b\s+\bcolou?red\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
