import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in vein (in vain)
 * 
 * Source: LanguageTool (IN_VEIN)
 * Category: grammar
 */
export const inVeinRule: GrammarRule = {
  id: 'in-vein',
  name: 'in vein (in vain)',
  description: 'Did you mean in vain (=unsuccessfully)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bvein\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in vain (=unsuccessfully)?',
        suggestions: ["in vain"],
      });
    }
    
    return issues;
  },
};
