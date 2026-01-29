import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sit of (on) the shelf
 * 
 * Source: LanguageTool (ON_THE_SHELF)
 * Category: grammar
 */
export const onTheShelfRule: GrammarRule = {
  id: 'on-the-shelf',
  name: 'sit of (on) the shelf',
  description: 'Did you mean on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bo(ne|[fhr])|in\b\s+\bthe\b\s+\bshelf\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on?',
        suggestions: ["on"],
      });
    }
    
    return issues;
  },
};
