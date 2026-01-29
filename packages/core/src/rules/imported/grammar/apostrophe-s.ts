import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the sufferers (sufferer's) articulatory movements
 * 
 * Source: LanguageTool (APOSTROPHE_S)
 * Category: grammar
 */
export const apostropheSRule: GrammarRule = {
  id: 'apostrophe-s',
  name: 'the sufferers (sufferer\'s) articulatory movements',
  description: 'TBD',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'TBD',
        suggestions: ["'s"],
      });
    }
    
    return issues;
  },
};
