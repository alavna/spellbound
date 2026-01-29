import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * loosing (losing) effort
 * 
 * Source: LanguageTool (LOOSING_EFFORTRECORDSEASON)
 * Category: grammar
 */
export const loosingEffortrecordseasonRule: GrammarRule = {
  id: 'loosing-effortrecordseason',
  name: 'loosing (losing) effort',
  description: 'Did you mean losing (losing: cease to have, loosing: to free/liberate/relax)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bloosing\b\s+\beffort|record|season|streak|team|the|to\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean losing (losing: cease to have, loosing: to free/liberate/relax)?',
        suggestions: ["losing"],
      });
    }
    
    return issues;
  },
};
