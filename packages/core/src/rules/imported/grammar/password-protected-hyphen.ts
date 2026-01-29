import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'password protected area'
 * 
 * Source: LanguageTool (PASSWORD_PROTECTED_HYPHEN)
 * Category: grammar
 */
export const passwordProtectedHyphenRule: GrammarRule = {
  id: 'password-protected-hyphen',
  name: 'missing hyphen in \'password protected area\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpassword\b\s+\bprotected\b\s+(area|doc(ument)?|(spread)?sheet|archive|zip|pdf|folder|system|page|(web)?site|file|account|drive|stick|usb|excel|app|cd|dropbox|email|gallery|iphone)s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
