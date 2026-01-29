import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Lockheed Martin
 * 
 * Source: LanguageTool (LOCKHEED_MARTIN)
 * Category: grammar
 */
export const lockheedMartinRule: GrammarRule = {
  id: 'lockheed-martin',
  name: 'Lockheed Martin',
  description: 'Did you mean the defense company Lockheed Martin?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bLockhead\b\s+\bMartin\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the defense company Lockheed Martin?',
        suggestions: ["Lockheed Martin"],
      });
    }
    
    return issues;
  },
};
