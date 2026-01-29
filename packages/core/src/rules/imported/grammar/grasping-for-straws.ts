import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * grasping for straws (grasping at straws)
 * 
 * Source: LanguageTool (GRASPING_FOR_STRAWS)
 * Category: grammar
 */
export const graspingForStrawsRule: GrammarRule = {
  id: 'grasping-for-straws',
  name: 'grasping for straws (grasping at straws)',
  description: 'Did you mean grasping at straws?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgrasping\b\s+\bfor\b\s+\bstraws\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean grasping at straws?',
        suggestions: ["grasping at straws"],
      });
    }
    
    return issues;
  },
};
