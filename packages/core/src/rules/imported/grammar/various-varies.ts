import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * The decision sometimes various (varies)
 * 
 * Source: LanguageTool (VARIOUS_VARIES)
 * Category: grammar
 */
export const variousVariesRule: GrammarRule = {
  id: 'various-varies',
  name: 'The decision sometimes various (varies)',
  description: 'Did you mean to write the verb \"varies\" here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bvarious\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write the verb \"varies\" here?',
        suggestions: ["varies"],
      });
    }
    
    return issues;
  },
};
