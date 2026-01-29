import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Confusion of mans/men
 * 
 * Source: LanguageTool (CONFUSION_OF_MANS_MEN)
 * Category: grammar
 */
export const confusionOfMansMenRule: GrammarRule = {
  id: 'confusion-of-mans-men',
  name: 'Confusion of mans/men',
  description: '\'\\2\' refers to the verb \'man\' meaning take command of something. Did you mean men or man\'s?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmans\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\2\' refers to the verb \'man\' meaning take command of something. Did you mean men or man\'s?',
        suggestions: ["men","man's"],
      });
    }
    
    return issues;
  },
};
