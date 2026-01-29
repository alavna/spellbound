import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * WeChat
 * 
 * Source: LanguageTool (WECHAT)
 * Category: grammar
 */
export const wechatRule: GrammarRule = {
  id: 'wechat',
  name: 'WeChat',
  description: 'The official name of this popular chat service is spelled with a capital \"C\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bWechat|wechat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The official name of this popular chat service is spelled with a capital \"C\".',
        suggestions: ["WeChat"],
      });
    }
    
    return issues;
  },
};
