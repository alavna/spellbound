import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * door jam (jamb)
 * 
 * Source: LanguageTool (DOOR_JAM)
 * Category: grammar
 */
export const doorJamRule: GrammarRule = {
  id: 'door-jam',
  name: 'door jam (jamb)',
  description: 'Did you mean door jamb?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdoor\b\s+\bjam\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean door jamb?',
        suggestions: ["door jamb"],
      });
    }
    
    return issues;
  },
};
