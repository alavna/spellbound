import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * other wise (otherwise)
 * 
 * Source: LanguageTool (OTHER_WISE_COMPOUND)
 * Category: grammar
 */
export const otherWiseCompoundRule: GrammarRule = {
  id: 'other-wise-compound',
  name: 'other wise (otherwise)',
  description: 'This has to be spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bother\b\s+\bwise\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This has to be spelled as one word.',
        suggestions: ["otherwise"],
      });
    }
    
    return issues;
  },
};
