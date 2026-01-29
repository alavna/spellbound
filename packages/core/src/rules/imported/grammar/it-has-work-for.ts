import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It has work (worked) for
 * 
 * Source: LanguageTool (IT_HAS_WORK_FOR)
 * Category: grammar
 */
export const itHasWorkForRule: GrammarRule = {
  id: 'it-has-work-for',
  name: 'It has work (worked) for',
  description: 'It appears that the correct verb form here is worked or been working.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit|this|that\b\s+\S+\s+\bhas\b\s+\bwork\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that the correct verb form here is worked or been working.',
        suggestions: ["worked","been working"],
      });
    }
    
    return issues;
  },
};
