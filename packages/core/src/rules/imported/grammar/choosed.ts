import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * choosed (chose)
 * 
 * Source: LanguageTool (CHOOSED)
 * Category: grammar
 */
export const choosedRule: GrammarRule = {
  id: 'choosed',
  name: 'choosed (chose)',
  description: 'The past tense and past participle of the verb \"to choose\" is chose. The past participle is chosen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bchoosed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense and past participle of the verb \"to choose\" is chose. The past participle is chosen.',
        suggestions: ["chose","chosen"],
      });
    }
    
    return issues;
  },
};
