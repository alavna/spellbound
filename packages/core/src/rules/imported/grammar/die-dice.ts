import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one die, two dice
 * 
 * Source: LanguageTool (DIE_DICE)
 * Category: grammar
 */
export const dieDiceRule: GrammarRule = {
  id: 'die-dice',
  name: 'one die, two dice',
  description: '\'die\' is the singular form of \'dice\'. Consider using die.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba|one\b\s+\bdice\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'die\' is the singular form of \'dice\'. Consider using die.',
        suggestions: ["die"],
      });
    }
    
    return issues;
  },
};
