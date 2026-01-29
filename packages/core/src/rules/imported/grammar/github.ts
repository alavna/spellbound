import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * GitHub
 * 
 * Source: LanguageTool (GITHUB)
 * Category: grammar
 */
export const githubRule: GrammarRule = {
  id: 'github',
  name: 'GitHub',
  description: 'The official name of this software platform is spelled with a capital \"H\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bGithub|github\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The official name of this software platform is spelled with a capital \"H\".',
        suggestions: ["GitHub"],
      });
    }
    
    return issues;
  },
};
