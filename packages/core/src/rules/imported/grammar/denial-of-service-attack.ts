import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphens in 'denial of service'
 * 
 * Source: LanguageTool (DENIAL_OF_SERVICE_ATTACK)
 * Category: grammar
 */
export const denialOfServiceAttackRule: GrammarRule = {
  id: 'denial-of-service-attack',
  name: 'missing hyphens in \'denial of service\'',
  description: 'It appears that hyphens are missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdenial|deny\b\s+\bof\b\s+\bservice\b\s+\battacks?|attackers?|protections?|vulnerabilit(y|ies)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that hyphens are missing.',
        suggestions: ["denial-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
