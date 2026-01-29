import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * until such time as (until)
 * 
 * Source: LanguageTool (UNTIL_SUCH_TIME_AS)
 * Category: style
 */
export const untilSuchTimeAsRule: GrammarRule = {
  id: 'until-such-time-as',
  name: 'until such time as (until)',
  description: 'Use until.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\buntil\b\s+\bsuch\b\s+\btime\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use until.',
        suggestions: ["until"],
      });
    }
    
    return issues;
  },
};
