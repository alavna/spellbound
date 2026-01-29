import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * begone (begun)
 * 
 * Source: LanguageTool (BEGONE_BEGUN)
 * Category: grammar
 */
export const begoneBegunRule: GrammarRule = {
  id: 'begone-begun',
  name: 'begone (begun)',
  description: 'Did you mean begun (= past participle of \'begin\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bbegone\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean begun (= past participle of \'begin\')?',
        suggestions: ["begun"],
      });
    }
    
    return issues;
  },
};
