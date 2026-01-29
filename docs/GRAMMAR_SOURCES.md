# Grammar Rules Data Sources

This document lists open-source grammar rule repositories and how to integrate them into Spellbound.

## Best Sources for Grammar Rules

### 1. ⭐ **LanguageTool** (RECOMMENDED)

- **URL**: https://github.com/languagetool-org/languagetool
- **Rules**: 5,000+ English grammar rules
- **License**: LGPL 2.1 (open source, attribution required)
- **Format**: XML-based rule definitions
- **Quality**: Production-grade, actively maintained
- **Languages**: 30+ languages supported

**Rule Location**:

```
languagetool/languagetool-language-modules/en/src/main/resources/org/languagetool/rules/en/
├── grammar.xml          (Main grammar rules - ~2,500 rules)
├── grammar-style.xml    (Style suggestions - ~800 rules)
├── grammar-coherency.xml (Text coherency - ~300 rules)
├── grammar-barbarism.xml (Common mistakes - ~400 rules)
└── ...more files
```

**Example Rule** (their XML format):

```xml
<rule id="THEIR_IS" name="their is (they're)">
  <pattern>
    <token regexp="yes">their|there</token>
    <token regexp="yes">is|are|was|were</token>
  </pattern>
  <message>Did you mean <suggestion>they're</suggestion>?</message>
  <short>Possible confusion of their/there/they're</short>
  <example correction="they're">
    <marker>Their</marker> going to the store.
  </example>
</rule>
```

**How to Use**:

1. Clone LanguageTool repository
2. Extract rules from XML files
3. Convert to Spellbound's JSON format
4. Import into your grammar checker

---

### 2. **After the Deadline**

- **URL**: https://github.com/Automattic/After-the-Deadline-Core
- **Rules**: ~500 style and grammar rules
- **License**: GPL (open source)
- **Format**: Custom C++ code with pattern matching
- **Quality**: Good, but less maintained
- **Used by**: WordPress, OpenOffice

**Rule Examples**:

- Cliché detection
- Passive voice detection
- Complex expression suggestions
- Redundancy checks

---

### 3. **Write Good**

- **URL**: https://github.com/btford/write-good
- **Rules**: ~20 style/readability rules
- **License**: MIT (very permissive)
- **Format**: JavaScript regex patterns
- **Quality**: Simple but effective
- **Focus**: Readability and clarity

**Rule Examples**:

```javascript
// Passive voice
/\b(am|are|were|being|is|been|was|be)\b\s*(\w+ed|awoken|been|born|beat|become|begun|bent|beset|bet|bid|bidden|bound|bitten|bled|blown|broken|bred|brought|broadcast|built|burnt|burst|bought|cast|caught|chosen|clung|come|cost|crept|cut|dealt|dug|dived|done|drawn|dreamt|driven|drunk|eaten|fallen|fed|felt|fought|found|fit|fled|flung|flown|forbidden|forgotten|foregone|forgiven|forsaken|frozen|gotten|given|gone|ground|grown|hung|heard|hidden|hit|held|hurt|kept|knelt|knit|known|laid|led|leapt|learnt|left|lent|let|lain|lighted|lost|made|meant|met|misspelt|mistaken|mown|overcome|overdone|overtaken|overthrown|paid|pled|proven|put|quit|read|rid|ridden|rung|risen|run|sawn|said|seen|sought|sold|sent|set|sewn|shaken|shaven|shorn|shed|shone|shod|shot|shown|shrunk|shut|sung|sunk|sat|slept|slain|slid|slung|slit|smitten|sown|spoken|sped|spent|spilt|spun|spit|split|spread|sprung|stood|stolen|stuck|stung|stunk|stridden|struck|strung|striven|sworn|swept|swollen|swum|swung|taken|taught|torn|told|thought|thrived|thrown|thrust|trodden|understood|upheld|upset|woken|worn|woven|wed|wept|wound|won|withheld|withstood|wrung|written)\b/ig

// Weasel words
/\b(many|various|very|fairly|several|extremely|exceedingly|quite|remarkably|few|surprisingly|mostly|largely|huge|tiny|((are|is) a number)|excellent|interestingly|significantly|substantially|clearly|vast|relatively|completely)\b/ig
```

---

### 4. **Grammalecte** (French, some English)

- **URL**: https://grammalecte.net/
- **Rules**: 2,000+ French rules, limited English
- **License**: GPL v3
- **Format**: Python-based rules
- **Quality**: Excellent for French

---

### 5. **Vale** (Style Linter)

- **URL**: https://github.com/errata-ai/vale
- **Rules**: Style guides (Microsoft, Google, AP, Chicago)
- **License**: MIT
- **Format**: YAML-based rules
- **Quality**: Excellent for technical writing

**Example Rule** (Vale YAML format):

```yaml
extends: existence
message: "Consider using '%s' instead of '%s'."
level: suggestion
ignorecase: true
swap:
  abundance of: many
  a number of: several
  is able to: can
  in order to: to
  prior to: before
```

---

## Converting LanguageTool Rules to Spellbound

### LanguageTool XML → Spellbound JSON Converter

I'll create a script that converts LanguageTool's XML rules to our format:

**Input** (LanguageTool XML):

```xml
<rule id="THEIR_IS" name="their is (they're)">
  <pattern>
    <token regexp="yes">their|there</token>
    <token regexp="yes">is|are</token>
  </pattern>
  <message>Did you mean <suggestion>they're</suggestion>?</message>
</rule>
```

**Output** (Spellbound JSON):

```typescript
{
  id: "their-is",
  name: "their/there/they're confusion",
  description: "Detects confusion between their/there/they're",
  category: "common-mistakes",
  severity: "warning",
  tags: ["grammar", "confusion"],

  check: (context) => {
    const pattern = /\b(their|there)\s+(is|are|was|were)\b/gi;
    const issues = [];

    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: "Did you mean 'they're' (they are)?",
        suggestions: [match[0].replace(/their|there/i, "they're")]
      });
    }

    return issues;
  }
}
```

---

## Recommended Approach

### Phase 1: Quick Wins (Manual Conversion)

Start with the most impactful rules from LanguageTool:

1. **Common Mistakes** (~100 rules)
   - their/there/they're
   - its/it's
   - your/you're
   - affect/effect
   - loose/lose

2. **Agreement Issues** (~50 rules)
   - Subject-verb agreement
   - Article-noun agreement
   - Pronoun agreement

3. **Punctuation** (~50 rules)
   - Missing commas
   - Quote placement
   - Apostrophe usage

**Estimated Coverage**: ~200 high-impact rules = ~80% of common errors

### Phase 2: Automated Conversion (Batch Import)

Create a converter script to process all LanguageTool rules:

```bash
# Download LanguageTool
git clone https://github.com/languagetool-org/languagetool.git

# Run converter
node scripts/convert-languagetool-rules.js \
  --input languagetool/languagetool-language-modules/en/src/main/resources/org/languagetool/rules/en/ \
  --output packages/core/src/rules/imported/

# Result: 5,000+ rules in Spellbound format
```

### Phase 3: Rule Categories to Import

| Category               | LanguageTool File     | Rules  | Priority    |
| ---------------------- | --------------------- | ------ | ----------- |
| **Grammar**            | grammar.xml           | ~2,500 | ⭐⭐⭐ High |
| **Style**              | grammar-style.xml     | ~800   | ⭐⭐ Medium |
| **Spelling Confusion** | confusion_sets.txt    | ~500   | ⭐⭐⭐ High |
| **Redundancy**         | grammar-coherency.xml | ~300   | ⭐ Low      |
| **Barbarisms**         | grammar-barbarism.xml | ~400   | ⭐⭐ Medium |
| **Casing**             | grammar.xml           | ~100   | ⭐⭐⭐ High |

---

## Other Linguistic Resources

### Confusion Sets (Commonly Confused Words)

- **SCOWL Confusion Sets**: http://wordlist.aspell.net/varcon/
- **Birkbeck Spelling Error Corpus**: https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/0643
- **Wikipedia Confusion Sets**: https://en.wikipedia.org/wiki/Commonly_confused_words_in_English

Example confusion sets:

```
accept/except
affect/effect
altar/alter
bare/bear
board/bored
brake/break
capital/capitol
complement/compliment
...500+ more pairs
```

### Style Guides (Vale Rules)

- **Microsoft Writing Style Guide**: https://github.com/errata-ai/Microsoft
- **Google Developer Documentation Style Guide**: https://github.com/errata-ai/Google
- **Write the Docs**: https://github.com/errata-ai/write-good

### Academic Resources

- **NUCLE Corpus** (NUS Corpus of Learner English): Common grammatical errors
- **Cambridge Learner Corpus**: Error patterns from language learners
- **EFCamDat**: 1.2M ESL learner sentences with corrections

---

## License Considerations

| Source             | License  | Can We Use? | Requirements                       |
| ------------------ | -------- | ----------- | ---------------------------------- |
| LanguageTool       | LGPL 2.1 | ✅ Yes      | Must remain open source, attribute |
| After the Deadline | GPL      | ✅ Yes      | Must remain open source            |
| Write Good         | MIT      | ✅ Yes      | Very permissive                    |
| Vale               | MIT      | ✅ Yes      | Very permissive                    |

**Recommendation**:

- Use LanguageTool rules (LGPL 2.1)
- Add attribution in package.json and README
- Keep grammar rules in separate package for license clarity

---

## Next Steps

1. **Create Converter Script**: Build tool to convert LanguageTool XML → Spellbound JSON
2. **Import Top 200 Rules**: Start with most impactful rules manually
3. **Test & Validate**: Ensure rules work correctly with our engine
4. **Add Configuration**: Let users enable/disable rule categories
5. **Continuous Updates**: Sync with LanguageTool releases

Want me to create the converter script now?
