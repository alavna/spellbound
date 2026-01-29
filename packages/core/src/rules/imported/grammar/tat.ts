import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tat (that)
 * 
 * Source: LanguageTool (TAT)
 * Category: grammar
 */
export const tatRule: GrammarRule = {
  id: 'tat',
  name: 'tat (that)',
  description: 'In British English, the noun \'\\1\' means tasteless or shoddy items. Did you mean that?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]at\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In British English, the noun \'\\1\' means tasteless or shoddy items. Did you mean that?',
        suggestions: ["that"],
      });
    }
    
    return issues;
  },
};
