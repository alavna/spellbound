import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * What is you (your)
 * 
 * Source: LanguageTool (WHAT_IS_YOU)
 * Category: grammar
 */
export const whatIsYouRule: GrammarRule = {
  id: 'what-is-you',
  name: 'What is you (your)',
  description: 'Did you mean \\2 your?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(how|who|what|which|when|where|why)(ever)?\s+'s|is|was\b\s+\byou\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2 your?',
        suggestions: ["\\2 your"],
      });
    }
    
    return issues;
  },
};
