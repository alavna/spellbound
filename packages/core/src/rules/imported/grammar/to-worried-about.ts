import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to worried (worry) about
 * 
 * Source: LanguageTool (TO_WORRIED_ABOUT)
 * Category: grammar
 */
export const toWorriedAboutRule: GrammarRule = {
  id: 'to-worried-about',
  name: 'to worried (worry) about',
  description: 'Did you mean worry?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\bworried\b\s+\babout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean worry?',
        suggestions: ["worry"],
      });
    }
    
    return issues;
  },
};
