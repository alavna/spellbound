import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he vs be
 * 
 * Source: LanguageTool (HE_BE)
 * Category: grammar
 */
export const heBeRule: GrammarRule = {
  id: 'he-be',
  name: 'he vs be',
  description: 'Did you mean be?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bhe\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean be?',
        suggestions: ["be"],
      });
    }
    
    return issues;
  },
};
