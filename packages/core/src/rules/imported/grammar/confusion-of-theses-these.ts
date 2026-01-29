import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * theses (these)
 * 
 * Source: LanguageTool (CONFUSION_OF_THESES_THESE)
 * Category: grammar
 */
export const confusionOfThesesTheseRule: GrammarRule = {
  id: 'confusion-of-theses-these',
  name: 'theses (these)',
  description: 'Did you mean these?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btheses\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean these?',
        suggestions: ["these"],
      });
    }
    
    return issues;
  },
};
