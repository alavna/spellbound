import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Enumerations with dashes: 1.2.-
 * 
 * Source: LanguageTool (ENUMERATION_AND_DASHES)
 * Category: grammar
 */
export const enumerationAndDashesRule: GrammarRule = {
  id: 'enumeration-and-dashes',
  name: 'Enumerations with dashes: 1.2.-',
  description: 'Dashes are unnecessary in enumerations.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\d+\s+\.\s+\.d\.1,2\.\s+\.\s+[—–‒-]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Dashes are unnecessary in enumerations.',
        suggestions: ["\\2\\3"],
      });
    }
    
    return issues;
  },
};
