import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * do you sings (sing)
 * 
 * Source: LanguageTool (DO_VBZ)
 * Category: grammar
 */
export const doVbzRule: GrammarRule = {
  id: 'do-vbz',
  name: 'do you sings (sing)',
  description: 'After the auxiliary verb \'do\', use the base form of the main verb. Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bDo(es)?|did\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'After the auxiliary verb \'do\', use the base form of the main verb. Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
