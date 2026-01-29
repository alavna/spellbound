import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Translation error: a gesture of greeting
 * 
 * Source: LanguageTool (GESTURE_OF_GREETING)
 * Category: grammar
 */
export const gestureOfGreetingRule: GrammarRule = {
  id: 'gesture-of-greeting',
  name: 'Translation error: a gesture of greeting',
  description: 'This expression sounds awkward. Did you mean waved at me?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bma\.dk\.es\.\s+\bme\b\s+\ba\b\s+\bgestures\.\s+\bof\b\s+\bgreeting\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This expression sounds awkward. Did you mean waved at me?',
        suggestions: ["waved at me"],
      });
    }
    
    return issues;
  },
};
