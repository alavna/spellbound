import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'a 32 bit processor'
 * 
 * Source: LanguageTool (BIT_HYPHEN)
 * Category: grammar
 */
export const bitHyphenRule: GrammarRule = {
  id: 'bit-hyphen',
  name: 'missing hyphen in \'a 32 bit processor\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /7|8|16|32|64|128|256|512|1024|2048|4096\s+\bbit\b\s+\S+\s+\bsystems?|platforms?|computers?|processors?|tokens?|hand\.?helds?|games?|apple|windows|intel|crc|arm|rsa|ssh|ssl|aes|sha|cpus?|ids?|gpus?|pcs?|monitors?|hash(es)?|music|arts?|floats?|pixels?|wep|decimal|random|keys?|encryption|encrypted|signed|memory|operating|os|data|personal|audio|address|graphics?|colou?rs?|coin|integers?|units?|java|jre|jdk|microprocessors?|microcontrollers?|linux|kernels?|arch(itectures)?s?|check|android|numbers?|intervals?|parallel|serials?|encoding|ascii\b/gi;
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
