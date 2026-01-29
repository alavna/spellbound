import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * writed (wrote)
 * 
 * Source: LanguageTool (WROTE)
 * Category: grammar
 */
export const wroteRule: GrammarRule = {
  id: 'wrote',
  name: 'writed (wrote)',
  description: 'The past tense of the verb \"\" is .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(re-?)?writed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense of the verb \"\" is .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
