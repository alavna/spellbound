import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing verb after 'don't'
 * 
 * Source: LanguageTool (I_DONT_DT)
 * Category: grammar
 */
export const iDontDtRule: GrammarRule = {
  id: 'i-dont-dt',
  name: 'Missing verb after \'don\'t\'',
  description: 'It appears that a verb is missing before \"\\4\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|they|we|s?he|this|that|t[oe]se|(some|any|every|no)(body|one|thing)\s+\S+\s+\bdo|did|does\b\s+\byes\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a verb is missing before \"\\4\".',
        suggestions: ["have \\5","do \\5","get \\5","see \\5","know \\5"],
      });
    }
    
    return issues;
  },
};
