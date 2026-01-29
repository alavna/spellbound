import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * you kidding (are you kidding)?
 * 
 * Source: LanguageTool (YOU_KIDDING)
 * Category: grammar
 */
export const youKiddingRule: GrammarRule = {
  id: 'you-kidding',
  name: 'you kidding (are you kidding)?',
  description: 'Did you mean Are you \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byour?\s+\bkidding\b\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Are you \\3?',
        suggestions: ["Are you \\3"],
      });
    }
    
    return issues;
  },
};
