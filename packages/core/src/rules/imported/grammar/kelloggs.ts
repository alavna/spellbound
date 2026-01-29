import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Kellogg's
 * 
 * Source: LanguageTool (KELLOGGS)
 * Category: grammar
 */
export const kelloggsRule: GrammarRule = {
  id: 'kelloggs',
  name: 'Kellogg\'s',
  description: 'The food company is spelled Kellogg\'s (with a possessive apostrophe).',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bKell?ogg?s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The food company is spelled Kellogg\'s (with a possessive apostrophe).',
        suggestions: ["Kellogg's"],
      });
    }
    
    return issues;
  },
};
