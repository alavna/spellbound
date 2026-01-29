import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * foreign import (import)
 * 
 * Source: LanguageTool (FOREIGN_IMPORT)
 * Category: style
 */
export const foreignImportRule: GrammarRule = {
  id: 'foreign-import',
  name: 'foreign import (import)',
  description: 'This phrase is redundant. Use simply \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bforeign\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Use simply \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
