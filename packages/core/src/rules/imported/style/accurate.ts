import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accurate
 * 
 * Source: LanguageTool (ACCURATE)
 * Category: style
 */
export const accurateRule: GrammarRule = {
  id: 'accurate',
  name: 'accurate',
  description: 'If it is not about aiming, use right; also detailed or correct.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baccurate\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If it is not about aiming, use right; also detailed or correct.',
        suggestions: ["right","detailed","correct"],
      });
    }
    
    return issues;
  },
};
