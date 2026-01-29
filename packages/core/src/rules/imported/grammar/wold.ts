import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wold (world)
 * 
 * Source: LanguageTool (WOLD)
 * Category: grammar
 */
export const woldRule: GrammarRule = {
  id: 'wold',
  name: 'wold (world)',
  description: 'Are you sure that \"wold\" is the correct noun here? A wold is an upland area of open country.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwold\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Are you sure that \"wold\" is the correct noun here? A wold is an upland area of open country.',
        suggestions: ["word","world","wild"],
      });
    }
    
    return issues;
  },
};
