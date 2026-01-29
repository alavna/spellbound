import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It's supposed to prevent it (from) spilling over
 * 
 * Source: LanguageTool (PREVENT_FROM)
 * Category: style
 */
export const preventFromRule: GrammarRule = {
  id: 'prevent-from',
  name: 'It\'s supposed to prevent it (from) spilling over',
  description: 'Try inserting \'from\' here.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Try inserting \'from\' here.',
        suggestions: ["from \\3"],
      });
    }
    
    return issues;
  },
};
