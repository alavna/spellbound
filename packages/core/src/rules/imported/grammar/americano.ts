import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * speak Americano (American English)
 * 
 * Source: LanguageTool (AMERICANO)
 * Category: grammar
 */
export const americanoRule: GrammarRule = {
  id: 'americano',
  name: 'speak Americano (American English)',
  description: 'The noun \"\\2\" isn\'t used to describe a language. Did you mean American English?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bamericano\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \"\\2\" isn\'t used to describe a language. Did you mean American English?',
        suggestions: ["American English"],
      });
    }
    
    return issues;
  },
};
