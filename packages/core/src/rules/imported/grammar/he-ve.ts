import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He've (He has)
 * 
 * Source: LanguageTool (HE_VE)
 * Category: grammar
 */
export const heVeRule: GrammarRule = {
  id: 'he-ve',
  name: 'He\'ve (He has)',
  description: 'The correct form of \"have\" after the third-person singular pronoun is \"has\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+'ve\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct form of \"have\" after the third-person singular pronoun is \"has\".',
        suggestions: ["\\1 has","\\1's"],
      });
    }
    
    return issues;
  },
};
