import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ladies and gentleman (gentlemen)
 * 
 * Source: LanguageTool (LADIES_AND_GENTLEMAN)
 * Category: grammar
 */
export const ladiesAndGentlemanRule: GrammarRule = {
  id: 'ladies-and-gentleman',
  name: 'ladies and gentleman (gentlemen)',
  description: 'Did you mean the plural form gentlemen?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bladies\b\s+\band|&amp;\s+\bgentleman\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the plural form gentlemen?',
        suggestions: ["gentlemen"],
      });
    }
    
    return issues;
  },
};
