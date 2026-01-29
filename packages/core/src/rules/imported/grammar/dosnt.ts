import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he dosn't (doesn't)
 * 
 * Source: LanguageTool (DOSNT)
 * Category: grammar
 */
export const dosntRule: GrammarRule = {
  id: 'dosnt',
  name: 'he dosn\'t (doesn\'t)',
  description: 'Typo detected. Did you mean doesn\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo[se]n|does|dosan|doasn|dosen\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean doesn\\2t?',
        suggestions: ["doesn\\2t"],
      });
    }
    
    return issues;
  },
};
