import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I've go to (I've got to)
 * 
 * Source: LanguageTool (VE_GO_TO)
 * Category: grammar
 */
export const veGoToRule: GrammarRule = {
  id: 've-go-to',
  name: 'I\'ve go to (I\'ve got to)',
  description: 'Did you mean got?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'ve\b\s+\bgo\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean got?',
        suggestions: ["got"],
      });
    }
    
    return issues;
  },
};
