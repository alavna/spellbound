import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * take away (takeaway)
 * 
 * Source: LanguageTool (TAKEAWAY)
 * Category: grammar
 */
export const takeawayRule: GrammarRule = {
  id: 'takeaway',
  name: 'take away (takeaway)',
  description: 'The noun take is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|his|her|their|our|your|s\b\s+\btake\b\s+\baways?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun take is spelled as one word.',
        suggestions: ["take"],
      });
    }
    
    return issues;
  },
};
