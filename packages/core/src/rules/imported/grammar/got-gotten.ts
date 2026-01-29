import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * gotten/got
 * 
 * Source: LanguageTool (GOT_GOTTEN)
 * Category: grammar
 */
export const gotGottenRule: GrammarRule = {
  id: 'got-gotten',
  name: 'gotten/got',
  description: '\"Gotten\" is commonly used in American English. For varieties outside of North America, \"got\" is the preferred variant.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgotten\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Gotten\" is commonly used in American English. For varieties outside of North America, \"got\" is the preferred variant.',
        suggestions: ["got"],
      });
    }
    
    return issues;
  },
};
