import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lead roll (role)
 * 
 * Source: LanguageTool (LEAD_ROLL)
 * Category: grammar
 */
export const leadRollRule: GrammarRule = {
  id: 'lead-roll',
  name: 'lead roll (role)',
  description: 'Did you mean \\1 role?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blead(ing)?|major|minor|starring|(in)?significant|large|small\b\s+\broll\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 role?',
        suggestions: ["\\1 role"],
      });
    }
    
    return issues;
  },
};
