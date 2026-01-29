import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * imminent (eminent) domain
 * 
 * Source: LanguageTool (IMMINENT_DOMAIN)
 * Category: grammar
 */
export const imminentDomainRule: GrammarRule = {
  id: 'imminent-domain',
  name: 'imminent (eminent) domain',
  description: 'Did you mean eminent domain?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bimminent\b\s+\bdomain\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean eminent domain?',
        suggestions: ["eminent domain"],
      });
    }
    
    return issues;
  },
};
