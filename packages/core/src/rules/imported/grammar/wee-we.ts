import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * we vs wee
 * 
 * Source: LanguageTool (WEE_WE)
 * Category: grammar
 */
export const weeWeRule: GrammarRule = {
  id: 'wee-we',
  name: 'we vs wee',
  description: 'Did you mean we?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ww]ee\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean we?',
        suggestions: ["we"],
      });
    }
    
    return issues;
  },
};
