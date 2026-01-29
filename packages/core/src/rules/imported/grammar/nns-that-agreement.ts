import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * She brought some things that isn't (aren't) on the list
 * 
 * Source: LanguageTool (NNS_THAT_AGREEMENT)
 * Category: grammar
 */
export const nnsThatAgreementRule: GrammarRule = {
  id: 'nns-that-agreement',
  name: 'She brought some things that isn\'t (aren\'t) on the list',
  description: 'Possible subject-verb agreement error.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat\b/gi;
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
