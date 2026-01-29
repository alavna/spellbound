import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * reap what you sew (sow)
 * 
 * Source: LanguageTool (REAP_WHAT_YOU_SEW)
 * Category: grammar
 */
export const reapWhatYouSewRule: GrammarRule = {
  id: 'reap-what-you-sew',
  name: 'reap what you sew (sow)',
  description: 'Did you mean reap what you sow?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\breap\b\s+\bwhat\b\s+\byou\b\s+\bsew\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean reap what you sow?',
        suggestions: ["reap what you sow"],
      });
    }
    
    return issues;
  },
};
