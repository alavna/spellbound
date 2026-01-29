import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ground floor/first floor
 * 
 * Source: LanguageTool (GROUND_FIRST_FLOOR)
 * Category: grammar
 */
export const groundFirstFloorRule: GrammarRule = {
  id: 'ground-first-floor',
  name: 'ground floor/first floor',
  description: 'This word is British English. Did you mean first \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bground\b\s+\bfloors?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is British English. Did you mean first \\2?',
        suggestions: ["first \\2"],
      });
    }
    
    return issues;
  },
};
