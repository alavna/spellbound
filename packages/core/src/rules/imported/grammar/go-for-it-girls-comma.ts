import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma after 'go for it'
 * 
 * Source: LanguageTool (GO_FOR_IT_GIRLS_COMMA)
 * Category: grammar
 */
export const goForItGirlsCommaRule: GrammarRule = {
  id: 'go-for-it-girls-comma',
  name: 'Comma after \'go for it\'',
  description: 'It seems that a comma is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgo|ready\b\s+\bfor\b\s+\bit\b\s+\blady|ladies|gentlemen|gents|lads|(girl|gal|boy|guy|dude|friend|folk)s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a comma is missing.',
        suggestions: ["\\3, \\4"],
      });
    }
    
    return issues;
  },
};
