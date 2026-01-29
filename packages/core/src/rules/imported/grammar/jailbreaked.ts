import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * jailbreaked (jailbroke)
 * 
 * Source: LanguageTool (JAILBREAKED)
 * Category: grammar
 */
export const jailbreakedRule: GrammarRule = {
  id: 'jailbreaked',
  name: 'jailbreaked (jailbroke)',
  description: 'The past tense of the verb \"jailbreak\" is jailbroke, the past participle is jailbroken.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bjail-?breaked\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense of the verb \"jailbreak\" is jailbroke, the past participle is jailbroken.',
        suggestions: ["jailbroke","jailbroken"],
      });
    }
    
    return issues;
  },
};
