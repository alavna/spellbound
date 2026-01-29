import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hard working (hardworking)
 * 
 * Source: LanguageTool (HARD_WORKING_COMPOUND)
 * Category: grammar
 */
export const hardWorkingCompoundRule: GrammarRule = {
  id: 'hard-working-compound',
  name: 'hard working (hardworking)',
  description: 'This adjective is spelled with a hyphen or as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhard\b\s+\bworking\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This adjective is spelled with a hyphen or as one word.',
        suggestions: ["hardworking","\\1-\\2"],
      });
    }
    
    return issues;
  },
};
