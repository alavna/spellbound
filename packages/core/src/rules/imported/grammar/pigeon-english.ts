import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * pigeon (pidgin) English/...
 * 
 * Source: LanguageTool (PIGEON_ENGLISH)
 * Category: grammar
 */
export const pigeonEnglishRule: GrammarRule = {
  id: 'pigeon-english',
  name: 'pigeon (pidgin) English/...',
  description: 'Did you mean pidgin (=simplified language)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpigeon\b\s+\bEnglish|French|Spanish|Chinese|Russian\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean pidgin (=simplified language)?',
        suggestions: ["pidgin"],
      });
    }
    
    return issues;
  },
};
