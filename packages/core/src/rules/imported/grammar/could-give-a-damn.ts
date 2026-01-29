import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * could (couldn't) give a damn
 * 
 * Source: LanguageTool (COULD_GIVE_A_DAMN)
 * Category: grammar
 */
export const couldGiveADamnRule: GrammarRule = {
  id: 'could-give-a-damn',
  name: 'could (couldn\'t) give a damn',
  description: 'Did you mean couldn\'t give a damn?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcould\b\s+\bgive\b\s+\ba\b\s+\bdamn\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean couldn\'t give a damn?',
        suggestions: ["couldn't give a damn"],
      });
    }
    
    return issues;
  },
};
