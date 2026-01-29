import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ve didn't
 * 
 * Source: LanguageTool (VE_DIDNT)
 * Category: grammar
 */
export const veDidntRule: GrammarRule = {
  id: 've-didnt',
  name: 've didn\'t',
  description: 'The text is not correct, but LanguageTool has no suggestions about how to correct the text.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'ve\b\s+\bdid|do\b\s+\bn't\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The text is not correct, but LanguageTool has no suggestions about how to correct the text.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
