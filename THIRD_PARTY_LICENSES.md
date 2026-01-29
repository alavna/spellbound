# Third-Party Licenses

This document lists the licenses of third-party components used in Spellbound.

## Dictionary Data

### SCOWL (Spell Checker Oriented Word Lists)

**Used in:** `@spellbound/dict-en-us`

**License:** SCOWL License (permissive)

```
Copyright (c) 2000-2019 Kevin Atkinson

Permission to use, copy, modify, distribute and sell these word lists, the
associated scripts, the output created from the scripts, and its documentation
for any purpose is hereby granted without fee, provided that the above
copyright notice appears in all copies and that both that copyright notice
and this permission notice appear in supporting documentation. Kevin Atkinson
makes no representations about the suitability of this array for any purpose.
It is provided "as is" without express or implied warranty.
```

**Source:** http://wordlist.aspell.net/

---

## Grammar Rules

### LanguageTool

**Used in:** `@spellbound/core` (imported grammar rules)

**License:** LGPL-2.1-or-later

```
LanguageTool - A Rule-Based Style and Grammar Checker
Copyright (C) 2005-2024 Daniel Naber, Marcin Miłkowski, and the
LanguageTool contributors

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
```

**Source:** https://github.com/languagetool-org/languagetool

**Note:** The grammar rules derived from LanguageTool have been converted from
XML to TypeScript format. The converted rules are available in the source code
of this repository under `packages/core/src/rules/imported/`.

---

## LGPL-2.1 Compliance Notice

Spellbound includes grammar rules derived from LanguageTool, which is licensed
under LGPL-2.1. To comply with LGPL-2.1:

1. **Source Availability:** The source code for all derived rules is available
   in this repository under `packages/core/src/rules/imported/`.

2. **Original Source:** You can obtain the original LanguageTool source code
   from https://github.com/languagetool-org/languagetool

3. **Modifications:** The rules have been converted from LanguageTool's XML
   format to TypeScript. The conversion scripts are available in the `scripts/`
   directory.

4. **Linking:** Spellbound uses these rules as a library component. The rest of
   Spellbound is licensed under MIT, which is compatible with LGPL-2.1.

5. **No Warranty:** The derived rules are provided "as is" without warranty.

If you distribute Spellbound or a derivative work, you must:
- Include this notice
- Make the source code of the LGPL-licensed components available
- Allow users to obtain the original LanguageTool source

---

## Summary Table

| Component | License | Source |
|-----------|---------|--------|
| Spellbound Core | MIT | This repository |
| Spellbound React | MIT | This repository |
| Dictionary Data (SCOWL) | SCOWL License | http://wordlist.aspell.net/ |
| Grammar Rules (LanguageTool) | LGPL-2.1 | https://github.com/languagetool-org/languagetool |
