import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I would appreciate (it) if
 * 
 * Source: LanguageTool (APPRECIATE_IF)
 * Category: grammar
 */
export const appreciateIfRule: GrammarRule = {
  id: 'appreciate-if',
  name: 'I would appreciate (it) if',
  description: 'It appears that an object is missing here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bappreciates?\s+\bif\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an object is missing here.',
        suggestions: ["\\1 it"],
      });
    }
    
    return issues;
  },
};
