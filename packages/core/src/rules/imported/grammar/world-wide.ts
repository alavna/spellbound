import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * world wide (worldwide)
 * 
 * Source: LanguageTool (WORLD_WIDE)
 * Category: grammar
 */
export const worldWideRule: GrammarRule = {
  id: 'world-wide',
  name: 'world wide (worldwide)',
  description: 'The adjective/adverb worldwide is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bworld\b\s+\bwide\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective/adverb worldwide is spelled as one word.',
        suggestions: ["worldwide"],
      });
    }
    
    return issues;
  },
};
