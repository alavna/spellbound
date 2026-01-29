import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * per vs pre
 * 
 * Source: LanguageTool (PER_PRE)
 * Category: grammar
 */
export const perPreRule: GrammarRule = {
  id: 'per-pre',
  name: 'per vs pre',
  description: 'Did you mean per?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bpre\b\s+\bhour|min(ute)?|sec(ond)?|day|week|month|year|cent\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean per?',
        suggestions: ["per"],
      });
    }
    
    return issues;
  },
};
