import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * down load (download)
 * 
 * Source: LanguageTool (DOWN_COMPOUNDS)
 * Category: grammar
 */
export const downCompoundsRule: GrammarRule = {
  id: 'down-compounds',
  name: 'down load (download)',
  description: 'This word is normally spelled as one. Did you mean down?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdown\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one. Did you mean down?',
        suggestions: ["down"],
      });
    }
    
    return issues;
  },
};
