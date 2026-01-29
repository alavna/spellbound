import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he gos (goes)
 * 
 * Source: LanguageTool (PRP_GOS)
 * Category: grammar
 */
export const prpGosRule: GrammarRule = {
  id: 'prp-gos',
  name: 'he gos (goes)',
  description: 'Did you mean goes (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bgos\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean goes (= verb)?',
        suggestions: ["goes"],
      });
    }
    
    return issues;
  },
};
