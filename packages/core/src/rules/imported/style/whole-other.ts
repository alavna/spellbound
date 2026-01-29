import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a whole other (entirely different) issue
 * 
 * Source: LanguageTool (WHOLE_OTHER)
 * Category: style
 */
export const wholeOtherRule: GrammarRule = {
  id: 'whole-other',
  name: 'a whole other (entirely different) issue',
  description: 'The expression \'a whole other\' can seem colloquial. Consider replacing it with a more formal alternative.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bwhole\b\s+\bother\b\s+\bconversation|discussion|history|issue|matter|setup|situation|story|subject|topic\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The expression \'a whole other\' can seem colloquial. Consider replacing it with a more formal alternative.',
        suggestions: ["an entirely different"],
      });
    }
    
    return issues;
  },
};
