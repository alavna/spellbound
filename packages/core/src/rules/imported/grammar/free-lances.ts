import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * free lances (freelances)
 * 
 * Source: LanguageTool (FREE_LANCES)
 * Category: grammar
 */
export const freeLancesRule: GrammarRule = {
  id: 'free-lances',
  name: 'free lances (freelances)',
  description: 'Did you mean freelances?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfree\b\s+\blances\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean freelances?',
        suggestions: ["freelances"],
      });
    }
    
    return issues;
  },
};
