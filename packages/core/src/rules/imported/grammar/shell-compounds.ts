import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bomb shell (bombshell)
 * 
 * Source: LanguageTool (SHELL_COMPOUNDS)
 * Category: grammar
 */
export const shellCompoundsRule: GrammarRule = {
  id: 'shell-compounds',
  name: 'bomb shell (bombshell)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbomb|nut|sea|egg|cockle|lamp|sub|clam\b\s+\bshells?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
