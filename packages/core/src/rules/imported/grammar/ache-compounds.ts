import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * head ache (headache)
 * 
 * Source: LanguageTool (ACHE_COMPOUNDS)
 * Category: grammar
 */
export const acheCompoundsRule: GrammarRule = {
  id: 'ache-compounds',
  name: 'head ache (headache)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bheart|head|tooth\b\s+\bache\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
