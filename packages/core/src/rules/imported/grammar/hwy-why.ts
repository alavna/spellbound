import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hwy vs why
 * 
 * Source: LanguageTool (HWY_WHY)
 * Category: grammar
 */
export const hwyWhyRule: GrammarRule = {
  id: 'hwy-why',
  name: 'hwy vs why',
  description: '\"Hwy\" is the abbreviation for \"Highway\". Did you mean why?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Hh]wy\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Hwy\" is the abbreviation for \"Highway\". Did you mean why?',
        suggestions: ["why"],
      });
    }
    
    return issues;
  },
};
