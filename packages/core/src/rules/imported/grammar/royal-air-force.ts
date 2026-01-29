import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * royal air force (Royal Air Force)
 * 
 * Source: LanguageTool (ROYAL_AIR_FORCE)
 * Category: grammar
 */
export const royalAirForceRule: GrammarRule = {
  id: 'royal-air-force',
  name: 'royal air force (Royal Air Force)',
  description: 'The proper noun Royal Air needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\broyal\b\s+\bair\b\s+\bforce|maroc\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The proper noun Royal Air needs to be capitalized.',
        suggestions: ["Royal Air"],
      });
    }
    
    return issues;
  },
};
