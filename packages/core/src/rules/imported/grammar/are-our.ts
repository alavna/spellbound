import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * are vs our
 * 
 * Source: LanguageTool (ARE_OUR)
 * Category: grammar
 */
export const areOurRule: GrammarRule = {
  id: 'are-our',
  name: 'are vs our',
  description: 'Did you mean our?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bare\b\s+\bis|was|has|have|do|does\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean our?',
        suggestions: ["our"],
      });
    }
    
    return issues;
  },
};
