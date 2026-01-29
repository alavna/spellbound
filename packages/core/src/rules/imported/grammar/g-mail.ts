import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Gmail
 * 
 * Source: LanguageTool (G_MAIL)
 * Category: grammar
 */
export const gMailRule: GrammarRule = {
  id: 'g-mail',
  name: 'Gmail',
  description: 'Did you mean Gmail (= email client from Google)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bg\b\s+\bmail\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Gmail (= email client from Google)?',
        suggestions: ["Gmail"],
      });
    }
    
    return issues;
  },
};
