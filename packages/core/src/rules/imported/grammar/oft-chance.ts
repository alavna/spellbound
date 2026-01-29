import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * oft chance (off chance)
 * 
 * Source: LanguageTool (OFT_CHANCE)
 * Category: grammar
 */
export const oftChanceRule: GrammarRule = {
  id: 'oft-chance',
  name: 'oft chance (off chance)',
  description: 'Did you mean off chance?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boft\b\s+\bchance\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean off chance?',
        suggestions: ["off chance"],
      });
    }
    
    return issues;
  },
};
