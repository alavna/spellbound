import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * back log (backlog)
 * 
 * Source: LanguageTool (BACK_COMPOUNDS)
 * Category: grammar
 */
export const backCompoundsRule: GrammarRule = {
  id: 'back-compounds',
  name: 'back log (backlog)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bback\b\s+\blogs?|ache|lash(es)?|bones?|drops?|packs?|packing|packed|packers?|grounds?|stages?|spaces?|spins?|stabs?|stabbed|stabbing|stabbers?|beats?|flips?|streets?|breakers?|gammon|slash(es)?|hands?|lights?|stretch(es)?|stops?|stopped|stopping|stor(y|ies)|plates?|fills?|filled|flipped|flipping\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: ["back"],
      });
    }
    
    return issues;
  },
};
