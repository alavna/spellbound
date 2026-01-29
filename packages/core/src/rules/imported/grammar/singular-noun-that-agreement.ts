import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He bought one that work (works) underwater
 * 
 * Source: LanguageTool (SINGULAR_NOUN_THAT_AGREEMENT)
 * Category: grammar
 */
export const singularNounThatAgreementRule: GrammarRule = {
  id: 'singular-noun-that-agreement',
  name: 'He bought one that work (works) underwater',
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
