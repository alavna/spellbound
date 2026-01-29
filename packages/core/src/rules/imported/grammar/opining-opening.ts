import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * opining vs. opening
 * 
 * Source: LanguageTool (OPINING_OPENING)
 * Category: grammar
 */
export const opiningOpeningRule: GrammarRule = {
  id: 'opining-opening',
  name: 'opining vs. opening',
  description: 'Did you mean opening (= present participle of \"to open\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bopining\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean opening (= present participle of \"to open\")?',
        suggestions: ["opening"],
      });
    }
    
    return issues;
  },
};
