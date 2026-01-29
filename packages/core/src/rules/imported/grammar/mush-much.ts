import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mush vs. much
 * 
 * Source: LanguageTool (MUSH_MUCH)
 * Category: grammar
 */
export const mushMuchRule: GrammarRule = {
  id: 'mush-much',
  name: 'mush vs. much',
  description: 'Did you mean much?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou|it|her|him|them|us|me|thanks\b\s+\bvery|so\b\s+\bmush|match|mutch\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean much?',
        suggestions: ["much"],
      });
    }
    
    return issues;
  },
};
