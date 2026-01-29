import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * you're (your) JJS NN
 * 
 * Source: LanguageTool (YOURE_JJS_NN)
 * Category: grammar
 */
export const youreJjsNnRule: GrammarRule = {
  id: 'youre-jjs-nn',
  name: 'you\'re (your) JJS NN',
  description: 'Did you mean your ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean your ?',
        suggestions: ["your"],
      });
    }
    
    return issues;
  },
};
