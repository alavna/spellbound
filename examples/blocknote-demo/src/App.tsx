import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import type { Block, PartialBlock } from '@blocknote/core';
import '@blocknote/mantine/style.css';
import { SpellChecker, GrammarChecker } from '@spellbound/core';
import enUSDict from '@spellbound/dict-en-us';

// Common autocorrections (instant fixes as you type)
const AUTOCORRECTIONS: Record<string, string> = {
  teh: 'the',
  taht: 'that',
  adn: 'and',
  ahve: 'have',
  dont: "don't",
  doesnt: "doesn't",
  cant: "can't",
  wont: "won't",
  didnt: "didn't",
  couldnt: "couldn't",
  wouldnt: "wouldn't",
  shouldnt: "shouldn't",
  isnt: "isn't",
  wasnt: "wasn't",
  werent: "weren't",
  havent: "haven't",
  hasnt: "hasn't",
  hadnt: "hadn't",
  im: "I'm",
  ive: "I've",
  id: "I'd",
  ill: "I'll",
  youre: "you're",
  youve: "you've",
  youd: "you'd",
  youll: "you'll",
  theyre: "they're",
  theyve: "they've",
  theyd: "they'd",
  theyll: "they'll",
  were: "we're",
  weve: "we've",
  wed: "we'd",
  well: "we'll",
  hes: "he's",
  shes: "she's",
  its: "it's", // Note: context-dependent, but common fix
  thats: "that's",
  whats: "what's",
  whos: "who's",
  heres: "here's",
  theres: "there's",
  wheres: "where's",
  lets: "let's",
  recieve: 'receive',
  beleive: 'believe',
  wierd: 'weird',
  freind: 'friend',
  untill: 'until',
  occured: 'occurred',
  seperate: 'separate',
  definately: 'definitely',
  goverment: 'government',
  enviroment: 'environment',
  occurence: 'occurrence',
  accomodate: 'accommodate',
  neccessary: 'necessary',
  occassion: 'occasion',
  tommorrow: 'tomorrow',
  begining: 'beginning',
  calender: 'calendar',
  collegue: 'colleague',
  commited: 'committed',
  concious: 'conscious',
  dissapear: 'disappear',
  embarass: 'embarrass',
  existance: 'existence',
  fourty: 'forty',
  grammer: 'grammar',
  harrass: 'harass',
  independant: 'independent',
  knowlege: 'knowledge',
  maintenence: 'maintenance',
  millenium: 'millennium',
  neice: 'niece',
  noticable: 'noticeable',
  paralell: 'parallel',
  perseverence: 'perseverance',
  persistant: 'persistent',
  posession: 'possession',
  priviledge: 'privilege',
  recomend: 'recommend',
  refered: 'referred',
  relevent: 'relevant',
  rythm: 'rhythm',
  sucessful: 'successful',
  suprise: 'surprise',
  truely: 'truly',
  wether: 'whether',
};

// Test scenarios with realistic grammar and spelling mistakes
const TEST_SCENARIOS = [
  {
    id: 'business-email',
    title: 'Business Email',
    description: 'Common mistakes in professional communication',
    content: [
      {
        type: 'heading',
        props: { level: 2 },
        content: 'Quaterly Report Summary',
      },
      {
        type: 'paragraph',
        content:
          'Dear Team, I wanted to touch base about the upcomming quaterly review. Its importent that everyone is prepaired for the meeting on Wendsday. Their are several key points we need to adress.',
      },
      {
        type: 'paragraph',
        content:
          'The sales team has did a great job this quarter, but we could of done better in the marketing department. Alot of our campaigns didnt perform as well as we had hoped.',
      },
      {
        type: 'paragraph',
        content:
          "Please make sure your ready to discuss you're departments performance. We'll also be talking about weather we should procede with the new initative.",
      },
      {
        type: 'paragraph',
        content: 'Best regards,\nJohn',
      },
    ],
  },
  {
    id: 'academic-writing',
    title: 'Academic Writing',
    description: 'Typical errors in research papers',
    content: [
      {
        type: 'heading',
        props: { level: 2 },
        content: 'Research Metodology',
      },
      {
        type: 'paragraph',
        content:
          'This study aims to analize the effects of climate change on biodiversty. The resarch was conducted over a period of too years, involving over 500 participents from accross the country.',
      },
      {
        type: 'paragraph',
        content:
          'The data suggests that their is a strong corelation between rising tempatures and species migration patterns. However, its important to note that this correlation does not necessarly imply causation.',
      },
      {
        type: 'paragraph',
        content:
          'Further resarch is needed to definitly establish the causal relationship. The principle findings of this study is that climate change has a signifigant impact on local ecosystems.',
      },
    ],
  },
  {
    id: 'blog-post',
    title: 'Blog Post',
    description: 'Casual writing with common errors',
    content: [
      {
        type: 'heading',
        props: { level: 2 },
        content: '10 Tips for Better Productivty',
      },
      {
        type: 'paragraph',
        content:
          'Are you strugling to stay focussed during work? Your definately not alone! Alot of people find it hard to mantain there concentration throughout the day.',
      },
      {
        type: 'paragraph',
        content:
          "Heres some tips that might help: First, try to minimise distractions. Turn off you're phone and close unecessary browser tabs. Second, take regular breaks - your brain needs rest too!",
      },
      {
        type: 'paragraph',
        content:
          'Remeber, its not about working harder, its about working smarter. These tips has helped me tremendously, and I beleive they can help you to.',
      },
    ],
  },
  {
    id: 'confused-words',
    title: 'Commonly Confused Words',
    description: 'Their/there, affect/effect, etc.',
    content: [
      {
        type: 'heading',
        props: { level: 2 },
        content: 'Language Confusion',
      },
      {
        type: 'paragraph',
        content:
          "There going to the store to buy their groceries. They're car is parked over they're by the entrance.",
      },
      {
        type: 'paragraph',
        content:
          'The whether outside will effect our plans for the picnic. The affect of the storm was devasting to the local community.',
      },
      {
        type: 'paragraph',
        content:
          'Its important to except that your not always write. The principle reason for this is that we all make mistakes, irregardless of how careful we are.',
      },
      {
        type: 'paragraph',
        content:
          'I could care less about this issue, but I should of paid more attention. Supposably, this is a common problem that effects everyone.',
      },
    ],
  },
  {
    id: 'creative-writing',
    title: 'Creative Writing',
    description: 'Story with various errors',
    content: [
      {
        type: 'heading',
        props: { level: 2 },
        content: 'The Mysterous Island',
      },
      {
        type: 'paragraph',
        content:
          'The sun was setting over the horizion as Sarah approched the ancient ruins. She had traveled for many miles, but the journy was worth it. The sceenery was breathtaking.',
      },
      {
        type: 'paragraph',
        content:
          'She noticed somthing strange about the architechture. The buildings where built in a style she had never seen before. It was truely remarkable how well-presserved everything was.',
      },
      {
        type: 'paragraph',
        content:
          'As she explored futher, she discovered a hidden passage. Her excitment was palpible. What secrets would she uncover in this anciant place? She proceeded cautiously, aware that danger could be lurking anywhere.',
      },
    ],
  },
  {
    id: 'compound-words',
    title: 'Compound Word Errors',
    description: 'Backfire, nonetheless, etc.',
    content: [
      {
        type: 'heading',
        props: { level: 2 },
        content: 'Common Compound Errors',
      },
      {
        type: 'paragraph',
        content:
          'The plan might back fire if we are not careful. Never the less, we should proceed with the project. After all, we have put in alot of hard work all ready.',
      },
      {
        type: 'paragraph',
        content:
          "Its every one's responsibility to make sure everything runs smoothly. We need to work to gether as a team. Some times things dont go according to plan, but thats alright.",
      },
      {
        type: 'paragraph',
        content:
          'The break through came when we finally figured out the solution. It was a life time achievement. Mean while, the rest of the team continued there work on other projects.',
      },
    ],
  },
];

interface Issue {
  type: 'spelling' | 'grammar';
  word: string;
  message: string;
  suggestions: string[];
  offset: number;
  length: number;
  blockId?: string;
  blockOffset?: number;
}

interface FixStats {
  totalFixed: number;
  spellingFixed: number;
  grammarFixed: number;
  autocorrections: number;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [spellChecker, setSpellChecker] = useState<SpellChecker | null>(null);
  const [grammarChecker, setGrammarChecker] = useState<GrammarChecker | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [autocorrectEnabled, setAutocorrectEnabled] = useState(true);
  const [fixStats, setFixStats] = useState<FixStats>({
    totalFixed: 0,
    spellingFixed: 0,
    grammarFixed: 0,
    autocorrections: 0,
  });
  const [ignoredWords, setIgnoredWords] = useState<Set<string>>(new Set());
  const [addedToDictionary, setAddedToDictionary] = useState<Set<string>>(new Set());
  const lastTextRef = useRef<string>('');

  // Initialize the spell and grammar checkers
  useEffect(() => {
    async function init() {
      try {
        // Create spell checker with dictionary
        const spell = new SpellChecker({
          maxSuggestions: 5,
          maxEditDistance: 2,
        });

        // Load the English dictionary
        spell.loadDictionary(enUSDict);
        setSpellChecker(spell);

        // Create grammar checker
        const grammar = new GrammarChecker();
        setGrammarChecker(grammar);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize checkers:', error);
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Create BlockNote editor
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'heading',
        props: { level: 1 },
        content: 'Welcome to Spellbound Demo',
      },
      {
        type: 'paragraph',
        content:
          "Start typing below or select a test scenario from the sidebar to see Spellbound's spell and grammar checking in action!",
      },
      {
        type: 'paragraph',
        content:
          'Try typing something with misspellings like "teh" or "recieve", or grammar issues like "I has a cat".',
      },
    ] as PartialBlock[],
  });

  // Extract text from BlockNote blocks
  const extractText = useCallback((blocks: Block[]): string => {
    let text = '';
    for (const block of blocks) {
      if (block.content && Array.isArray(block.content)) {
        for (const inline of block.content) {
          if (typeof inline === 'object' && 'text' in inline) {
            text += inline.text;
          }
        }
      }
      text += '\n';
      if (block.children && block.children.length > 0) {
        text += extractText(block.children);
      }
    }
    return text;
  }, []);

  // Check text for issues
  const checkText = useCallback(
    async (text: string) => {
      if (!spellChecker || !grammarChecker || !text.trim()) {
        setIssues([]);
        return;
      }

      setIsChecking(true);

      try {
        const foundIssues: Issue[] = [];

        // Check spelling using .check() method
        const spellingResults = spellChecker.check(text);
        for (const result of spellingResults) {
          if (!result.isCorrect) {
            foundIssues.push({
              type: 'spelling',
              word: result.word,
              message: `"${result.word}" may be misspelled`,
              suggestions: result.suggestions.map((s) => s.word).slice(0, 5),
              offset: result.start,
              length: result.end - result.start,
            });
          }
        }

        // Check grammar
        const grammarResult = grammarChecker.check(text);
        for (const issue of grammarResult.issues) {
          foundIssues.push({
            type: 'grammar',
            word: issue.match,
            message: issue.message,
            suggestions: issue.replacements.slice(0, 5),
            offset: issue.start,
            length: issue.end - issue.start,
          });
        }

        // Sort by offset
        foundIssues.sort((a, b) => a.offset - b.offset);

        // Remove duplicates (same position)
        const uniqueIssues = foundIssues.filter(
          (issue, index, self) =>
            index === self.findIndex((i) => i.offset === issue.offset && i.length === issue.length)
        );

        setIssues(uniqueIssues);
      } catch (error) {
        console.error('Error checking text:', error);
      } finally {
        setIsChecking(false);
      }
    },
    [spellChecker, grammarChecker]
  );

  // Debounced check on editor change
  useEffect(() => {
    const handleChange = () => {
      const text = extractText(editor.document);
      setCurrentText(text);
    };

    // Subscribe to changes
    editor.onChange(handleChange);

    // Initial check
    handleChange();
  }, [editor, extractText]);

  // Debounce the check
  useEffect(() => {
    const timer = setTimeout(() => {
      checkText(currentText);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentText, checkText]);

  // Load a test scenario
  const loadScenario = useCallback(
    (scenarioId: string) => {
      const scenario = TEST_SCENARIOS.find((s) => s.id === scenarioId);
      if (!scenario) return;

      const blocks: PartialBlock[] = scenario.content.map((item) => {
        if (item.type === 'heading') {
          return {
            type: 'heading',
            props: { level: item.props?.level || 2 },
            content: item.content as string,
          };
        }
        return {
          type: 'paragraph',
          content: item.content as string,
        };
      });

      editor.replaceBlocks(editor.document, blocks);
      // Reset stats when loading new scenario
      setIgnoredWords(new Set());
    },
    [editor]
  );

  // Helper: Get block and position for a given text offset
  const getBlockAtOffset = useCallback(
    (offset: number): { block: Block; blockOffset: number } | null => {
      let currentOffset = 0;

      for (const block of editor.document) {
        let blockText = '';
        if (block.content && Array.isArray(block.content)) {
          for (const inline of block.content) {
            if (typeof inline === 'object' && 'text' in inline) {
              blockText += (inline as { text: string }).text;
            }
          }
        }

        const blockEnd = currentOffset + blockText.length;
        if (offset >= currentOffset && offset < blockEnd) {
          return { block, blockOffset: offset - currentOffset };
        }
        currentOffset = blockEnd + 1; // +1 for newline
      }
      return null;
    },
    [editor]
  );

  // Apply a fix to the document
  const applyFix = useCallback(
    (issue: Issue, replacement: string) => {
      // Find the block containing this issue
      const result = getBlockAtOffset(issue.offset);
      if (!result) return;

      const { block, blockOffset } = result;

      // Get the current block content as text
      let blockText = '';
      if (block.content && Array.isArray(block.content)) {
        for (const inline of block.content) {
          if (typeof inline === 'object' && 'text' in inline) {
            blockText += (inline as { text: string }).text;
          }
        }
      }

      // Replace the word in the text
      const before = blockText.slice(0, blockOffset);
      const after = blockText.slice(blockOffset + issue.length);
      const newText = before + replacement + after;

      // Update the block
      editor.updateBlock(block.id, {
        content: newText,
      });

      // Update stats
      setFixStats((prev) => ({
        ...prev,
        totalFixed: prev.totalFixed + 1,
        spellingFixed: issue.type === 'spelling' ? prev.spellingFixed + 1 : prev.spellingFixed,
        grammarFixed: issue.type === 'grammar' ? prev.grammarFixed + 1 : prev.grammarFixed,
      }));

      // Remove the issue from the list
      setIssues((prev) =>
        prev.filter((i) => i.offset !== issue.offset || i.length !== issue.length)
      );
    },
    [editor, getBlockAtOffset]
  );

  // Fix all issues of a certain type
  const fixAllIssues = useCallback(
    (type?: 'spelling' | 'grammar') => {
      const issuesToFix = type ? issues.filter((i) => i.type === type) : issues;

      // Fix in reverse order to preserve offsets
      const sortedIssues = [...issuesToFix].sort((a, b) => b.offset - a.offset);

      for (const issue of sortedIssues) {
        if (issue.suggestions.length > 0) {
          applyFix(issue, issue.suggestions[0]);
        }
      }
    },
    [issues, applyFix]
  );

  // Ignore a word (don't show as error this session)
  const ignoreWord = useCallback((word: string) => {
    setIgnoredWords((prev) => new Set([...prev, word.toLowerCase()]));
    setIssues((prev) => prev.filter((i) => i.word.toLowerCase() !== word.toLowerCase()));
  }, []);

  // Ignore all instances of a word
  const ignoreAll = useCallback(
    (word: string) => {
      ignoreWord(word);
    },
    [ignoreWord]
  );

  // Add word to dictionary
  const addToDictionary = useCallback(
    (word: string) => {
      if (spellChecker) {
        spellChecker.addToUserDictionary(word);
        setAddedToDictionary((prev) => new Set([...prev, word.toLowerCase()]));
        setIssues((prev) => prev.filter((i) => i.word.toLowerCase() !== word.toLowerCase()));
      }
    },
    [spellChecker]
  );

  // Highlight an issue in the editor (scroll to it and select the text)
  const highlightIssue = useCallback(
    (issue: Issue) => {
      const result = getBlockAtOffset(issue.offset);
      if (!result) return;

      const { block, blockOffset } = result;

      // Focus the editor and set cursor/selection on the issue text
      try {
        // Set text cursor at the block
        editor.setTextCursorPosition(block.id, 'start');

        // Use the DOM to find and highlight the text
        setTimeout(() => {
          // Find the block element in the DOM
          const blockElement = document.querySelector(`[data-id="${block.id}"]`);
          if (!blockElement) return;

          // Scroll the block into view
          blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Try to select the specific text using Selection API
          const textContent = blockElement.querySelector('.bn-inline-content');
          if (!textContent) return;

          // Walk through text nodes to find the right position
          const walker = document.createTreeWalker(textContent, NodeFilter.SHOW_TEXT, null);
          let currentOffset = 0;
          let startNode: Node | null = null;
          let startOffset = 0;
          let endNode: Node | null = null;
          let endOffset = 0;

          while (walker.nextNode()) {
            const node = walker.currentNode;
            const nodeLength = node.textContent?.length || 0;

            // Check if start is in this node
            if (!startNode && currentOffset + nodeLength > blockOffset) {
              startNode = node;
              startOffset = blockOffset - currentOffset;
            }

            // Check if end is in this node
            if (!endNode && currentOffset + nodeLength >= blockOffset + issue.length) {
              endNode = node;
              endOffset = blockOffset + issue.length - currentOffset;
              break;
            }

            currentOffset += nodeLength;
          }

          // Create selection
          if (startNode && endNode) {
            const selection = window.getSelection();
            if (selection) {
              const range = document.createRange();
              range.setStart(startNode, startOffset);
              range.setEnd(endNode, endOffset);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }, 100);
      } catch (error) {
        console.error('Error highlighting issue:', error);
      }
    },
    [editor, getBlockAtOffset]
  );

  // Autocorrect handler - check for autocorrections when text changes
  useEffect(() => {
    if (!autocorrectEnabled) return;

    const currentText = extractText(editor.document);
    const lastText = lastTextRef.current;

    // Only check if text was added (not deleted)
    if (currentText.length <= lastText.length) {
      lastTextRef.current = currentText;
      return;
    }

    // Find the newly typed word (after space or punctuation)
    const diff = currentText.slice(lastText.length);
    if (!/[\s.,!?;:]/.test(diff)) {
      lastTextRef.current = currentText;
      return;
    }

    // Find the last complete word before the space
    const beforeSpace = currentText.slice(0, currentText.length - 1);
    const wordMatch = beforeSpace.match(/(\w+)$/);
    if (!wordMatch) {
      lastTextRef.current = currentText;
      return;
    }

    const typedWord = wordMatch[1].toLowerCase();
    const correction = AUTOCORRECTIONS[typedWord];

    if (correction) {
      // Find the position of this word
      const wordStart = beforeSpace.lastIndexOf(wordMatch[1]);
      const result = getBlockAtOffset(wordStart);

      if (result) {
        const { block, blockOffset } = result;

        let blockText = '';
        if (block.content && Array.isArray(block.content)) {
          for (const inline of block.content) {
            if (typeof inline === 'object' && 'text' in inline) {
              blockText += (inline as { text: string }).text;
            }
          }
        }

        // Replace the word
        const before = blockText.slice(0, blockOffset);
        const after = blockText.slice(blockOffset + wordMatch[1].length);
        const newText = before + correction + after;

        editor.updateBlock(block.id, {
          content: newText,
        });

        setFixStats((prev) => ({
          ...prev,
          totalFixed: prev.totalFixed + 1,
          autocorrections: prev.autocorrections + 1,
        }));
      }
    }

    lastTextRef.current = currentText;
  }, [editor, extractText, autocorrectEnabled, getBlockAtOffset]);

  // Filter issues by ignored words
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => !ignoredWords.has(issue.word.toLowerCase()));
  }, [issues, ignoredWords]);

  // Calculate stats
  const spellingCount = useMemo(
    () => filteredIssues.filter((i) => i.type === 'spelling').length,
    [filteredIssues]
  );
  const grammarCount = useMemo(
    () => filteredIssues.filter((i) => i.type === 'grammar').length,
    [filteredIssues]
  );

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading Spellbound dictionaries...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>📝 Spellbound + BlockNote Demo</h1>
        <p>Privacy-first spell and grammar checking running entirely in your browser</p>
        {fixStats.totalFixed > 0 && (
          <div className="fix-stats">
            ✨ Fixed: {fixStats.totalFixed} total ({fixStats.spellingFixed} spelling,{' '}
            {fixStats.grammarFixed} grammar, {fixStats.autocorrections} autocorrected)
          </div>
        )}
      </header>

      <div className="main-content">
        <section className="editor-section">
          <div className="editor-header">
            <h2>Editor</h2>
            <div className="editor-stats">
              {isChecking ? (
                <div className="checking-indicator">
                  <div className="checking-dot"></div>
                  Checking...
                </div>
              ) : (
                <>
                  <span className={`stat ${spellingCount > 0 ? 'stat-error' : 'stat-ok'}`}>
                    🔤 {spellingCount} spelling {spellingCount === 1 ? 'issue' : 'issues'}
                  </span>
                  <span className={`stat ${grammarCount > 0 ? 'stat-warning' : 'stat-ok'}`}>
                    📝 {grammarCount} grammar {grammarCount === 1 ? 'issue' : 'issues'}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="editor-toolbar">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={autocorrectEnabled}
                onChange={(e) => setAutocorrectEnabled(e.target.checked)}
              />
              <span>Autocorrect</span>
            </label>
            <div className="toolbar-actions">
              {filteredIssues.length > 0 && (
                <>
                  <button
                    className="toolbar-btn fix-all"
                    onClick={() => fixAllIssues()}
                    title="Fix all issues using first suggestion"
                  >
                    Fix All ({filteredIssues.length})
                  </button>
                  {spellingCount > 0 && (
                    <button
                      className="toolbar-btn fix-spelling"
                      onClick={() => fixAllIssues('spelling')}
                      title="Fix all spelling issues"
                    >
                      Fix Spelling ({spellingCount})
                    </button>
                  )}
                  {grammarCount > 0 && (
                    <button
                      className="toolbar-btn fix-grammar"
                      onClick={() => fixAllIssues('grammar')}
                      title="Fix all grammar issues"
                    >
                      Fix Grammar ({grammarCount})
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="editor-container">
            <BlockNoteView editor={editor} theme="light" />
          </div>
        </section>

        <aside className="sidebar">
          <div className="panel">
            <div className="panel-header">
              <span>Issues ({filteredIssues.length})</span>
              {ignoredWords.size > 0 && (
                <span className="ignored-count">({ignoredWords.size} ignored)</span>
              )}
            </div>
            <div className="panel-content">
              {filteredIssues.length === 0 ? (
                <div className="no-issues">✅ No issues found</div>
              ) : (
                <ul className="issue-list">
                  {filteredIssues.slice(0, 20).map((issue, index) => (
                    <li
                      key={`${issue.offset}-${index}`}
                      className={`issue-item ${issue.type === 'grammar' ? 'grammar' : ''}`}
                      onClick={() => highlightIssue(issue)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="issue-word">
                        {issue.type === 'spelling' ? '🔤' : '📝'} &ldquo;{issue.word}&rdquo;
                      </div>
                      <div className="issue-message">{issue.message}</div>
                      {issue.suggestions.length > 0 && (
                        <div className="issue-suggestions">
                          {issue.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              className="suggestion-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                applyFix(issue, suggestion);
                              }}
                              title={`Replace "${issue.word}" with "${suggestion}"`}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="issue-actions">
                        <button
                          className="action-btn ignore"
                          onClick={(e) => {
                            e.stopPropagation();
                            ignoreAll(issue.word);
                          }}
                          title="Ignore this word for this session"
                        >
                          Ignore
                        </button>
                        {issue.type === 'spelling' && (
                          <button
                            className="action-btn add-dict"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToDictionary(issue.word);
                            }}
                            title="Add to personal dictionary"
                          >
                            Add to Dictionary
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                  {filteredIssues.length > 20 && (
                    <li className="issue-item">
                      <div className="issue-message">
                        And {filteredIssues.length - 20} more issues...
                      </div>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {addedToDictionary.size > 0 && (
            <div className="panel">
              <div className="panel-header">Personal Dictionary ({addedToDictionary.size})</div>
              <div className="panel-content">
                <div className="dictionary-words">
                  {[...addedToDictionary].map((word) => (
                    <span key={word} className="dict-word">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="panel scenarios-panel">
            <div className="panel-header">Test Scenarios</div>
            <div className="panel-content">
              {TEST_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  className="scenario-btn"
                  onClick={() => loadScenario(scenario.id)}
                >
                  <h4>{scenario.title}</h4>
                  <p>{scenario.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">Autocorrect Info</div>
            <div className="panel-content">
              <p className="info-text">
                {autocorrectEnabled ? '✅ Autocorrect is ON' : '❌ Autocorrect is OFF'}
              </p>
              <p className="info-text small">
                Try typing: <code>teh</code>, <code>recieve</code>, <code>definately</code>,{' '}
                <code>dont</code>
              </p>
              <p className="info-text small">Words are corrected after pressing space.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
