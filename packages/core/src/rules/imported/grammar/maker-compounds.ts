import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * trouble maker (troublemaker)
 * 
 * Source: LanguageTool (MAKER_COMPOUNDS)
 * Category: grammar
 */
export const makerCompoundsRule: GrammarRule = {
  id: 'maker-compounds',
  name: 'trouble maker (troublemaker)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btrouble|cabinet|clock|chip|deal|holiday|truck|boiler|phrase|peace|match|dress|watch|movie|policy|taste|noise|glass|plate|steel|paper|shirt|print|money|merry|auto|shoe|film|pace|rain|home|play|news|king|tool|ods|sail|myth|snow|tent|lock|drug|love|wine|law|car|hay|map|bed|die|wig|war|cap|hat\b\s+\bmakers?/gi;
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
