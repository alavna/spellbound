import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Translation errors: by/for example
 * 
 * Source: LanguageTool (BY_EXAMPLE)
 * Category: grammar
 */
export const byExampleRule: GrammarRule = {
  id: 'by-example',
  name: 'Translation errors: by/for example',
  description: 'The best translation for the introductory phrase \"\\1 \\2\" is \"for example\". Did you mean For example?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bby|par\b\s+\bex[ae]mple\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The best translation for the introductory phrase \"\\1 \\2\" is \"for example\". Did you mean For example?',
        suggestions: ["For example"],
      });
    }
    
    return issues;
  },
};
