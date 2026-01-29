import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 've having → 've been having
 * 
 * Source: LanguageTool (VE_HAVING)
 * Category: grammar
 */
export const veHavingRule: GrammarRule = {
  id: 've-having',
  name: '\'ve having → \'ve been having',
  description: 'Did you mean been having?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\.cw\.ould\.should\.you\.i\.we\.they\b\s+'ve\b\s+\bhaving\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean been having?',
        suggestions: ["been having"],
      });
    }
    
    return issues;
  },
};
