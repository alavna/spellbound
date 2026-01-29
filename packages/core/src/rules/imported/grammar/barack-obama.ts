import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Barrack Obama -> Barack Obama
 * 
 * Source: LanguageTool (BARACK_OBAMA)
 * Category: grammar
 */
export const barackObamaRule: GrammarRule = {
  id: 'barack-obama',
  name: 'Barrack Obama -> Barack Obama',
  description: 'Did you mean the former president of the US?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bBarrack\b\s+\bObama\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the former president of the US?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
