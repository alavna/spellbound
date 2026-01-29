import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he wasen't (wasn't)
 * 
 * Source: LanguageTool (WASEN_T)
 * Category: grammar
 */
export const wasenTRule: GrammarRule = {
  id: 'wasen-t',
  name: 'he wasen\'t (wasn\'t)',
  description: 'Typo detected. Did you mean wasn\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwasen|was|wasnt\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean wasn\\2t?',
        suggestions: ["wasn\\2t"],
      });
    }
    
    return issues;
  },
};
