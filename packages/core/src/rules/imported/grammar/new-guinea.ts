import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * New guinea (New Guinea)
 * 
 * Source: LanguageTool (NEW_GUINEA)
 * Category: grammar
 */
export const newGuineaRule: GrammarRule = {
  id: 'new-guinea',
  name: 'New guinea (New Guinea)',
  description: 'Did you mean the proper noun New Guinea (= large island)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bNew\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the proper noun New Guinea (= large island)?',
        suggestions: ["New Guinea"],
      });
    }
    
    return issues;
  },
};
