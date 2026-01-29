import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * editor-in-chief
 * 
 * Source: LanguageTool (EDITOR_IN_CHIEF_HYPHEN)
 * Category: grammar
 */
export const editorInChiefHyphenRule: GrammarRule = {
  id: 'editor-in-chief-hyphen',
  name: 'editor-in-chief',
  description: 'The noun \\1-\\2-\\3 is normally spelled with hyphens.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beditors?\s+\bin\b\s+\bchief\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\1-\\2-\\3 is normally spelled with hyphens.',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
