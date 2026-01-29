import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * can backup (back up)
 * 
 * Source: LanguageTool (CAN_BACKUP)
 * Category: grammar
 */
export const canBackupRule: GrammarRule = {
  id: 'can-backup',
  name: 'can backup (back up)',
  description: 'Did you mean \\1 back up?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan|to\b\s+\bbackup\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 back up?',
        suggestions: ["\\1 back up"],
      });
    }
    
    return issues;
  },
};
