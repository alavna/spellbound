import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Great(,) please ...
 * 
 * Source: LanguageTool (SENT_START_JJ_PLEASE_COMMA)
 * Category: grammar
 */
export const sentStartJjPleaseCommaRule: GrammarRule = {
  id: 'sent-start-jj-please-comma',
  name: 'Great(,) please ...',
  description: 'Consider adding a comma here or splitting the sentence.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bgreat|good|terrific|terrible|horrible|sweet|cool|nice|awesome|fantastic|brilliant|excellent|wow|perfect|thanks|wonderful|beautiful|splendid|superb|correct|done|right|neat\b\s+\bplease\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider adding a comma here or splitting the sentence.',
        suggestions: ["\\3, \\4","\\3!","\\3."],
      });
    }
    
    return issues;
  },
};
