import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on-going (ongoing)
 * 
 * Source: LanguageTool (ON-GOING)
 * Category: grammar
 */
export const onGoingRule: GrammarRule = {
  id: 'on-going',
  name: 'on-going (ongoing)',
  description: 'Did you mean ongoing?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon-going\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ongoing?',
        suggestions: ["ongoing"],
      });
    }
    
    return issues;
  },
};
