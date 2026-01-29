import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Capitalize file extensions
 * 
 * Source: LanguageTool (FILE_EXTENSIONS_CASE)
 * Category: grammar
 */
export const fileExtensionsCaseRule: GrammarRule = {
  id: 'file-extensions-case',
  name: 'Capitalize file extensions',
  description: 'File types are normally capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpdf|jpe?g|gif|png|svg|docx|xlsx?|pptx|html|php|s?css|jsx?|heif|mpe?g|exe|dmg|xml\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'File types are normally capitalized.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
