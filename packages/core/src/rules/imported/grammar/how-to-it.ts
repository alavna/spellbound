import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I don't know how to (*missing verb*) it
 * 
 * Source: LanguageTool (HOW_TO_IT)
 * Category: grammar
 */
export const howToItRule: GrammarRule = {
  id: 'how-to-it',
  name: 'I don\'t know how to (*missing verb*) it',
  description: 'A verb seems to be missing between \'to\' and \'it\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhow\b\s+\bto\b\s+\bit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A verb seems to be missing between \'to\' and \'it\'.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
