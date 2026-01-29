import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ad nauseaum (nauseam)
 * 
 * Source: LanguageTool (TYPO_AD_NAUSEAM)
 * Category: grammar
 */
export const typoAdNauseamRule: GrammarRule = {
  id: 'typo-ad-nauseam',
  name: 'ad nauseaum (nauseam)',
  description: 'Did you mean the Latin phrase ad nauseam, which means to a sickening or nauseating degree?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bad\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Latin phrase ad nauseam, which means to a sickening or nauseating degree?',
        suggestions: ["ad nauseam"],
      });
    }
    
    return issues;
  },
};
