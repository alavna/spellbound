import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * after been (being)
 * 
 * Source: LanguageTool (AFTER_BEEN)
 * Category: grammar
 */
export const afterBeenRule: GrammarRule = {
  id: 'after-been',
  name: 'after been (being)',
  description: 'Did you mean after being?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bafter\b\s+\bbeen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean after being?',
        suggestions: ["after being"],
      });
    }
    
    return issues;
  },
};
