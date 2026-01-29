import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * first aid kid (kit)
 * 
 * Source: LanguageTool (FIRST_AID_KIT)
 * Category: grammar
 */
export const firstAidKitRule: GrammarRule = {
  id: 'first-aid-kit',
  name: 'first aid kid (kit)',
  description: 'Did you mean kit (=set of articles, tools, or supplies) instead of \'kid\' (=young person)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baid|starter|t(ravel|ool)\s+\bkid\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean kit (=set of articles, tools, or supplies) instead of \'kid\' (=young person)?',
        suggestions: ["kit"],
      });
    }
    
    return issues;
  },
};
