import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Id would (I would)
 * 
 * Source: LanguageTool (ID_WOULD)
 * Category: grammar
 */
export const idWouldRule: GrammarRule = {
  id: 'id-would',
  name: 'Id would (I would)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|s?he|it|you|we|they\b\s+'d\b\s+[wc]ould|should\b/gi;
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
