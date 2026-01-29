import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * proper noun 'Japan'
 * 
 * Source: LanguageTool (JAPAN)
 * Category: grammar
 */
export const japanRule: GrammarRule = {
  id: 'japan',
  name: 'proper noun \'Japan\'',
  description: 'This noun needs to be capitalized if you mean the country Japan.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bjapan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun needs to be capitalized if you mean the country Japan.',
        suggestions: ["Japan"],
      });
    }
    
    return issues;
  },
};
