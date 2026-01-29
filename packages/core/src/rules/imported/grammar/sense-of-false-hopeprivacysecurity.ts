import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sense of false security (false sense of security)
 * 
 * Source: LanguageTool (SENSE_OF_FALSE_HOPEPRIVACYSECURITY)
 * Category: grammar
 */
export const senseOfFalseHopeprivacysecurityRule: GrammarRule = {
  id: 'sense-of-false-hopeprivacysecurity',
  name: 'sense of false security (false sense of security)',
  description: 'Did you mean false sense of ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsense\b\s+\bof\b\s+\bfalse\b\s+\bhope|privacy|security|confidence\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean false sense of ?',
        suggestions: ["false sense of"],
      });
    }
    
    return issues;
  },
};
