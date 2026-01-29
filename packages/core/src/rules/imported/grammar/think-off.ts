import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * think/know off (of)
 * 
 * Source: LanguageTool (THINK_OFF)
 * Category: grammar
 */
export const thinkOffRule: GrammarRule = {
  id: 'think-off',
  name: 'think/know off (of)',
  description: 'Did you mean of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthink(ing)?|know|thought\b\s+\boff\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean of?',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
