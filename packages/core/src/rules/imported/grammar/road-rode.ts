import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * road vs rode
 * 
 * Source: LanguageTool (ROAD_RODE)
 * Category: grammar
 */
export const roadRodeRule: GrammarRule = {
  id: 'road-rode',
  name: 'road vs rode',
  description: 'The past tense of the verb \"to ride\" is rode.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|we|they|you|I\b\s+\S+\s+\broad\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense of the verb \"to ride\" is rode.',
        suggestions: ["rode"],
      });
    }
    
    return issues;
  },
};
