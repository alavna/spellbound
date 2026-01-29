import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * souse (sous) chef
 * 
 * Source: LanguageTool (SOUSE_CHEF)
 * Category: grammar
 */
export const souseChefRule: GrammarRule = {
  id: 'souse-chef',
  name: 'souse (sous) chef',
  description: 'Did you mean sous chef?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsouse\b\s+\bchef\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean sous chef?',
        suggestions: ["sous chef"],
      });
    }
    
    return issues;
  },
};
