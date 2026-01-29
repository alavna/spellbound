import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * going (to) be
 * 
 * Source: LanguageTool (GOING_BE)
 * Category: grammar
 */
export const goingBeRule: GrammarRule = {
  id: 'going-be',
  name: 'going (to) be',
  description: 'Did you mean to \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgoing\b\s+\bbring|tell|be|have|do|say|make|get|become|miss|need|take|ask|try|call|leave|come|look|work|find|use|give|send|receive\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to \\2?',
        suggestions: ["to \\2"],
      });
    }
    
    return issues;
  },
};
