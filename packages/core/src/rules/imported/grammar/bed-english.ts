import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bed/bat (bad) English/...
 * 
 * Source: LanguageTool (BED_ENGLISH)
 * Category: grammar
 */
export const bedEnglishRule: GrammarRule = {
  id: 'bed-english',
  name: 'bed/bat (bad) English/...',
  description: 'Did you mean bad?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbed|bat\b\s+\bEnglish|attitudes?|foreign|languages?|spellings?|temper|grammar|news|ideas?|links?|days?|weather|luck|guys?|taste|breath|habits?|people|examples?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean bad?',
        suggestions: ["bad"],
      });
    }
    
    return issues;
  },
};
