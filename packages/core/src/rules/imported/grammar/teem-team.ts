import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * football teem (football team)
 * 
 * Source: LanguageTool (TEEM_TEAM)
 * Category: grammar
 */
export const teemTeamRule: GrammarRule = {
  id: 'teem-team',
  name: 'football teem (football team)',
  description: 'Did you mean \\1 team?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmanagement|football|research|project|home|display|youth|cup|development|design|sales|rescue|cricket|production|care|action|hockey|rugby|league|campaign|inspection|support|soccer|mortar|test|specialist|negotiating|relay|buy-out|course|world|health|investigation|planning|school|treasury|inquiry|planting|service|styling|division|improvement|marketing|review|services|ward|policy|work|area|basketball|club|control|dream|hospital|insight|protection|sports|town|baseball|executive|touring|university|buyout\b\s+\bte(a|em)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 team?',
        suggestions: ["\\1 team"],
      });
    }
    
    return issues;
  },
};
