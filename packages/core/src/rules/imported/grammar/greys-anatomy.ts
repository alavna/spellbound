import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Grey's Anatomy
 * 
 * Source: LanguageTool (GREYS_ANATOMY)
 * Category: grammar
 */
export const greysAnatomyRule: GrammarRule = {
  id: 'greys-anatomy',
  name: 'Grey\'s Anatomy',
  description: 'Did you mean Grey\'s Anatomy (TV show) or Gray\'s Anatomy (textbook of human anatomy)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bGr[ae]ys?\s+\bAnatomy\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Grey\'s Anatomy (TV show) or Gray\'s Anatomy (textbook of human anatomy)?',
        suggestions: ["Grey's Anatomy","Gray's Anatomy"],
      });
    }
    
    return issues;
  },
};
