import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * internal rule
 * 
 * Source: LanguageTool (FAKE)
 * Category: grammar
 */
export const fakeRule: GrammarRule = {
  id: 'fake',
  name: 'internal rule',
  description: 'This is an internal placeholder to keep the XML syntax valid.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blanguagetool-placeholder-rule-643235483/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is an internal placeholder to keep the XML syntax valid.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
