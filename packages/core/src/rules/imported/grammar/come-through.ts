import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * come threw (through)
 * 
 * Source: LanguageTool (COME_THROUGH)
 * Category: grammar
 */
export const comeThroughRule: GrammarRule = {
  id: 'come-through',
  name: 'come threw (through)',
  description: 'Did you mean through?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bthr[eo]w\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean through?',
        suggestions: ["through"],
      });
    }
    
    return issues;
  },
};
