import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'true-crime'
 * 
 * Source: LanguageTool (TRUE_CRIME_HYPHEN)
 * Category: grammar
 */
export const trueCrimeHyphenRule: GrammarRule = {
  id: 'true-crime-hyphen',
  name: 'missing hyphen in \'true-crime\'',
  description: 'Consider adding a hyphen to this noun/adjective.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btrue\b\s+\bcrime\b\s+\btales?|documentar(y|ies)|movies?|series|tv|shows?|stor(y|ies)|podcasts?|books?|films?|museums?|enthusiasts?|fans?|files?|communit(y|ies)|sitcoms?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider adding a hyphen to this noun/adjective.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
