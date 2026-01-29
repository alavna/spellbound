import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * amassing/amazing
 * 
 * Source: LanguageTool (AMASSING_AMAZING)
 * Category: grammar
 */
export const amassingAmazingRule: GrammarRule = {
  id: 'amassing-amazing',
  name: 'amassing/amazing',
  description: 'Did you mean the adjective amazing (= great)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bamassing\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective amazing (= great)?',
        suggestions: ["amazing"],
      });
    }
    
    return issues;
  },
};
