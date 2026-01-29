import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * about who (whom) to
 * 
 * Source: LanguageTool (ABOUT_WHO_TO)
 * Category: grammar
 */
export const aboutWhoToRule: GrammarRule = {
  id: 'about-who-to',
  name: 'about who (whom) to',
  description: 'Did you mean whom to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\babout|of|over\b\s+\bwho\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean whom to?',
        suggestions: ["whom to"],
      });
    }
    
    return issues;
  },
};
