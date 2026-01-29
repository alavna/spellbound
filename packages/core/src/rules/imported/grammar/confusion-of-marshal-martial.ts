import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * marshal/marital (martial)
 * 
 * Source: LanguageTool (CONFUSION_OF_MARSHAL_MARTIAL)
 * Category: grammar
 */
export const confusionOfMarshalMartialRule: GrammarRule = {
  id: 'confusion-of-marshal-martial',
  name: 'marshal/marital (martial)',
  description: 'Did you mean martial (relating to war or a warrior)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmar(sh|it)al\b\s+\bart\.ist\.\.s\.\.court\.discipline\.laws\.\.life\.music\.overtones\.\.people\.prowess\.rhetoric\.traditions\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean martial (relating to war or a warrior)?',
        suggestions: ["martial"],
      });
    }
    
    return issues;
  },
};
