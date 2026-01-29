import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * political gaffs (gaffes)
 * 
 * Source: LanguageTool (WRITINGPOLITICALSCIENCE_GAFFS)
 * Category: grammar
 */
export const writingpoliticalscienceGaffsRule: GrammarRule = {
  id: 'writingpoliticalscience-gaffs',
  name: 'political gaffs (gaffes)',
  description: 'Did you mean gaffes?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwriting|political|science|cultural|grammatical\b\s+\bgaffs\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean gaffes?',
        suggestions: ["gaffes"],
      });
    }
    
    return issues;
  },
};
