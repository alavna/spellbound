import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Herbert Dies (Diess)
 * 
 * Source: LanguageTool (HERBERT_DIES)
 * Category: grammar
 */
export const herbertDiesRule: GrammarRule = {
  id: 'herbert-dies',
  name: 'Herbert Dies (Diess)',
  description: 'Did you mean the automotive manager Herbert Diess?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bHerbert\b\s+\bDies\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the automotive manager Herbert Diess?',
        suggestions: ["Herbert Diess"],
      });
    }
    
    return issues;
  },
};
