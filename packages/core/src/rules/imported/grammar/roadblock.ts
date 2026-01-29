import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * road block (roadblock)
 * 
 * Source: LanguageTool (ROADBLOCK)
 * Category: grammar
 */
export const roadblockRule: GrammarRule = {
  id: 'roadblock',
  name: 'road block (roadblock)',
  description: 'The noun road is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\broad\b\s+\bblocks?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun road is spelled as one word.',
        suggestions: ["road"],
      });
    }
    
    return issues;
  },
};
