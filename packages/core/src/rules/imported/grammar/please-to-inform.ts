import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * please (pleased) to
 * 
 * Source: LanguageTool (PLEASE_TO_INFORM)
 * Category: grammar
 */
export const pleaseToInformRule: GrammarRule = {
  id: 'please-to-inform',
  name: 'please (pleased) to',
  description: '\"Please to\" is not grammatically correct.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bplease\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Please to\" is not grammatically correct.',
        suggestions: ["pleased to","please"],
      });
    }
    
    return issues;
  },
};
