import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * during (for)
 * 
 * Source: LanguageTool (CONFUSION_DURING_FOR)
 * Category: grammar
 */
export const confusionDuringForRule: GrammarRule = {
  id: 'confusion-during-for',
  name: 'during (for)',
  description: 'Did you mean for?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bduring\b\s+\bages\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean for?',
        suggestions: ["for"],
      });
    }
    
    return issues;
  },
};
