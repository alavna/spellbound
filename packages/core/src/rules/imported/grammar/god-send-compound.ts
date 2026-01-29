import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a god send (godsend)
 * 
 * Source: LanguageTool (GOD_SEND_COMPOUND)
 * Category: grammar
 */
export const godSendCompoundRule: GrammarRule = {
  id: 'god-send-compound',
  name: 'a god send (godsend)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bgod\b\s+\bsend\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: ["godsend"],
      });
    }
    
    return issues;
  },
};
