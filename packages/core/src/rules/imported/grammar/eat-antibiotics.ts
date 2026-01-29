import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * eat (take) antibiotics
 * 
 * Source: LanguageTool (EAT_ANTIBIOTICS)
 * Category: grammar
 */
export const eatAntibioticsRule: GrammarRule = {
  id: 'eat-antibiotics',
  name: 'eat (take) antibiotics',
  description: 'In a medical context, people take or swallow \\2. If they eat \\2, it is a mistake. Did you mean take or swallow?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bantibiotics|medicines?|medication\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In a medical context, people take or swallow \\2. If they eat \\2, it is a mistake. Did you mean take or swallow?',
        suggestions: ["take","swallow"],
      });
    }
    
    return issues;
  },
};
