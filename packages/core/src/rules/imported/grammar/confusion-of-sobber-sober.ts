import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sobber (sober)
 * 
 * Source: LanguageTool (CONFUSION_OF_SOBBER_SOBER)
 * Category: grammar
 */
export const confusionOfSobberSoberRule: GrammarRule = {
  id: 'confusion-of-sobber-sober',
  name: 'sobber (sober)',
  description: 'Did you mean sober (=not intoxicated)? \"Sobber\" means \"weeper, someone one who cries\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsobber\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean sober (=not intoxicated)? \"Sobber\" means \"weeper, someone one who cries\".',
        suggestions: ["sober"],
      });
    }
    
    return issues;
  },
};
