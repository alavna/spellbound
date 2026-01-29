import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one man, two men
 * 
 * Source: LanguageTool (MAN_MEN)
 * Category: grammar
 */
export const manMenRule: GrammarRule = {
  id: 'man-men',
  name: 'one man, two men',
  description: '\'man\' is the singular form of \'men\'. Consider using man.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba|one\b\s+\bmen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'man\' is the singular form of \'men\'. Consider using man.',
        suggestions: ["man"],
      });
    }
    
    return issues;
  },
};
