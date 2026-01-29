import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lear vs learn
 * 
 * Source: LanguageTool (LEAR_LEARN)
 * Category: grammar
 */
export const learLearnRule: GrammarRule = {
  id: 'lear-learn',
  name: 'lear vs learn',
  description: 'Did you mean the verb learn?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\blear\b\s+\bfrom\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb learn?',
        suggestions: ["learn"],
      });
    }
    
    return issues;
  },
};
