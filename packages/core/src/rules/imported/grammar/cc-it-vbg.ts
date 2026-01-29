import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'it' vs. 'its' after 'and'
 * 
 * Source: LanguageTool (CC_IT_VBG)
 * Category: grammar
 */
export const ccItVbgRule: GrammarRule = {
  id: 'cc-it-vbg',
  name: '\'it\' vs. \'its\' after \'and\'',
  description: '&its;',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\S+\s+\band|or\b\s+[Ii]t\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '&its;',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
