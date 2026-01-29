import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * regard as being (regard as)
 * 
 * Source: LanguageTool (REGARD_AS_BEING)
 * Category: style
 */
export const regardAsBeingRule: GrammarRule = {
  id: 'regard-as-being',
  name: 'regard as being (regard as)',
  description: 'Word \"being\" is redundant. Use \\1 \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bas\b\s+\bbeing\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Word \"being\" is redundant. Use \\1 \\2.',
        suggestions: ["\\1 \\2"],
      });
    }
    
    return issues;
  },
};
