import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ...you vary (very) much
 * 
 * Source: LanguageTool (VARY_MUCH)
 * Category: grammar
 */
export const varyMuchRule: GrammarRule = {
  id: 'vary-much',
  name: '...you vary (very) much',
  description: 'Did you mean very?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou\b\s+\bvary\b\s+\bmuch\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean very?',
        suggestions: ["very"],
      });
    }
    
    return issues;
  },
};
