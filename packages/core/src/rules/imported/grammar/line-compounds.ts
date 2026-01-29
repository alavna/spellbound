import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dead line (deadline)
 * 
 * Source: LanguageTool (LINE_COMPOUNDS)
 * Category: grammar
 */
export const lineCompoundsRule: GrammarRule = {
  id: 'line-compounds',
  name: 'dead line (deadline)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdead|guide|border|pipe|base|head|stream|blood|roof|pot|coast|bee|life|time\b\s+\blines?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
