import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * oft he (of the)
 * 
 * Source: LanguageTool (OFT_HE)
 * Category: grammar
 */
export const oftHeRule: GrammarRule = {
  id: 'oft-he',
  name: 'oft he (of the)',
  description: 'Did you mean of the?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boft\b\s+\bhe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean of the?',
        suggestions: ["of the"],
      });
    }
    
    return issues;
  },
};
