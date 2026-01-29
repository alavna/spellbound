import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * past experience/memory (experience/memory)
 * 
 * Source: LanguageTool (PAST_EXPERIENCE_MEMORY)
 * Category: style
 */
export const pastExperienceMemoryRule: GrammarRule = {
  id: 'past-experience-memory',
  name: 'past experience/memory (experience/memory)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpast\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
