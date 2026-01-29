import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing possessive: This weeks (week's) meeting
 * 
 * Source: LanguageTool (THIS_YEARS_POSSESSIVE_APOSTROPHE)
 * Category: grammar
 */
export const thisYearsPossessiveApostropheRule: GrammarRule = {
  id: 'this-years-possessive-apostrophe',
  name: 'Missing possessive: This weeks (week\'s) meeting',
  description: 'It seems that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthis|last|next\b\s+\byears|months|weeks|weekends|afternoons|evenings|mornings|nights\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a possessive apostrophe is missing.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
