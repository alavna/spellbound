import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * my (may) be
 * 
 * Source: LanguageTool (MY_BE)
 * Category: grammar
 */
export const myBeRule: GrammarRule = {
  id: 'my-be',
  name: 'my (may) be',
  description: 'Did you mean may be or might be?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmy\b\s+\bbe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean may be or might be?',
        suggestions: ["may be","might be"],
      });
    }
    
    return issues;
  },
};
