import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * WhatsApp
 * 
 * Source: LanguageTool (WHATS_APP)
 * Category: grammar
 */
export const whatsAppRule: GrammarRule = {
  id: 'whats-app',
  name: 'WhatsApp',
  description: 'Did you mean WhatsApp (= Messenger) or what\'s up (= question)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhats\b\s+\bapp\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean WhatsApp (= Messenger) or what\'s up (= question)?',
        suggestions: ["WhatsApp","what's up"],
      });
    }
    
    return issues;
  },
};
