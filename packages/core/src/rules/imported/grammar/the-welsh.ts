import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the/a welsh (Welsh)
 * 
 * Source: LanguageTool (THE_WELSH)
 * Category: grammar
 */
export const theWelshRule: GrammarRule = {
  id: 'the-welsh',
  name: 'the/a welsh (Welsh)',
  description: 'Consider capitalizing this word if you want to describe something related to the country \"Wales\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?|y?our|my|their|his|her|its|s\b\s+\bwelsh\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider capitalizing this word if you want to describe something related to the country \"Wales\".',
        suggestions: ["Welsh"],
      });
    }
    
    return issues;
  },
};
