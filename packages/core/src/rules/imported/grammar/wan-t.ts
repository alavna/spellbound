import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wan't (want)
 * 
 * Source: LanguageTool (WAN_T)
 * Category: grammar
 */
export const wanTRule: GrammarRule = {
  id: 'wan-t',
  name: 'wan\'t (want)',
  description: 'Did you mean \\1\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwan\b\s+&apostrophe;\s+\bt|ted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\3?',
        suggestions: ["\\1\\3"],
      });
    }
    
    return issues;
  },
};
