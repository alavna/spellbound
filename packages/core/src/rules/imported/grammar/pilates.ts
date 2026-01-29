import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Pilates
 * 
 * Source: LanguageTool (PILATES)
 * Category: grammar
 */
export const pilatesRule: GrammarRule = {
  id: 'pilates',
  name: 'Pilates',
  description: 'The name of this physical fitness system is normally capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpilates\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this physical fitness system is normally capitalized.',
        suggestions: ["Pilates"],
      });
    }
    
    return issues;
  },
};
