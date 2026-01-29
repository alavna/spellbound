import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * cursing (coursing) through veins
 * 
 * Source: LanguageTool (CURSING_THROUGH_VEINS)
 * Category: grammar
 */
export const cursingThroughVeinsRule: GrammarRule = {
  id: 'cursing-through-veins',
  name: 'cursing (coursing) through veins',
  description: 'Did you mean coursing through veins?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcursing\b\s+\bthrough\b\s+\bveins\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean coursing through veins?',
        suggestions: ["coursing through veins"],
      });
    }
    
    return issues;
  },
};
