import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * confusion of 'too' and 'to'
 * 
 * Source: LanguageTool (HAD_TOO)
 * Category: grammar
 */
export const hadTooRule: GrammarRule = {
  id: 'had-too',
  name: 'confusion of \'too\' and \'to\'',
  description: 'Did you mean to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhad|want(ed)?|need(ed)?|have|has\b\s+\btoo\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
