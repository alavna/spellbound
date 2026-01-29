import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wet (whet) your appetite
 * 
 * Source: LanguageTool (WET_YOUR_APPETITE)
 * Category: grammar
 */
export const wetYourAppetiteRule: GrammarRule = {
  id: 'wet-your-appetite',
  name: 'wet (whet) your appetite',
  description: 'Did you mean whet your appetite?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwet\b\s+\byour\b\s+\bappetite\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean whet your appetite?',
        suggestions: ["whet your appetite"],
      });
    }
    
    return issues;
  },
};
