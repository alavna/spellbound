import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * beckon (beck and) call
 * 
 * Source: LanguageTool (BECKON_CALL)
 * Category: grammar
 */
export const beckonCallRule: GrammarRule = {
  id: 'beckon-call',
  name: 'beckon (beck and) call',
  description: 'Did you mean beck and call?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbeckon\b\s+\bcall\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean beck and call?',
        suggestions: ["beck and call"],
      });
    }
    
    return issues;
  },
};
