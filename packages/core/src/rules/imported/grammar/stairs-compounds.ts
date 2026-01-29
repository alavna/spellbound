import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * down stairs (downstairs)
 * 
 * Source: LanguageTool (STAIRS_COMPOUNDS)
 * Category: grammar
 */
export const stairsCompoundsRule: GrammarRule = {
  id: 'stairs-compounds',
  name: 'down stairs (downstairs)',
  description: 'Did you mean \\1stairs?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bup|down\b\s+\bstairs\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1stairs?',
        suggestions: ["\\1stairs"],
      });
    }
    
    return issues;
  },
};
