import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ya'll (Y'all)
 * 
 * Source: LanguageTool (YA_LL)
 * Category: grammar
 */
export const yaLlRule: GrammarRule = {
  id: 'ya-ll',
  name: 'Ya\'ll (Y\'all)',
  description: 'Did you mean y\'all?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bya\b\s+'ll\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean y\'all?',
        suggestions: ["y'all","you all","all of you"],
      });
    }
    
    return issues;
  },
};
