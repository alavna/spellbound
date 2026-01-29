import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He knocked (on) the door
 * 
 * Source: LanguageTool (MISSING_PREP_KNOCK_ON_DOOR)
 * Category: grammar
 */
export const missingPrepKnockOnDoorRule: GrammarRule = {
  id: 'missing-prep-knock-on-door',
  name: 'He knocked (on) the door',
  description: 'It looks like you\'re missing the preposition \"on\". Did you mean knock on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It looks like you\'re missing the preposition \"on\". Did you mean knock on?',
        suggestions: ["knock on"],
      });
    }
    
    return issues;
  },
};
