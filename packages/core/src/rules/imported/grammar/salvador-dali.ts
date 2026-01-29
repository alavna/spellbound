import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Salvador Dalí
 * 
 * Source: LanguageTool (SALVADOR_DALI)
 * Category: grammar
 */
export const salvadorDaliRule: GrammarRule = {
  id: 'salvador-dali',
  name: 'Salvador Dalí',
  description: 'Did you mean the Spanish surrealist artist Salvador Dalí?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSalva[td]ore?\s+\bDall?[íìi]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Spanish surrealist artist Salvador Dalí?',
        suggestions: ["Salvador Dalí"],
      });
    }
    
    return issues;
  },
};
