import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fair sure → fairly sure
 * 
 * Source: LanguageTool (FAIR_SURE)
 * Category: grammar
 */
export const fairSureRule: GrammarRule = {
  id: 'fair-sure',
  name: 'fair sure → fairly sure',
  description: 'The words \'\\1 \\2\' may not fit in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsure\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The words \'\\1 \\2\' may not fit in this context.',
        suggestions: ["fairly sure","fair share","for sure","fair, sure,"],
      });
    }
    
    return issues;
  },
};
