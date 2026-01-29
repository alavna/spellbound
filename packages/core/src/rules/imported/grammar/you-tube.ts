import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * YouTube
 * 
 * Source: LanguageTool (YOU_TUBE)
 * Category: grammar
 */
export const youTubeRule: GrammarRule = {
  id: 'you-tube',
  name: 'YouTube',
  description: 'The name/noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bYou\b\s+\bTube(rs?)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name/noun is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
