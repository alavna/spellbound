import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * every (ever) since
 * 
 * Source: LanguageTool (EVERY_SINCE)
 * Category: grammar
 */
export const everySinceRule: GrammarRule = {
  id: 'every-since',
  name: 'every (ever) since',
  description: 'Did you mean ever since?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bevery\b\s+\bsince\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ever since?',
        suggestions: ["ever since"],
      });
    }
    
    return issues;
  },
};
