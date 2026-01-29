import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * That's what's (what)
 * 
 * Source: LanguageTool (THAT_S_WHAT_S)
 * Category: grammar
 */
export const thatSWhatSRule: GrammarRule = {
  id: 'that-s-what-s',
  name: 'That\'s what\'s (what)',
  description: 'It appears that the verb is not needed',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat\b\s+'s\b\s+\bwhat\b\s+'s\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that the verb is not needed',
        suggestions: ["\\3"],
      });
    }
    
    return issues;
  },
};
