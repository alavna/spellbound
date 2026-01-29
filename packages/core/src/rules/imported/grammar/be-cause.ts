import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be cause (because)
 * 
 * Source: LanguageTool (BE_CAUSE)
 * Category: grammar
 */
export const beCauseRule: GrammarRule = {
  id: 'be-cause',
  name: 'be cause (because)',
  description: 'Did you mean because?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe\b\s+\bcause\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean because?',
        suggestions: ["because"],
      });
    }
    
    return issues;
  },
};
