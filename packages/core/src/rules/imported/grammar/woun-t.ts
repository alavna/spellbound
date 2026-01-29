import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * woun't → wouldn't, won't
 * 
 * Source: LanguageTool (WOUN_T)
 * Category: grammar
 */
export const wounTRule: GrammarRule = {
  id: 'woun-t',
  name: 'woun\'t → wouldn\'t, won\'t',
  description: 'Typo detected. Did you mean wouldn\\2\\3 or won\\2\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwoun\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean wouldn\\2\\3 or won\\2\\3?',
        suggestions: ["wouldn\\2\\3","won\\2\\3"],
      });
    }
    
    return issues;
  },
};
