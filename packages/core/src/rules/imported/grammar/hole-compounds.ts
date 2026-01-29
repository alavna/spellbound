import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * key hole (keyhole)
 * 
 * Source: LanguageTool (HOLE_COMPOUNDS)
 * Category: grammar
 */
export const holeCompoundsRule: GrammarRule = {
  id: 'hole-compounds',
  name: 'key hole (keyhole)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbutton|pigeon|cubby|thumb|stoke|chuck|hawse|loop|bore|sink|port|peep|worm|hell|knot|bolt|knee|bung|gunk|anet|key|man|pot|ass|arse|pin|fox|arm|rat|eye|mud|shit\b\s+\bholes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
