import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in titled (entitled)
 * 
 * Source: LanguageTool (IN_TITLED)
 * Category: grammar
 */
export const inTitledRule: GrammarRule = {
  id: 'in-titled',
  name: 'in titled (entitled)',
  description: 'Did you mean entitled?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[ei]n\b\s+\btitled\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean entitled?',
        suggestions: ["entitled"],
      });
    }
    
    return issues;
  },
};
