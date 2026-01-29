import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * home owner (homeowner)
 * 
 * Source: LanguageTool (OWNER_COMPOUNDS)
 * Category: grammar
 */
export const ownerCompoundsRule: GrammarRule = {
  id: 'owner-compounds',
  name: 'home owner (homeowner)',
  description: 'This noun normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bship|land|home\b\s+\bowners?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
