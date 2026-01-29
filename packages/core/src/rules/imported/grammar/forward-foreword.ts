import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * forward vs. foreword
 * 
 * Source: LanguageTool (FORWARD_FOREWORD)
 * Category: grammar
 */
export const forwardForewordRule: GrammarRule = {
  id: 'forward-foreword',
  name: 'forward vs. foreword',
  description: 'Did you mean the adverb forward?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bforeword\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb forward?',
        suggestions: ["forward"],
      });
    }
    
    return issues;
  },
};
