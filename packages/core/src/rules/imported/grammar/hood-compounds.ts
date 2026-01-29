import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * neighbor hood (neighborhood)
 * 
 * Source: LanguageTool (HOOD_COMPOUNDS)
 * Category: grammar
 */
export const hoodCompoundsRule: GrammarRule = {
  id: 'hood-compounds',
  name: 'neighbor hood (neighborhood)',
  description: 'This noun normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgrandparent|neighbou?r|creature|bachelor|spinster|brother|widower|toddler|prophet|servant|mother|priest|father|sister|knight|person|people|maiden|nation|cousin|victim|orphan|parent|child|woman|false|state|widow|saint|monks|hardi|human|witch|adult|puppy|fairy|self|monk|maid|wife|serf|king|girl|baby|lady|aunt|man|god|boy\b\s+\bhoods?/gi;
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
