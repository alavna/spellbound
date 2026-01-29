import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * her vs hear
 * 
 * Source: LanguageTool (HER_HEAR)
 * Category: grammar
 */
export const herHearRule: GrammarRule = {
  id: 'her-hear',
  name: 'her vs hear',
  description: 'Did you mean the verb hear?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b\s+\bher\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb hear?',
        suggestions: ["hear"],
      });
    }
    
    return issues;
  },
};
