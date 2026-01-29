import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * verb before 'gave'
 * 
 * Source: LanguageTool (GAVE_GIVE)
 * Category: grammar
 */
export const gaveGiveRule: GrammarRule = {
  id: 'gave-give',
  name: 'verb before \'gave\'',
  description: 'Did you mean give?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgave\b\s+\bin\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean give?',
        suggestions: ["give"],
      });
    }
    
    return issues;
  },
};
