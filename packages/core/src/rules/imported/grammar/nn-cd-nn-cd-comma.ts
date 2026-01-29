import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma in 'act 2 scene 5'
 * 
 * Source: LanguageTool (NN_CD_NN_CD_COMMA)
 * Category: grammar
 */
export const nnCdNnCdCommaRule: GrammarRule = {
  id: 'nn-cd-nn-cd-comma',
  name: 'Comma in \'act 2 scene 5\'',
  description: 'It seems that a comma is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bact|season|page|unit|lesson|module|grade|chapter|row|section|article\b\s+\S+\s+\bscene|episode|paragraph|task|seat|clause|section\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a comma is missing.',
        suggestions: ["\\1 \\2, \\3 \\4"],
      });
    }
    
    return issues;
  },
};
