import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * does n't (doesn't)
 * 
 * Source: LanguageTool (DELETE_SPACE)
 * Category: grammar
 */
export const deleteSpaceRule: GrammarRule = {
  id: 'delete-space',
  name: 'does n\'t (doesn\'t)',
  description: 'Please check whether the space between \'\\1\' and \'\\2\' is correct.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo|did|does|can|could|have|has|had|should|ought|might|may|wo|would|ai|is|are|was|were|must|sha|need|dare\b\s+\bn't\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Please check whether the space between \'\\1\' and \'\\2\' is correct.',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
