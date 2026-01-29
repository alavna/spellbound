import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the re (are)
 * 
 * Source: LanguageTool (THE_RE)
 * Category: grammar
 */
export const theReRule: GrammarRule = {
  id: 'the-re',
  name: 'the re (are)',
  description: 'Did you mean there?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]he\b\s+\bre\b\s+\bwas|is|'s|are|were|have|has|need|would|will\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean there?',
        suggestions: ["there"],
      });
    }
    
    return issues;
  },
};
