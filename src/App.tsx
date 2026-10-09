import { useState } from 'react';
import { Terminal } from '@/components/Terminal';
import BirthdayExperience from './BirthdayExperience';

type Mode = 'terminal' | 'birthday';

export default function App() {
  const [mode, setMode] = useState<Mode>('terminal');

  if (mode === 'birthday') {
    return <BirthdayExperience />;
  }

  return <Terminal onOpenBirthday={() => setMode('birthday')} />;
}
