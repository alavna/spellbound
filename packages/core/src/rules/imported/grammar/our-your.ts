import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * our vs your
 * 
 * Source: LanguageTool (OUR_YOUR)
 * Category: grammar
 */
export const ourYourRule: GrammarRule = {
  id: 'our-your',
  name: 'our vs your',
  description: 'Did you mean your?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthanks?\s+\bfor\b\s+\bour\b\s+\S+\s+\bhelp|message|(e-?)?mail|feedback|letter|support|understanding|attention|efforts?|patience|reply|response|consideration|concern|orders?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean your?',
        suggestions: ["your"],
      });
    }
    
    return issues;
  },
};
