import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * had vs. hard
 * 
 * Source: LanguageTool (HAD_HARD)
 * Category: grammar
 */
export const hadHardRule: GrammarRule = {
  id: 'had-hard',
  name: 'had vs. hard',
  description: 'Did you mean hard?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bhad\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean hard?',
        suggestions: ["hard"],
      });
    }
    
    return issues;
  },
};
