import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Aftermarket
 * 
 * Source: LanguageTool (AFTERMARKET)
 * Category: grammar
 */
export const aftermarketRule: GrammarRule = {
  id: 'aftermarket',
  name: 'Aftermarket',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?|no|my|y?our|his|her|their|its|s\b\s+\S+\s+\bafter\b\s+\bmarkets?|life|math|parts?|pieces?|shaves?|shocks?|taste|thoughts?|shows?|glows?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: ["\\3"],
      });
    }
    
    return issues;
  },
};
