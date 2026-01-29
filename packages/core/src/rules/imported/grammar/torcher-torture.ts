import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * torcher (torture) yourself
 * 
 * Source: LanguageTool (TORCHER_TORTURE)
 * Category: grammar
 */
export const torcherTortureRule: GrammarRule = {
  id: 'torcher-torture',
  name: 'torcher (torture) yourself',
  description: 'Did you mean the verb (= punish, to cause suffering)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\btorchers?\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb (= punish, to cause suffering)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
