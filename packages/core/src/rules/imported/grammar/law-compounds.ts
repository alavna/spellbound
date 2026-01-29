import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * law suit (lawsuit)
 * 
 * Source: LanguageTool (LAW_COMPOUNDS)
 * Category: grammar
 */
export const lawCompoundsRule: GrammarRule = {
  id: 'law-compounds',
  name: 'law suit (lawsuit)',
  description: 'This noun normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blaw\b\s+\bsuits?|fare|breakers?|givers?|makers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun normally spelled as one word.',
        suggestions: ["law"],
      });
    }
    
    return issues;
  },
};
