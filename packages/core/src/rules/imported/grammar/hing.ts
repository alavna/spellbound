import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hing (thing / hang)
 * 
 * Source: LanguageTool (HING)
 * Category: grammar
 */
export const hingRule: GrammarRule = {
  id: 'hing',
  name: 'hing (thing / hang)',
  description: 'Did you really mean \"\\1\" (= noun, another word for asafoetida)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhings?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you really mean \"\\1\" (= noun, another word for asafoetida)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
