import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * eye brow/lash/lid/sight/sore (eyebrow/eyelash/eyelid/eyesight/eyesore)
 * 
 * Source: LanguageTool (EYE_COMPOUNDS)
 * Category: grammar
 */
export const eyeCompoundsRule: GrammarRule = {
  id: 'eye-compounds',
  name: 'eye brow/lash/lid/sight/sore (eyebrow/eyelash/eyelid/eyesight/eyesore)',
  description: 'This word is usually spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beye\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is usually spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
