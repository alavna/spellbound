import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I never have been (I have never been)
 * 
 * Source: LanguageTool (I_NEVER_HAVE_BEEN)
 * Category: grammar
 */
export const iNeverHaveBeenRule: GrammarRule = {
  id: 'i-never-have-been',
  name: 'I never have been (I have never been)',
  description: 'Although not incorrect, the word order have never is preferred by native speakers.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|we|they\b\s+\bnever\b\s+\bhave\b\s+\bbeen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Although not incorrect, the word order have never is preferred by native speakers.',
        suggestions: ["have never"],
      });
    }
    
    return issues;
  },
};
