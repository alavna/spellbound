import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to be elder (older) than
 * 
 * Source: LanguageTool (ELDER_OLDER)
 * Category: grammar
 */
export const elderOlderRule: GrammarRule = {
  id: 'elder-older',
  name: 'to be elder (older) than',
  description: 'Did you mean older?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\belder\b\s+\bthan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean older?',
        suggestions: ["older"],
      });
    }
    
    return issues;
  },
};
