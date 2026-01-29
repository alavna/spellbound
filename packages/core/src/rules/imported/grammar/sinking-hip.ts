import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a sinking (s)hip
 * 
 * Source: LanguageTool (SINKING_HIP)
 * Category: grammar
 */
export const sinkingHipRule: GrammarRule = {
  id: 'sinking-hip',
  name: 'a sinking (s)hip',
  description: 'Did you mean ship?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsinking\b\s+[hs]ip\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ship?',
        suggestions: ["ship"],
      });
    }
    
    return issues;
  },
};
