import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * see (sea)
 * 
 * Source: LanguageTool (SEE_SEA)
 * Category: grammar
 */
export const seeSeaRule: GrammarRule = {
  id: 'see-sea',
  name: 'see (sea)',
  description: 'Did you mean sea or seeing?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat\b\s+\bsee\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean sea or seeing?',
        suggestions: ["sea","seeing"],
      });
    }
    
    return issues;
  },
};
