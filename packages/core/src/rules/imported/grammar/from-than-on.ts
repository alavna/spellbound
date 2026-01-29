import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * from than (then) on
 * 
 * Source: LanguageTool (FROM_THAN_ON)
 * Category: grammar
 */
export const fromThanOnRule: GrammarRule = {
  id: 'from-than-on',
  name: 'from than (then) on',
  description: 'Did you mean from then on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfrom\b\s+\bthan\b\s+\bon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean from then on?',
        suggestions: ["from then on"],
      });
    }
    
    return issues;
  },
};
