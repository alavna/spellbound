import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * along the same vein (along the same line, in the same vein)
 * 
 * Source: LanguageTool (ALONG_THE_SAME_VEIN)
 * Category: grammar
 */
export const alongTheSameVeinRule: GrammarRule = {
  id: 'along-the-same-vein',
  name: 'along the same vein (along the same line, in the same vein)',
  description: 'This phrase is nonstandard. Use in the same vein or along the same line.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\balong\b\s+\bthe\b\s+\bsame\b\s+\bvein\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is nonstandard. Use in the same vein or along the same line.',
        suggestions: ["in the same vein","along the same line"],
      });
    }
    
    return issues;
  },
};
