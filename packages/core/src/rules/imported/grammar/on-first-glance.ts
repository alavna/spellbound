import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on (at) first glance
 * 
 * Source: LanguageTool (ON_FIRST_GLANCE)
 * Category: grammar
 */
export const onFirstGlanceRule: GrammarRule = {
  id: 'on-first-glance',
  name: 'on (at) first glance',
  description: 'Did you mean at?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bfirst|a\b\s+\bglance\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean at?',
        suggestions: ["at"],
      });
    }
    
    return issues;
  },
};
