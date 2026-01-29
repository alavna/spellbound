import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'hair' + singular verb
 * 
 * Source: LanguageTool (HAIRS)
 * Category: grammar
 */
export const hairsRule: GrammarRule = {
  id: 'hairs',
  name: '\'hair\' + singular verb',
  description: '\'Hair\' is a mass noun: Use the singular, when you refer to someone\'s as an entity.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bhairs\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'Hair\' is a mass noun: Use the singular, when you refer to someone\'s as an entity.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
