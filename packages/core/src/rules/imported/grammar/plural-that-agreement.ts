import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Do not believe any ratings that is (are) less than 5 stars
 * 
 * Source: LanguageTool (PLURAL_THAT_AGREEMENT)
 * Category: grammar
 */
export const pluralThatAgreementRule: GrammarRule = {
  id: 'plural-that-agreement',
  name: 'Do not believe any ratings that is (are) less than 5 stars',
  description: 'Possible subject-verb agreement error detected.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat|who\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible subject-verb agreement error detected.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
