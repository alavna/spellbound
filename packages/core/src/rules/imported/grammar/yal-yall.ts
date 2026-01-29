import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * y'al (y'all)
 * 
 * Source: LanguageTool (YAL_YALL)
 * Category: grammar
 */
export const yalYallRule: GrammarRule = {
  id: 'yal-yall',
  name: 'y\'al (y\'all)',
  description: 'Did you mean \', a regional version of \'you\' (plural pronoun)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\by\b\s+&apostrophe;\s+\bal\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \', a regional version of \'you\' (plural pronoun)?',
        suggestions: ["'"],
      });
    }
    
    return issues;
  },
};
