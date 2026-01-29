import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * chomping (champing) at the bit
 * 
 * Source: LanguageTool (CHOMPING_AT_THE_BIT)
 * Category: grammar
 */
export const chompingAtTheBitRule: GrammarRule = {
  id: 'chomping-at-the-bit',
  name: 'chomping (champing) at the bit',
  description: 'Did you mean champing at the bit?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bchomping\b\s+\bat\b\s+\bthe\b\s+\bbit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean champing at the bit?',
        suggestions: ["champing at the bit"],
      });
    }
    
    return issues;
  },
};
