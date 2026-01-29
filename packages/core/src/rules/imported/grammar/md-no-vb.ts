import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I can no (not) speak English
 * 
 * Source: LanguageTool (MD_NO_VB)
 * Category: grammar
 */
export const mdNoVbRule: GrammarRule = {
  id: 'md-no-vb',
  name: 'I can no (not) speak English',
  description: 'In this context, the correct negation is not.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bno\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, the correct negation is not.',
        suggestions: ["not"],
      });
    }
    
    return issues;
  },
};
