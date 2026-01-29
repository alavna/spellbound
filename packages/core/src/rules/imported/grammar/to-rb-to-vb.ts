import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to also (to) go
 * 
 * Source: LanguageTool (TO_RB_TO_VB)
 * Category: grammar
 */
export const toRbToVbRule: GrammarRule = {
  id: 'to-rb-to-vb',
  name: 'to also (to) go',
  description: 'One of these words (\'to\') is redundant.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]o\b\s+\bmaybe|perhaps|also|usually|possibly|always|never|safely|perfectly|only|sometimes|finally|eventually|not|just|really|instead|again|almost|especially|apparently|already|probably|actually|however\b\s+[Tt]o\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'One of these words (\'to\') is redundant.',
        suggestions: ["\\1 \\2","\\2 \\3"],
      });
    }
    
    return issues;
  },
};
