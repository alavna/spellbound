import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * master's dissertation (thesis)
 * 
 * Source: LanguageTool (MASTERS_DISSERTATION_THESIS)
 * Category: grammar
 */
export const mastersDissertationThesisRule: GrammarRule = {
  id: 'masters-dissertation-thesis',
  name: 'master\'s dissertation (thesis)',
  description: 'In the US, the word \'\\3\' is usually for doctoral degrees. Did you mean \\1\\2 thesis?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmaster\b\s+'s\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In the US, the word \'\\3\' is usually for doctoral degrees. Did you mean \\1\\2 thesis?',
        suggestions: ["\\1\\2 thesis"],
      });
    }
    
    return issues;
  },
};
