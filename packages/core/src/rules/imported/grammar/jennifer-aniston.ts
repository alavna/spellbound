import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Jennifer Aniston
 * 
 * Source: LanguageTool (JENNIFER_ANISTON)
 * Category: grammar
 */
export const jenniferAnistonRule: GrammarRule = {
  id: 'jennifer-aniston',
  name: 'Jennifer Aniston',
  description: 'Did you mean the actress Jennifer Aniston?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bJenn?iff?er\b\s+\bAnn?iston\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the actress Jennifer Aniston?',
        suggestions: ["Jennifer Aniston"],
      });
    }
    
    return issues;
  },
};
