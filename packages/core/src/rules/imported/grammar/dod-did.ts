import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dod vs did
 * 
 * Source: LanguageTool (DOD_DID)
 * Category: grammar
 */
export const dodDidRule: GrammarRule = {
  id: 'dod-did',
  name: 'dod vs did',
  description: 'Did you mean did \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdod\b\s+\bnot\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean did \\2?',
        suggestions: ["did \\2"],
      });
    }
    
    return issues;
  },
};
