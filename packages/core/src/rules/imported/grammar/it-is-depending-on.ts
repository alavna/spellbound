import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it's depending on (it depends on)
 * 
 * Source: LanguageTool (IT_IS_DEPENDING_ON)
 * Category: grammar
 */
export const itIsDependingOnRule: GrammarRule = {
  id: 'it-is-depending-on',
  name: 'it\'s depending on (it depends on)',
  description: 'In formal speech, it is preferable to avoid the progressive form in this case.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis|'s\b\s+\S+\s+\bdepending\b\s+\bon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In formal speech, it is preferable to avoid the progressive form in this case.',
        suggestions: ["\\1 \\3 depends \\5"],
      });
    }
    
    return issues;
  },
};
