import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wreck (wreak) havoc
 * 
 * Source: LanguageTool (WRECK_HAVOC)
 * Category: grammar
 */
export const wreckHavocRule: GrammarRule = {
  id: 'wreck-havoc',
  name: 'wreck (wreak) havoc',
  description: 'Did you mean wreak havoc?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwreck\b\s+\bhavoc\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wreak havoc?',
        suggestions: ["wreak havoc"],
      });
    }
    
    return issues;
  },
};
