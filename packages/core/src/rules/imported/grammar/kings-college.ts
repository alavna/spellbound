import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * King's College
 * 
 * Source: LanguageTool (KINGS_COLLEGE)
 * Category: grammar
 */
export const kingsCollegeRule: GrammarRule = {
  id: 'kings-college',
  name: 'King\'s College',
  description: 'Did you mean the university King\'s College (capitalized and spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bKings\b\s+\bColl?[ae]ge\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the university King\'s College (capitalized and spelled with a possessive apostrophe)?',
        suggestions: ["King's College"],
      });
    }
    
    return issues;
  },
};
