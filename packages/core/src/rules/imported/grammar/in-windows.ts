import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in (on) Windows
 * 
 * Source: LanguageTool (IN_WINDOWS)
 * Category: grammar
 */
export const inWindowsRule: GrammarRule = {
  id: 'in-windows',
  name: 'in (on) Windows',
  description: 'The correct preposition appears to be on.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]n\b\s+\bWindows|macOS|Linux|Ubuntu|Debian\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct preposition appears to be on.',
        suggestions: ["on"],
      });
    }
    
    return issues;
  },
};
