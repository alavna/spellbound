import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * marry (merry)
 * 
 * Source: LanguageTool (MARRY_MERRY)
 * Category: grammar
 */
export const marryMerryRule: GrammarRule = {
  id: 'marry-merry',
  name: 'marry (merry)',
  description: 'Did you mean (=jolly, festive)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmarry\b\s+\bband|chase|Christmas|group|hell|X-?mas|ways?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (=jolly, festive)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
