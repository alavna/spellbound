import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * note taking (note-taking)
 * 
 * Source: LanguageTool (NOTE_TAKING_HYPHEN)
 * Category: grammar
 */
export const noteTakingHyphenRule: GrammarRule = {
  id: 'note-taking-hyphen',
  name: 'note taking (note-taking)',
  description: 'The noun or adjective \\1-\\2 is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnote\b\s+\btaking\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun or adjective \\1-\\2 is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
