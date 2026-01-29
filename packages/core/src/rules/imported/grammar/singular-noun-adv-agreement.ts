import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * The dog always bark(s) at me
 * 
 * Source: LanguageTool (SINGULAR_NOUN_ADV_AGREEMENT)
 * Category: grammar
 */
export const singularNounAdvAgreementRule: GrammarRule = {
  id: 'singular-noun-adv-agreement',
  name: 'The dog always bark(s) at me',
  description: 'Possible subject-verb agreement error.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible subject-verb agreement error.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
