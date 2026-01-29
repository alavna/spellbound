import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * have a shower → take a shower
 * 
 * Source: LanguageTool (HAVE_A_SHOWER)
 * Category: grammar
 */
export const haveAShowerRule: GrammarRule = {
  id: 'have-a-shower',
  name: 'have a shower → take a shower',
  description: 'In American English, the verb take is usually used before \'\\5\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\S+\s+\bshower|bath\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In American English, the verb take is usually used before \'\\5\'.',
        suggestions: ["take"],
      });
    }
    
    return issues;
  },
};
