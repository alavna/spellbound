import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Earl Grey
 * 
 * Source: LanguageTool (EARL_GREY)
 * Category: grammar
 */
export const earlGreyRule: GrammarRule = {
  id: 'earl-grey',
  name: 'Earl Grey',
  description: 'Did you mean Earl Grey (= tea blend)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bearl\b\s+\bgr[ae]y\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Earl Grey (= tea blend)?',
        suggestions: ["Earl Grey"],
      });
    }
    
    return issues;
  },
};
