import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * attorney generals (attorneys general)
 * 
 * Source: LanguageTool (ATTORNEY_GENERALS)
 * Category: grammar
 */
export const attorneyGeneralsRule: GrammarRule = {
  id: 'attorney-generals',
  name: 'attorney generals (attorneys general)',
  description: 'The set phrase \"attorney general\" is correctly pluralized as attorneys general.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\battorney\b\s+\bgenerals\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The set phrase \"attorney general\" is correctly pluralized as attorneys general.',
        suggestions: ["attorneys general"],
      });
    }
    
    return issues;
  },
};
