import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Call of Duty
 * 
 * Source: LanguageTool (CALL_OF_DUTY)
 * Category: grammar
 */
export const callOfDutyRule: GrammarRule = {
  id: 'call-of-duty',
  name: 'Call of Duty',
  description: 'Did you mean the video game Call of Duty?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcall\b\s+\bof\b\s+\bduty\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the video game Call of Duty?',
        suggestions: ["Call of Duty"],
      });
    }
    
    return issues;
  },
};
