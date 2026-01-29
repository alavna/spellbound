import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * This tools (These tools)
 * 
 * Source: LanguageTool (THIS_TOOLS)
 * Category: grammar
 */
export const thisToolsRule: GrammarRule = {
  id: 'this-tools',
  name: 'This tools (These tools)',
  description: 'Did you mean these?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bthis\b\s+\.{P}/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean these?',
        suggestions: ["these"],
      });
    }
    
    return issues;
  },
};
