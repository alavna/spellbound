import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * egg yoke (egg yolk)
 * 
 * Source: LanguageTool (EGG_YOKE)
 * Category: grammar
 */
export const eggYokeRule: GrammarRule = {
  id: 'egg-yoke',
  name: 'egg yoke (egg yolk)',
  description: 'Did you mean egg yolk?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\begg\b\s+\byoke\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean egg yolk?',
        suggestions: ["egg yolk"],
      });
    }
    
    return issues;
  },
};
