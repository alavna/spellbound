import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * each others’ (other’s)
 * 
 * Source: LanguageTool (EACH_OTHERS)
 * Category: grammar
 */
export const eachOthersRule: GrammarRule = {
  id: 'each-others',
  name: 'each others’ (other’s)',
  description: 'Did you mean other\'s?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beach\b\s+\bothers\b\s+&apostrophe;/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean other\'s?',
        suggestions: ["other's"],
      });
    }
    
    return issues;
  },
};
