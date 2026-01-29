import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Great(,) that is ...
 * 
 * Source: LanguageTool (SENT_START_JJ_THAT_COMMA)
 * Category: grammar
 */
export const sentStartJjThatCommaRule: GrammarRule = {
  id: 'sent-start-jj-that-comma',
  name: 'Great(,) that is ...',
  description: 'Consider adding a comma here or splitting the sentence.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bgreat|good|terrific|terrible|horrible|sweet|cool|nice|awesome|fantastic|brilliant|excellent|wow|perfect|thanks|wonderful|beautiful|splendid|superb|correct|done|right|neat\b\s+\bthat\b\s+'s|is|was\b/gi;
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
