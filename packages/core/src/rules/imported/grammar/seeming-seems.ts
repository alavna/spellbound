import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * confusion of is seeming/seems
 * 
 * Source: LanguageTool (SEEMING_SEEMS)
 * Category: grammar
 */
export const seemingSeemsRule: GrammarRule = {
  id: 'seeming-seems',
  name: 'confusion of is seeming/seems',
  description: 'Did you mean seem?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bseeming\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean seem?',
        suggestions: ["seem"],
      });
    }
    
    return issues;
  },
};
