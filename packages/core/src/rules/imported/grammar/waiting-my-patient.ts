import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * waiting (for) a patient
 * 
 * Source: LanguageTool (WAITING_MY_PATIENT)
 * Category: grammar
 */
export const waitingMyPatientRule: GrammarRule = {
  id: 'waiting-my-patient',
  name: 'waiting (for) a patient',
  description: 'The word \"for\" is missing between \"\\1\" and \"\\1 \\2\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"for\" is missing between \"\\1\" and \"\\1 \\2\".',
        suggestions: ["\\1 for \\2 \\3"],
      });
    }
    
    return issues;
  },
};
