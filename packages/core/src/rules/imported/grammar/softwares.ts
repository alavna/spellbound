import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * softwares → pieces of software
 * 
 * Source: LanguageTool (SOFTWARES)
 * Category: grammar
 */
export const softwaresRule: GrammarRule = {
  id: 'softwares',
  name: 'softwares → pieces of software',
  description: 'In standard English, the noun \"\\1\" is uncountable. Consider using an alternative.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsoftwares\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In standard English, the noun \"\\1\" is uncountable. Consider using an alternative.',
        suggestions: ["pieces of software","software programs","software products","software packages"],
      });
    }
    
    return issues;
  },
};
