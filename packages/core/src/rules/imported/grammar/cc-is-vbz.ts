import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * when is (it) comes off
 * 
 * Source: LanguageTool (CC_IS_VBZ)
 * Category: grammar
 */
export const ccIsVbzRule: GrammarRule = {
  id: 'cc-is-vbz',
  name: 'when is (it) comes off',
  description: 'Did you mean it?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bif|when(ever)?|since|unless|once|although|before|after\b\s+\bis\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean it?',
        suggestions: ["it"],
      });
    }
    
    return issues;
  },
};
