import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * vox populi, vox dei (Dei)
 * 
 * Source: LanguageTool (VOX_DEI)
 * Category: grammar
 */
export const voxDeiRule: GrammarRule = {
  id: 'vox-dei',
  name: 'vox populi, vox dei (Dei)',
  description: 'In this Latin phrase, Dei needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpopuli\b\s+\bvox\b\s+\bdei\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this Latin phrase, Dei needs to be capitalized.',
        suggestions: ["Dei"],
      });
    }
    
    return issues;
  },
};
