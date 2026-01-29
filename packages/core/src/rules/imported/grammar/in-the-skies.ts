import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a blessing in the skies (disguise)
 * 
 * Source: LanguageTool (IN_THE_SKIES)
 * Category: grammar
 */
export const inTheSkiesRule: GrammarRule = {
  id: 'in-the-skies',
  name: 'a blessing in the skies (disguise)',
  description: 'Did you mean disguise (a blessing in disguise = an unfortunate event that results in a positive outcome)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bblessing\b\s+\bin\b\s+\bthe\b\s+\bskies\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean disguise (a blessing in disguise = an unfortunate event that results in a positive outcome)?',
        suggestions: ["disguise"],
      });
    }
    
    return issues;
  },
};
