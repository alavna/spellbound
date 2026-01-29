import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * They haft (have) to
 * 
 * Source: LanguageTool (PRP_HAFT)
 * Category: grammar
 */
export const prpHaftRule: GrammarRule = {
  id: 'prp-haft',
  name: 'They haft (have) to',
  description: 'Did you mean have?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bhaft\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean have?',
        suggestions: ["have"],
      });
    }
    
    return issues;
  },
};
