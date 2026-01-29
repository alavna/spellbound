import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mute (moot) point
 * 
 * Source: LanguageTool (MUTE_POINT)
 * Category: grammar
 */
export const mutePointRule: GrammarRule = {
  id: 'mute-point',
  name: 'mute (moot) point',
  description: 'Did you mean moot point?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmute\b\s+\bpoint\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean moot point?',
        suggestions: ["moot point"],
      });
    }
    
    return issues;
  },
};
