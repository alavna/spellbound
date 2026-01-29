import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * out + perform
 * 
 * Source: LanguageTool (OUT_PERFORM_COMPOUND)
 * Category: grammar
 */
export const outPerformCompoundRule: GrammarRule = {
  id: 'out-perform-compound',
  name: 'out + perform',
  description: 'The verb out is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Oo]ut\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb out is spelled as one word.',
        suggestions: ["out"],
      });
    }
    
    return issues;
  },
};
