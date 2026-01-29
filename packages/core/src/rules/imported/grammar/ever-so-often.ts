import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Misused phrase: 'ever so often (every so often)'
 * 
 * Source: LanguageTool (EVER_SO_OFTEN)
 * Category: grammar
 */
export const everSoOftenRule: GrammarRule = {
  id: 'ever-so-often',
  name: 'Misused phrase: \'ever so often (every so often)\'',
  description: 'This phrase is non-standard in most writing. Did you mean every \\2 \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bever\b\s+\bso\b\s+\boften\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is non-standard in most writing. Did you mean every \\2 \\3?',
        suggestions: ["every \\2 \\3"],
      });
    }
    
    return issues;
  },
};
