import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Coldplay
 * 
 * Source: LanguageTool (COLD_PLAY)
 * Category: grammar
 */
export const coldPlayRule: GrammarRule = {
  id: 'cold-play',
  name: 'Coldplay',
  description: 'Did you mean Coldplay (= music band)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcold\b\s+\bplay\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Coldplay (= music band)?',
        suggestions: ["Coldplay"],
      });
    }
    
    return issues;
  },
};
