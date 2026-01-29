import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * easiest was (way) to
 * 
 * Source: LanguageTool (EASIEST_WAS_TO)
 * Category: grammar
 */
export const easiestWasToRule: GrammarRule = {
  id: 'easiest-was-to',
  name: 'easiest was (way) to',
  description: 'Did you mean way?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwas\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean way?',
        suggestions: ["way"],
      });
    }
    
    return issues;
  },
};
