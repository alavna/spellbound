import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * writs vs writes
 * 
 * Source: LanguageTool (WRITS_WRITES)
 * Category: grammar
 */
export const writsWritesRule: GrammarRule = {
  id: 'writs-writes',
  name: 'writs vs writes',
  description: 'Did you mean the verb writes (\"to write\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bwrits\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb writes (\"to write\")?',
        suggestions: ["writes"],
      });
    }
    
    return issues;
  },
};
