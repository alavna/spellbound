import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * counsel (consul) general
 * 
 * Source: LanguageTool (COUNSEL_GENERAL)
 * Category: grammar
 */
export const counselGeneralRule: GrammarRule = {
  id: 'counsel-general',
  name: 'counsel (consul) general',
  description: 'Did you mean consul \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcounsel\b\s+\bgenerals?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean consul \\2?',
        suggestions: ["consul \\2"],
      });
    }
    
    return issues;
  },
};
