import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * soft ware (software)
 * 
 * Source: LanguageTool (WARE_COMPOUNDS)
 * Category: grammar
 */
export const wareCompoundsRule: GrammarRule = {
  id: 'ware-compounds',
  name: 'soft ware (software)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bransom|free|kitchen|earthen|lacquer|granite|crackle|course|silver|dinner|hollow|wooden|enamel|yellow|willow|luster|jasper|sponge|hypera|share|group|table|glass|stone|vapou?r|china|brass|metal|cream|bloat|delft|hollo|treen|agate|soft|hard|firm|gift|cook|bake|flat|stem|iron|dish|oven|slip|outs|clay|cane|bar|wet|red|tin|sea|tea\b\s+\bware\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
