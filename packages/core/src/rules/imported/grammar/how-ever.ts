import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * how ever (however)
 * 
 * Source: LanguageTool (HOW_EVER)
 * Category: grammar
 */
export const howEverRule: GrammarRule = {
  id: 'how-ever',
  name: 'how ever (however)',
  description: 'Did you mean however?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhow\b\s+\bever\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean however?',
        suggestions: ["however"],
      });
    }
    
    return issues;
  },
};
