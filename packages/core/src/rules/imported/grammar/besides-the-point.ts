import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * besides (beside) the point
 * 
 * Source: LanguageTool (BESIDES_THE_POINT)
 * Category: grammar
 */
export const besidesThePointRule: GrammarRule = {
  id: 'besides-the-point',
  name: 'besides (beside) the point',
  description: 'Did you mean beside?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbesides\b\s+\bthe\b\s+\bpoint\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean beside?',
        suggestions: ["beside"],
      });
    }
    
    return issues;
  },
};
