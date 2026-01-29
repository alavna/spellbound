import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * corral (coral)
 * 
 * Source: LanguageTool (CONFUSION_OF_CORRAL_CORAL)
 * Category: grammar
 */
export const confusionOfCorralCoralRule: GrammarRule = {
  id: 'confusion-of-corral-coral',
  name: 'corral (coral)',
  description: 'Did you mean coral?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcorral\b\s+\bpolyps\.\.reefs\.\.islands\.\.necklaces\.\.lipsticks\.\.bleaching\.sea\.springs\.\.atolls\.\.bay\.ecosystems\.\.red\.populations\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean coral?',
        suggestions: ["coral"],
      });
    }
    
    return issues;
  },
};
