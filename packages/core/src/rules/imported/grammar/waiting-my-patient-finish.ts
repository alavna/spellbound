import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: waiting (to) finish
 * 
 * Source: LanguageTool (WAITING_MY_PATIENT_FINISH)
 * Category: grammar
 */
export const waitingMyPatientFinishRule: GrammarRule = {
  id: 'waiting-my-patient-finish',
  name: 'Collocation: waiting (to) finish',
  description: 'The word \"to\" is missing before the infinitive form \"\\4\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"to\" is missing before the infinitive form \"\\4\".',
        suggestions: ["\\1 \\2 \\3 to \\4"],
      });
    }
    
    return issues;
  },
};
