import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mail box (mailbox)
 * 
 * Source: LanguageTool (BOX_COMPOUNDS)
 * Category: grammar
 */
export const boxCompoundsRule: GrammarRule = {
  id: 'box-compounds',
  name: 'mail box (mailbox)',
  description: 'The noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmail|sand\b\s+\bbox\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
