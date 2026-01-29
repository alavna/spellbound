import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * de factor (facto)
 * 
 * Source: LanguageTool (DE_FACTOR)
 * Category: grammar
 */
export const deFactorRule: GrammarRule = {
  id: 'de-factor',
  name: 'de factor (facto)',
  description: 'Did you mean de facto?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bde\b\s+\bfactor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean de facto?',
        suggestions: ["de facto"],
      });
    }
    
    return issues;
  },
};
