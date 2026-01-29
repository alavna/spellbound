import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hard (heart)
 * 
 * Source: LanguageTool (CONFUSION_OF_HART_HEART)
 * Category: grammar
 */
export const confusionOfHartHeartRule: GrammarRule = {
  id: 'confusion-of-hart-heart',
  name: 'hard (heart)',
  description: 'Did you mean heart?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat\b\s+\bthe\b\s+\bhe?ard|hart\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean heart?',
        suggestions: ["heart"],
      });
    }
    
    return issues;
  },
};
