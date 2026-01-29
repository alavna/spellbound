import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing verb (dont't what / dont't know what)
 * 
 * Source: LanguageTool (DONT_WHAT)
 * Category: grammar
 */
export const dontWhatRule: GrammarRule = {
  id: 'dont-what',
  name: 'missing verb (dont\'t what / dont\'t know what)',
  description: 'A verb may be missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bca|could|did|do(es)?|ha[ds]|have|must|need|ought|sha|should|wo|would\b\s+\bn't\b\s+\bwh(at|o|ere|ich|ose|ether)|how\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A verb may be missing.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
