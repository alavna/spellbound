import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he ani't (ani't)
 * 
 * Source: LanguageTool (ANI_T)
 * Category: grammar
 */
export const aniTRule: GrammarRule = {
  id: 'ani-t',
  name: 'he ani\'t (ani\'t)',
  description: 'Did you mean ain\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bani\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ain\\2t?',
        suggestions: ["ain\\2t"],
      });
    }
    
    return issues;
  },
};
