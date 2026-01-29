import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ...if user(s) open the card by clicking on the error?
 * 
 * Source: LanguageTool (SUBJECT_NUMBER)
 * Category: grammar
 */
export const subjectNumberRule: GrammarRule = {
  id: 'subject-number',
  name: '...if user(s) open the card by clicking on the error?',
  description: 'Possible subject-verb agreement error detected: Did you mean to use the plural form here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bif\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible subject-verb agreement error detected: Did you mean to use the plural form here?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
