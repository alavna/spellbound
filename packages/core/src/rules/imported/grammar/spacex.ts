import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * SpaceX
 * 
 * Source: LanguageTool (SPACEX)
 * Category: grammar
 */
export const spacexRule: GrammarRule = {
  id: 'spacex',
  name: 'SpaceX',
  description: 'Did you mean SpaceX (= aerospace company)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSpace\b\s+\bX\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean SpaceX (= aerospace company)?',
        suggestions: ["SpaceX"],
      });
    }
    
    return issues;
  },
};
