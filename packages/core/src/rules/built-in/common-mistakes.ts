import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

/**
 * Common grammar mistakes and their corrections
 */

interface MistakePattern {
  pattern: RegExp;
  message: string;
  replacements: string[];
}

const commonMistakes: MistakePattern[] = [
  // Modal verb mistakes
  {
    pattern: /\bshould of\b/gi,
    message: '"should of" should be "should have" or "should\'ve"',
    replacements: ['should have', "should've"],
  },
  {
    pattern: /\bcould of\b/gi,
    message: '"could of" should be "could have" or "could\'ve"',
    replacements: ['could have', "could've"],
  },
  {
    pattern: /\bwould of\b/gi,
    message: '"would of" should be "would have" or "would\'ve"',
    replacements: ['would have', "would've"],
  },
  {
    pattern: /\bmust of\b/gi,
    message: '"must of" should be "must have" or "must\'ve"',
    replacements: ['must have', "must've"],
  },
  {
    pattern: /\bmight of\b/gi,
    message: '"might of" should be "might have" or "might\'ve"',
    replacements: ['might have', "might've"],
  },

  // Their/there/they're
  {
    pattern: /\btheir\s+(is|are|was|were)\b/gi,
    message: 'Did you mean "there" (location) instead of "their" (possession)?',
    replacements: ['there $1'],
  },
  {
    pattern: /\bthere\s+(car|house|book|dog|cat|phone|computer)\b/gi,
    message: 'Did you mean "their" (possession) instead of "there" (location)?',
    replacements: ['their $1'],
  },

  // Your/you're
  {
    pattern: /\byour\s+(welcome|right|wrong|correct|sure|certain)\b/gi,
    message: '"your" should be "you\'re" (you are)',
    replacements: ["you're $1"],
  },
  {
    pattern: /\byou're\s+(car|house|book|dog|cat|phone|computer|name)\b/gi,
    message: '"you\'re" should be "your" (possession)',
    replacements: ['your $1'],
  },

  // Its/it's - expanded pattern for common words that follow "it is"
  {
    pattern: /\bits\s+(a|an|the|not|very|quite|been|going|time|important|clear|obvious|necessary|essential|crucial|vital|critical|possible|impossible|likely|unlikely|true|false|hard|easy|difficult|simple|better|worse|best|worst|good|bad|great|fine|ok|okay|nice|interesting|amazing|wonderful|terrible|horrible|strange|weird|odd|funny|sad|happy|cold|hot|warm|cool|late|early|about|just|only|also|still|already|always|never|often|usually|sometimes|probably|certainly|definitely|actually|really|truly|simply|merely|basically|essentially|generally|typically|normally|commonly|frequently|rarely|seldom|no\s+wonder|no\s+surprise|worth|safe|dangerous|risky|fair|unfair)\b/gi,
    message: '"its" should be "it\'s" (it is)',
    replacements: ["it's $1"],
  },
  {
    pattern: /\bit's\s+(own|self)\b/gi,
    message: '"it\'s" should be "its" (possession)',
    replacements: ['its $1'],
  },

  // Than/then
  {
    pattern: /\bmore\s+(\w+)\s+then\b/gi,
    message: '"then" should be "than" in comparisons',
    replacements: ['more $1 than'],
  },
  {
    pattern: /\bbetter\s+then\b/gi,
    message: '"then" should be "than" in comparisons',
    replacements: ['better than'],
  },
  {
    pattern: /\bworse\s+then\b/gi,
    message: '"then" should be "than" in comparisons',
    replacements: ['worse than'],
  },
  {
    pattern: /\brather\s+then\b/gi,
    message: '"then" should be "than" after "rather"',
    replacements: ['rather than'],
  },

  // Effect/affect
  {
    pattern: /\bhave\s+an\s+affect\b/gi,
    message: '"affect" should be "effect" (noun)',
    replacements: ['have an effect'],
  },
  {
    pattern: /\bthe\s+affect\b/gi,
    message: '"affect" should be "effect" (noun)',
    replacements: ['the effect'],
  },
  {
    pattern: /\bwill\s+effect\s+(your|the|our|their)\b/gi,
    message: '"effect" should be "affect" (verb)',
    replacements: ['will affect $1'],
  },

  // Accept/except
  {
    pattern: /\bexcept\s+(the|this|that|your|my|our|their)\s+(invitation|offer|gift|apology)\b/gi,
    message: '"except" should be "accept" (to receive)',
    replacements: ['accept $1 $2'],
  },

  // Lose/loose
  {
    pattern: /\bdon't\s+loose\b/gi,
    message: '"loose" should be "lose" (to misplace)',
    replacements: ["don't lose"],
  },
  {
    pattern: /\bgoing\s+to\s+loose\b/gi,
    message: '"loose" should be "lose"',
    replacements: ['going to lose'],
  },
  {
    pattern: /\bwill\s+loose\b/gi,
    message: '"loose" should be "lose"',
    replacements: ['will lose'],
  },

  // Weather/whether
  {
    pattern: /\bweather\s+(or\s+not|you|we|they|it)\b/gi,
    message: '"weather" should be "whether"',
    replacements: ['whether $1'],
  },

  // Alot → a lot
  {
    pattern: /\balot\b/gi,
    message: '"alot" should be "a lot"',
    replacements: ['a lot'],
  },

  // Definately → definitely
  {
    pattern: /\bdefinately\b/gi,
    message: '"definately" should be "definitely"',
    replacements: ['definitely'],
  },

  // Seperate → separate
  {
    pattern: /\bseperate\b/gi,
    message: '"seperate" should be "separate"',
    replacements: ['separate'],
  },

  // Occured → occurred
  {
    pattern: /\boccured\b/gi,
    message: '"occured" should be "occurred"',
    replacements: ['occurred'],
  },

  // Recieve → receive
  {
    pattern: /\brecieve\b/gi,
    message: '"recieve" should be "receive"',
    replacements: ['receive'],
  },

  // Untill → until
  {
    pattern: /\buntill\b/gi,
    message: '"untill" should be "until"',
    replacements: ['until'],
  },

  // Wierd → weird
  {
    pattern: /\bwierd\b/gi,
    message: '"wierd" should be "weird"',
    replacements: ['weird'],
  },

  // Accomodate → accommodate
  {
    pattern: /\baccomodate\b/gi,
    message: '"accomodate" should be "accommodate"',
    replacements: ['accommodate'],
  },

  // Neccessary → necessary
  {
    pattern: /\bneccessary\b/gi,
    message: '"neccessary" should be "necessary"',
    replacements: ['necessary'],
  },

  // Grammer → grammar
  {
    pattern: /\bgrammer\b/gi,
    message: '"grammer" should be "grammar"',
    replacements: ['grammar'],
  },

  // Corelation → correlation (archaic spelling, suggest modern)
  {
    pattern: /\bcorelation\b/gi,
    message: '"corelation" is an archaic spelling; use "correlation"',
    replacements: ['correlation'],
  },
  {
    pattern: /\bcorelate\b/gi,
    message: '"corelate" is an archaic spelling; use "correlate"',
    replacements: ['correlate'],
  },
  {
    pattern: /\bcorelated\b/gi,
    message: '"corelated" is an archaic spelling; use "correlated"',
    replacements: ['correlated'],
  },

  // Principle vs principal (contextual)
  // "principle" when followed by nouns that suggest "main/primary person or thing"
  {
    pattern: /\bprinciple\s+(findings?|investigator|investigators?|researcher|researchers?|author|authors?|reason|reasons?|cause|causes?|component|components?|concern|concerns?|source|sources?|factor|factors?|objective|objectives?|goal|goals?|purpose|purposes?|character|characters?|dancer|dancers?|singer|singers?|actor|actors?|player|players?|amount|amounts?)\b/gi,
    message: 'Did you mean "principal" (main/primary)?',
    replacements: ['principal $1'],
  },
];

/**
 * Rule: Common grammar mistakes
 */
export const commonMistakesRule: GrammarRule = {
  id: 'common-mistakes/all',
  name: 'Common Mistakes',
  description: 'Catch common grammar and spelling mistakes',
  severity: 'error',
  category: 'grammar',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    for (const mistake of commonMistakes) {
      let match: RegExpExecArray | null;
      mistake.pattern.lastIndex = 0; // Reset regex

      while ((match = mistake.pattern.exec(context.text)) !== null) {
        // Process replacements with capture groups
        const replacements = mistake.replacements.map((repl) => {
          let result = repl;
          for (let i = 1; i < match!.length; i++) {
            result = result.replace(new RegExp(`\\$${i}`, 'g'), match![i] || '');
          }
          return result;
        });

        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + match[0].length,
            match: match[0],
            message: mistake.message,
            replacements,
          })
        );
      }
    }

    return issues;
  },
};

export const commonMistakesRules: GrammarRule[] = [commonMistakesRule];
