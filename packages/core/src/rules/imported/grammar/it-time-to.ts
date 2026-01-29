import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It (is) time to ...
 * 
 * Source: LanguageTool (IT_TIME_TO)
 * Category: grammar
 */
export const itTimeToRule: GrammarRule = {
  id: 'it-time-to',
  name: 'It (is) time to ...',
  description: 'It appears that a verb is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]t\b\s+\btime\b\s+\bto|for\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a verb is missing.',
        suggestions: ["\\1's \\2 \\3"],
      });
    }
    
    return issues;
  },
};
