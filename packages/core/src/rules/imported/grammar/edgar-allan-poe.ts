import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Allen Poe (Allan Poe)
 * 
 * Source: LanguageTool (EDGAR_ALLAN_POE)
 * Category: grammar
 */
export const edgarAllanPoeRule: GrammarRule = {
  id: 'edgar-allan-poe',
  name: 'Allen Poe (Allan Poe)',
  description: 'Did you mean the American writer \"Edgar Allan Poe\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bAll?[ae]n\b\s+\bPoe?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the American writer \"Edgar Allan Poe\"?',
        suggestions: ["Allan Poe"],
      });
    }
    
    return issues;
  },
};
