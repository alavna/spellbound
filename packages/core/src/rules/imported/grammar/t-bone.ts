import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * t-bone (T-bone)
 * 
 * Source: LanguageTool (T_BONE)
 * Category: grammar
 */
export const tBoneRule: GrammarRule = {
  id: 't-bone',
  name: 't-bone (T-bone)',
  description: 'The \"T\" in the word needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bt-bon(e|ing|es|ed)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The \"T\" in the word needs to be capitalized.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
