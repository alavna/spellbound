import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * gardener (garter) snake
 * 
 * Source: LanguageTool (GARDENERGARDEN_SNAKE)
 * Category: grammar
 */
export const gardenergardenSnakeRule: GrammarRule = {
  id: 'gardenergarden-snake',
  name: 'gardener (garter) snake',
  description: 'Did you mean garter snake?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgardener|garden\b\s+\bsnake\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean garter snake?',
        suggestions: ["garter snake"],
      });
    }
    
    return issues;
  },
};
