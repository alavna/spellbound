import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing past tense for 'used to...'
 * 
 * Source: LanguageTool (USE_TO_VERB)
 * Category: grammar
 */
export const useToVerbRule: GrammarRule = {
  id: 'use-to-verb',
  name: 'Missing past tense for \'used to...\'',
  description: 'Make sure that \'\\2 \\3\' is correct. For habitual actions in the past or to mean \'accustomed to\', use used to.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\buse\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Make sure that \'\\2 \\3\' is correct. For habitual actions in the past or to mean \'accustomed to\', use used to.',
        suggestions: ["used to"],
      });
    }
    
    return issues;
  },
};
