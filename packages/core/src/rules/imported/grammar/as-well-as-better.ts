import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing &apos;as&apos; in &apos;as well as or better than&apos;
 * 
 * Source: LanguageTool (AS_WELL_AS_BETTER)
 * Category: grammar
 */
export const asWellAsBetterRule: GrammarRule = {
  id: 'as-well-as-better',
  name: 'Missing &apos;as&apos; in &apos;as well as or better than&apos;',
  description: 'Did you mean as well as or better than?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\bwell\b\s+\bor\b\s+\bbetter\b\s+\bthan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean as well as or better than?',
        suggestions: ["as well as or better than"],
      });
    }
    
    return issues;
  },
};
