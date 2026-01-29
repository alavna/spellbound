import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wen't (went)
 * 
 * Source: LanguageTool (WENT)
 * Category: grammar
 */
export const wentRule: GrammarRule = {
  id: 'went',
  name: 'wen\'t (went)',
  description: 'Did you mean went, won\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwen\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean went, won\\2t?',
        suggestions: ["went","won\\2t"],
      });
    }
    
    return issues;
  },
};
