import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Chat GPT (ChatGPT)
 * 
 * Source: LanguageTool (CHAT_GPT)
 * Category: grammar
 */
export const chatGptRule: GrammarRule = {
  id: 'chat-gpt',
  name: 'Chat GPT (ChatGPT)',
  description: 'ChatGPT (= Artificial Intelligence) is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bChat\b\s+\bGPT\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'ChatGPT (= Artificial Intelligence) is spelled as one word.',
        suggestions: ["ChatGPT"],
      });
    }
    
    return issues;
  },
};
