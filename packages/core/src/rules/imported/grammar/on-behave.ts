import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on behave (on behalf)
 * 
 * Source: LanguageTool (ON_BEHAVE)
 * Category: grammar
 */
export const onBehaveRule: GrammarRule = {
  id: 'on-behave',
  name: 'on behave (on behalf)',
  description: 'Did you mean on behalf (in the name of, as a representative of)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bbehave\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on behalf (in the name of, as a representative of)?',
        suggestions: ["on behalf"],
      });
    }
    
    return issues;
  },
};
