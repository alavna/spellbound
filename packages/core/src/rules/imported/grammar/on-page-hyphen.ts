import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on page seo (on-page seo)
 * 
 * Source: LanguageTool (ON_PAGE_HYPHEN)
 * Category: grammar
 */
export const onPageHyphenRule: GrammarRule = {
  id: 'on-page-hyphen',
  name: 'on page seo (on-page seo)',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon|off\b\s+\bpage\b\s+\bseo|optimi[sz]ations?|connectors?|factors?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
