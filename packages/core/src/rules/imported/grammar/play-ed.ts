import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * play ed (played)
 * 
 * Source: LanguageTool (PLAY_ED)
 * Category: grammar
 */
export const playEdRule: GrammarRule = {
  id: 'play-ed',
  name: 'play ed (played)',
  description: 'Did you mean the verb ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
