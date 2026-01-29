import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

/**
 * too vs two (number context)
 * 
 * Detects "too" used where "two" (the number) is likely intended.
 * Source: LanguageTool (TOO_TOOL) - fixed
 * Category: grammar
 */
export const tooToolRule: GrammarRule = {
  id: 'too-two',
  name: 'too vs two',
  description: 'Detects "too" used where "two" (the number) is likely intended',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool', 'confusion'],
  enabled: true,

  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    
    // "too" followed by time/quantity words where "two" is likely meant
    // e.g., "too years", "too weeks", "too days", "too times", "too people"
    const pattern = /\btoo\s+(years?|months?|weeks?|days?|hours?|minutes?|seconds?|times?|people|persons?|things?|items?|pieces?|parts?|halves|thirds|quarters|hundred|thousand|million|billion|dozen|of\s+them|of\s+us|of\s+the)\b/gi;
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + 3, // Just "too"
          match: 'too',
          message: 'Did you mean "two" (the number)?',
          replacements: ['two'],
        })
      );
    }
    
    return issues;
  },
};
