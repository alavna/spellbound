import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * They backup (back up)
 * 
 * Source: LanguageTool (PRP_BACKUP)
 * Category: grammar
 */
export const prpBackupRule: GrammarRule = {
  id: 'prp-backup',
  name: 'They backup (back up)',
  description: 'The verb \'back up\' is spelled as two words. The noun \'backup\' is spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|they|we\b\s+\bbackup\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \'back up\' is spelled as two words. The noun \'backup\' is spelled as one.',
        suggestions: ["back up"],
      });
    }
    
    return issues;
  },
};
