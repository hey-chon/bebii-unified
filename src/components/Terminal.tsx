import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ASCII,
  COMMANDS,
  ART_COMMANDS,
  ART_HELP,
  countdown,
  runCommand,
} from '@/lib/shell';
import { packageLog } from '@/lib/packages';
import '@/terminal.css';

type Line = { text: string; className?: string };
type Job = { kind: string; timer: number } | null;

type Props = {
  onOpenBirthday: () => void;
};

export function Terminal({ onOpenBirthday }: Props) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draft, setDraft] = useState('');
  const [installed, setInstalled] = useState(false);
  const [artInstalled, setArtInstalled] = useState(false);
  const [label, setLabel] = useState('bebii@termux:~ $');
  const [busy, setBusy] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<Job>(null);

  const scroll = () => {
    requestAnimationFrame(() => {
      if (screenRef.current) screenRef.current.scrollTop = screenRef.current.scrollHeight;
    });
  };

  const append = useCallback((text: string, className = 'output') => {
    setLines((prev) => [...prev, { text, className }]);
    scroll();
  }, []);

  const clearScreen = () => {
    setLines([]);
  };

  const runPackageSteps = (kind: 'install' | 'install-art' | 'update') => {
    const steps = packageLog(kind);
    setBusy(true);
    let stage = 0;

    const advance = () => {
      const step = steps[stage];
      if (!step) {
        setBusy(false);
        jobRef.current = null;
        if (kind === 'install-art') {
          setArtInstalled(true);
          append(ART_HELP, 'output success');
        } else if (kind === 'install') {
          setInstalled(true);
          append(ASCII, 'ascii');
          append('open birthday', 'output muted');
          setLabel('bebii@birthday-os:~ $');
        }
        inputRef.current?.focus();
        return;
      }
      const cls =
        step.tone === 'progress'
          ? 'output package progress'
          : step.tone
            ? `output ${step.tone}`
            : 'output package';
      append(step.message, cls);
      stage++;
      const timer = window.setTimeout(advance, step.delay ?? 180);
      jobRef.current = { kind, timer };
    };
    advance();
  };

  const execute = (raw: string) => {
    if (busy) return;
    const command = raw.trim();
    if (!command) return;

    setHistory((h) => [...h, command]);
    setHistoryIndex(-1);
    setDraft('');
    setInput('');

    append(`${label} ${command}`, 'entry');

    const result = runCommand(command, {
      installed,
      artInstalled,
      history,
    });

    if (result.kind === 'clear') {
      clearScreen();
      return;
    }
    if (result.kind === 'reboot') {
      setInstalled(false);
      setArtInstalled(false);
      setLabel('bebii@termux:~ $');
      clearScreen();
      append('System rebooted. Installation state cleared, bebii.', 'output muted');
      return;
    }
    if (result.kind === 'install' || result.kind === 'install-art' || result.kind === 'update') {
      runPackageSteps(result.kind);
      return;
    }
    if (result.kind === 'open') {
      append((result.lines || []).join('\n'), `output ${result.tone || 'success'}`);
      window.setTimeout(() => onOpenBirthday(), 700);
      return;
    }
    if (result.kind === 'neofetch') {
      append(ASCII, 'ascii');
      append(
        [
          'bebii@birthday-os',
          '-----------------',
          'OS: BebiiOS 1.0.0 birthday-edition',
          'Host: browser-shell',
          'Shell: love',
          'Theme: pink-heart',
          'Birthday: October 17, 2026',
        ].join('\n'),
        'output cyan',
      );
      return;
    }
    if (result.kind === 'guide' || result.kind === 'help') {
      append(
        [
          'Available commands:',
          '  guide / help',
          '  pkg install birthday-os',
          '  pkg install ascii.art',
          '  pkg list | pkg update',
          '  open birthday',
          '  countdown | neofetch',
          '  cat letter.txt | ls',
          '  whoami | date | love',
          '  clear | reboot | history',
        ].join('\n'),
        'output',
      );
      return;
    }
    if (result.kind === 'countdown') {
      const t = countdown();
      append(
        t.complete
          ? 'Happy birthday, bebii! ♡'
          : `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s until your birthday, bebii.`,
        'output pink',
      );
      return;
    }
    if (result.kind === 'art' && result.art) {
      append(result.art, 'portrait');
      if (result.name) append(result.name, 'output muted');
      return;
    }
    if (result.lines?.length) {
      append(result.lines.join('\n'), `output ${result.tone || ''}`);
    }
  };

  const cancel = () => {
    if (jobRef.current) {
      clearTimeout(jobRef.current.timer);
      jobRef.current = null;
      setBusy(false);
      append('^C\nPackage operation cancelled, bebii.', 'output muted');
    } else if (input) {
      append(`${label} ${input}\n^C`, 'entry');
      setInput('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        cancel();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        if (!busy) clearScreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (busy) {
      e.preventDefault();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      if (historyIndex === -1) setDraft(input);
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput(draft);
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const pool = [...COMMANDS, ...(artInstalled ? ART_COMMANDS : [])];
      const matches = pool.filter((c) => c.startsWith(input));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1 && input) append(matches.join('    '), 'entry muted');
    }
  };

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <header className="brand">
        bebii<span>.os</span>
      </header>
      <div className="window">
        <div className="window-bar">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>bebii@termux: ~</span>
          <span aria-hidden="true">−</span>
        </div>
        <div className="screen" ref={screenRef} role="log" aria-live="polite">
          <div className="entry">
            <p>Welcome to Birthday OS, bebii.</p>
            <p className="muted">A little birthday surprise for October 17, 2026.</p>
            <p className="muted">
              Type <span className="pink">guide</span> below and press Enter to see the commands.
            </p>
          </div>
          {lines.map((line, i) => (
            <div key={i} className={`entry ${line.className || ''}`}>
              {line.text}
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              execute(input);
            }}
          >
            <label htmlFor="term-cmd">{label}</label>
            <input
              id="term-cmd"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={busy}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
