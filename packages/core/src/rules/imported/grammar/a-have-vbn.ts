import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * A have been (I have been)
 * 
 * Source: LanguageTool (A_HAVE_VBN)
 * Category: grammar
 */
export const aHaveVbnRule: GrammarRule = {
  id: 'a-have-vbn',
  name: 'A have been (I have been)',
  description: 'Did you mean I?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhave\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean I?',
        suggestions: ["I"],
      });
    }
    
    return issues;
  },
};
