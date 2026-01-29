import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I need helps (help)
 * 
 * Source: LanguageTool (NEED_HELPS)
 * Category: grammar
 */
export const needHelpsRule: GrammarRule = {
  id: 'need-helps',
  name: 'I need helps (help)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\S+\s+\byes\b\s+\S+\s+\bhelps|supports\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
