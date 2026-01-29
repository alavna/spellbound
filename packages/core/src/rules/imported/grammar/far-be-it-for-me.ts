import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * far be it for me (far be it from me)
 * 
 * Source: LanguageTool (FAR_BE_IT_FOR_ME)
 * Category: grammar
 */
export const farBeItForMeRule: GrammarRule = {
  id: 'far-be-it-for-me',
  name: 'far be it for me (far be it from me)',
  description: 'Did you mean far be it from me (=may this possibility be far away from me)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfar\b\s+\bbe\b\s+\bit\b\s+\bfor\b\s+\bme\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean far be it from me (=may this possibility be far away from me)?',
        suggestions: ["far be it from me"],
      });
    }
    
    return issues;
  },
};
