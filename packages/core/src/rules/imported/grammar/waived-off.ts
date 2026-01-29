import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * waived (waved) off
 * 
 * Source: LanguageTool (WAIVED_OFF)
 * Category: grammar
 */
export const waivedOffRule: GrammarRule = {
  id: 'waived-off',
  name: 'waived (waved) off',
  description: 'Did you mean waved off?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwaived\b\s+\boff\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean waved off?',
        suggestions: ["waved off"],
      });
    }
    
    return issues;
  },
};
