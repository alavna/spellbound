import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Schitt's Creek
 * 
 * Source: LanguageTool (SCHITTS_CREEK)
 * Category: grammar
 */
export const schittsCreekRule: GrammarRule = {
  id: 'schitts-creek',
  name: 'Schitt\'s Creek',
  description: 'Did you mean the TV show Schitt\'s Creek?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsch?it?ts\b\s+\bcreek\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the TV show Schitt\'s Creek?',
        suggestions: ["Schitt's Creek"],
      });
    }
    
    return issues;
  },
};
