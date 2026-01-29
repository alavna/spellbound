import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * flashpoint (flash point)
 * 
 * Source: LanguageTool (FLASHPOINT)
 * Category: grammar
 */
export const flashpointRule: GrammarRule = {
  id: 'flashpoint',
  name: 'flashpoint (flash point)',
  description: 'Did you mean flash point?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bflashpoint\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean flash point?',
        suggestions: ["flash point"],
      });
    }
    
    return issues;
  },
};
