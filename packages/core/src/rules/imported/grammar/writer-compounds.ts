import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ghost writer (ghostwriter)
 * 
 * Source: LanguageTool (WRITER_COMPOUNDS)
 * Category: grammar
 */
export const writerCompoundsRule: GrammarRule = {
  id: 'writer-compounds',
  name: 'ghost writer (ghostwriter)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcopy|script|sky|screen|type|ghost|song|speech\b\s+\bwriters?/gi;
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
