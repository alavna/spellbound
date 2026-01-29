import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hew (hue) and cry
 * 
 * Source: LanguageTool (HEW_AND_CRY)
 * Category: grammar
 */
export const hewAndCryRule: GrammarRule = {
  id: 'hew-and-cry',
  name: 'hew (hue) and cry',
  description: 'Did you mean hue and cry?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhew\b\s+\band\b\s+\bcry\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean hue and cry?',
        suggestions: ["hue and cry"],
      });
    }
    
    return issues;
  },
};
