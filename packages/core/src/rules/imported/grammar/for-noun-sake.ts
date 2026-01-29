import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for heaven's sake
 * 
 * Source: LanguageTool (FOR_NOUN_SAKE)
 * Category: grammar
 */
export const forNounSakeRule: GrammarRule = {
  id: 'for-noun-sake',
  name: 'for heaven\'s sake',
  description: 'It appears that in this idiom a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+[a-zA-Z]+\s+\bsake\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that in this idiom a possessive apostrophe is missing.',
        suggestions: ["\\1 ’s sake","\\1 \\2’ sake"],
      });
    }
    
    return issues;
  },
};
