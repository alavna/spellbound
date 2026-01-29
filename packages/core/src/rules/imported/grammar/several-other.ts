import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * several other (others)
 * 
 * Source: LanguageTool (SEVERAL_OTHER)
 * Category: grammar
 */
export const severalOtherRule: GrammarRule = {
  id: 'several-other',
  name: 'several other (others)',
  description: 'Possibly, a noun is missing after \'\\2\'. Or do you mean others?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball|many|most|several|those|these|few\b\s+\bother\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possibly, a noun is missing after \'\\2\'. Or do you mean others?',
        suggestions: ["others"],
      });
    }
    
    return issues;
  },
};
