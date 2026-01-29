import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * loot vs lot
 * 
 * Source: LanguageTool (LOOT_LOT)
 * Category: grammar
 */
export const lootLotRule: GrammarRule = {
  id: 'loot-lot',
  name: 'loot vs lot',
  description: 'Did you mean \\1 ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba|with\b\s+\bloots?\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 ?',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
