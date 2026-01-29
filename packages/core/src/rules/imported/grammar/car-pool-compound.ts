import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * car pool (carpool)
 * 
 * Source: LanguageTool (CAR_POOL_COMPOUND)
 * Category: grammar
 */
export const carPoolCompoundRule: GrammarRule = {
  id: 'car-pool-compound',
  name: 'car pool (carpool)',
  description: 'The noun or verb car is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcar\b\s+\bpool(ed|s|ing|ers?)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun or verb car is spelled as one word.',
        suggestions: ["car"],
      });
    }
    
    return issues;
  },
};
