import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * treasure trough (trove)
 * 
 * Source: LanguageTool (TREASURE_TROUGH)
 * Category: grammar
 */
export const treasureTroughRule: GrammarRule = {
  id: 'treasure-trough',
  name: 'treasure trough (trove)',
  description: 'Did you mean treasure trove?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btreasure\b\s+\btrough\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean treasure trove?',
        suggestions: ["treasure trove"],
      });
    }
    
    return issues;
  },
};
