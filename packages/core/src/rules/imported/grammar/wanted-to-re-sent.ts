import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I wanted to resent (resend) that email
 * 
 * Source: LanguageTool (WANTED_TO_RE_SENT)
 * Category: grammar
 */
export const wantedToReSentRule: GrammarRule = {
  id: 'wanted-to-re-sent',
  name: 'I wanted to resent (resend) that email',
  description: 'In this context, the infinitive form may be more appropriate.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bto\b\s+\bresent\b\s+\S+\s+\bcorrespondence|e-?mails?|files?|info(rmation)?|letters?|links?|messages?|money|pages?|payments?|signals?|texts?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, the infinitive form may be more appropriate.',
        suggestions: ["resend"],
      });
    }
    
    return issues;
  },
};
