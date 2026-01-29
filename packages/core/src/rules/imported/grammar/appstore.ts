import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * AppStore (App Store, Amazon Appstore)
 * 
 * Source: LanguageTool (APPSTORE)
 * Category: grammar
 */
export const appstoreRule: GrammarRule = {
  id: 'appstore',
  name: 'AppStore (App Store, Amazon Appstore)',
  description: 'If you mean the Apple digital distribution platform, use App Store. For Amazon, use Amazon Appstore.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bappstore\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If you mean the Apple digital distribution platform, use App Store. For Amazon, use Amazon Appstore.',
        suggestions: ["App Store","Amazon Appstore"],
      });
    }
    
    return issues;
  },
};
