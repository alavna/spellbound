import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I'm avoiding to register (registering) for classes because I've had a bad experience
 * 
 * Source: LanguageTool (AVOIDING_TO_INFIN)
 * Category: grammar
 */
export const avoidingToInfinRule: GrammarRule = {
  id: 'avoiding-to-infin',
  name: 'I\'m avoiding to register (registering) for classes because I\'ve had a bad experience',
  description: 'The progressive form of the verb may be more appropriate here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bavoiding|contemplating|dreading|enjoying|risking\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The progressive form of the verb may be more appropriate here.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
