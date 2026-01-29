import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * that's they're (their)
 * 
 * Source: LanguageTool (THATS_THEYRE)
 * Category: grammar
 */
export const thatsTheyreRule: GrammarRule = {
  id: 'thats-theyre',
  name: 'that\'s they\'re (their)',
  description: 'Did you mean their?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat|it|who|s?he|there\b\s+'s\b\s+\bthey\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean their?',
        suggestions: ["their"],
      });
    }
    
    return issues;
  },
};
