import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fowl (fell) swoop
 * 
 * Source: LanguageTool (FOWL_SWOOP)
 * Category: grammar
 */
export const fowlSwoopRule: GrammarRule = {
  id: 'fowl-swoop',
  name: 'fowl (fell) swoop',
  description: 'Did you mean fell swoop?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfowl\b\s+\bswoop\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean fell swoop?',
        suggestions: ["fell swoop"],
      });
    }
    
    return issues;
  },
};
