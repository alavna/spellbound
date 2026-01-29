import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * laid (lay) ahead
 * 
 * Source: LanguageTool (LAID_AHEAD)
 * Category: grammar
 */
export const laidAheadRule: GrammarRule = {
  id: 'laid-ahead',
  name: 'laid (lay) ahead',
  description: 'Did you mean lay ahead?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blaid\b\s+\bahead\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean lay ahead?',
        suggestions: ["lay ahead"],
      });
    }
    
    return issues;
  },
};
