import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Misspellings of 'Papua New Guinea'
 * 
 * Source: LanguageTool (PAPUA_NEW_GUINEA)
 * Category: grammar
 */
export const papuaNewGuineaRule: GrammarRule = {
  id: 'papua-new-guinea',
  name: 'Misspellings of \'Papua New Guinea\'',
  description: 'Did you mean Papua New (= country in Oceania)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPapp?u?au?\s+\bNew\b\s+(Guinea|Gunea|Guinae|Gunae|Guniea)n?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Papua New (= country in Oceania)?',
        suggestions: ["Papua New"],
      });
    }
    
    return issues;
  },
};
