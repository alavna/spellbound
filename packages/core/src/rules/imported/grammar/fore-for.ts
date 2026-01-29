import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fore vs for
 * 
 * Source: LanguageTool (FORE_FOR)
 * Category: grammar
 */
export const foreForRule: GrammarRule = {
  id: 'fore-for',
  name: 'fore vs for',
  description: 'Did you mean for or force?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ff]ore\b\s+\ban?|the|my|y?our|their|her|his|its\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean for or force?',
        suggestions: ["for","force"],
      });
    }
    
    return issues;
  },
};
