import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I didn't spoke (speak)
 * 
 * Source: LanguageTool (DIDN_T_SPOKE)
 * Category: grammar
 */
export const didnTSpokeRule: GrammarRule = {
  id: 'didn-t-spoke',
  name: 'I didn\'t spoke (speak)',
  description: 'The verb \"spoke\" means \"to furnish\". The past tense of \"speak\" is incorrect in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdid|do|does\b\s+\bn't|not\b\s+\S+\s+[Ss]poke\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \"spoke\" means \"to furnish\". The past tense of \"speak\" is incorrect in this context.',
        suggestions: ["speak"],
      });
    }
    
    return issues;
  },
};
