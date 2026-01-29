import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dentists (dentist's) appointment
 * 
 * Source: LanguageTool (DOCTORS_APPOINTMENT)
 * Category: grammar
 */
export const doctorsAppointmentRule: GrammarRule = {
  id: 'doctors-appointment',
  name: 'dentists (dentist\'s) appointment',
  description: 'It appears that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Dd]octors|[Dd]entists\b\s+\bappointments?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a possessive apostrophe is missing.',
        suggestions: ["'s"],
      });
    }
    
    return issues;
  },
};
