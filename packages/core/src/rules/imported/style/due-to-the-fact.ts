import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wordy phrase: due to the fact
 * 
 * Source: LanguageTool (DUE_TO_THE_FACT)
 * Category: style
 */
export const dueToTheFactRule: GrammarRule = {
  id: 'due-to-the-fact',
  name: 'wordy phrase: due to the fact',
  description: 'Remove wordy \"\\1 \\2 \\3 \\4 \\5\"',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdue\b\s+\bto\b\s+\bthe\b\s+\bfact\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Remove wordy \"\\1 \\2 \\3 \\4 \\5\"',
        suggestions: ["because"],
      });
    }
    
    return issues;
  },
};
