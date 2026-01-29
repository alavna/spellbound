import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ive -> I've
 * 
 * Source: LanguageTool (IVE_CONTRACTION)
 * Category: grammar
 */
export const iveContractionRule: GrammarRule = {
  id: 'ive-contraction',
  name: 'Ive -> I\'ve',
  description: 'Possible spelling mistake found.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bIve\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible spelling mistake found.',
        suggestions: ["I've"],
      });
    }
    
    return issues;
  },
};
