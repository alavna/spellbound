import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Jimmy Buffet (Buffett)
 * 
 * Source: LanguageTool (JIMMY_BUFFET)
 * Category: grammar
 */
export const jimmyBuffetRule: GrammarRule = {
  id: 'jimmy-buffet',
  name: 'Jimmy Buffet (Buffett)',
  description: 'Did you mean Jimmy Buffett?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bJimmy\b\s+\bBuffet\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Jimmy Buffett?',
        suggestions: ["Jimmy Buffett"],
      });
    }
    
    return issues;
  },
};
