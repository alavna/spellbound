import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It proofed (proved) to be better
 * 
 * Source: LanguageTool (PROOFED_PROVED)
 * Category: grammar
 */
export const proofedProvedRule: GrammarRule = {
  id: 'proofed-proved',
  name: 'It proofed (proved) to be better',
  description: 'Did you mean to write \'proved\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bproofed\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write \'proved\'?',
        suggestions: ["proved"],
      });
    }
    
    return issues;
  },
};
