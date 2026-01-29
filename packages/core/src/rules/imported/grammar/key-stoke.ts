import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * key stoke (stroke)
 * 
 * Source: LanguageTool (KEY_STOKE)
 * Category: grammar
 */
export const keyStokeRule: GrammarRule = {
  id: 'key-stoke',
  name: 'key stoke (stroke)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhis|her|one|two|three|four|five|six|seven|eight|nine|ten|few|some|all|more|short|long|bold|total|broad|swimming|different|brush|key\b\s+\S+\s+\bstokes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
