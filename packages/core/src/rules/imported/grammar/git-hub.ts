import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * GitHub
 * 
 * Source: LanguageTool (GIT_HUB)
 * Category: grammar
 */
export const gitHubRule: GrammarRule = {
  id: 'git-hub',
  name: 'GitHub',
  description: 'Did you mean GitHub (= Coding Platform)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgit\b\s+\bhub\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean GitHub (= Coding Platform)?',
        suggestions: ["GitHub"],
      });
    }
    
    return issues;
  },
};
