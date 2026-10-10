const fs = require('fs');
let code = fs.readFileSync('src/BirthdayExperience.tsx', 'utf8');

const startMarker = 'function CartoonySection() {';
const endPattern = /\n\}\n\nfunction Memories/;

const startIdx = code.indexOf(startMarker);
const match = code.substring(startIdx).match(endPattern);
const endIdx = startIdx + match.index + 2;

const newSection = `function CartoonySection() {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [confettiBatches, setConfettiBatches] = useState<number[]>([]);
  const [allBlown, setAllBlown] = useState(false);
  const batchId = useRef(0);

  const toggleCandle = (index: number) => {
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);
    if (newCandles.every(c => !c)) setAllBlown(true);
  };

  const triggerConfetti = () => {
    const id = batchId.current++;
    setConfettiBatches(prev => [...prev, id]);
    setTimeout(() => {
      setConfettiBatches(prev => prev.filter(b => b !== id));
    }, 4000);
  };

  const flagColors = ['#e74c3c','#e67e22','#f1c40f','#27ae60','#1abc9c','#3498db','#8e44ad','#e84393','#f39c12'];
  const flagPoints = flagColors.map((color, i) => {
    const t = (i + 1) / (flagColors.length + 1);
    const x = t * 1000;
    const sag = 55 * Math.sin(t * Math.PI);
    const y = 12 + sag;
    return { x, y, color };
  });

  return (
    <section className="cartoony-section" aria-label="Birthday celebration decorations">
      <svg className="bunting-svg" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M-5 12 C150 10, 300 65, 500 67 C700 69, 850 20, 1005 18"
          fill="none"
          stroke="#a08050"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {flagPoints.map((fp, i) => {
          const flagH = 48;
          const flagW = 32;
          return (
            <g key={i} className="bunting-flag-hang" style={{ '--flag-delay': \`\${i * 0.18}s\` } as React.CSSProperties}>
              <line x1={fp.x} y1={fp.y} x2={fp.x} y2={fp.y + 4} stroke="#a08050" strokeWidth="1.5" />
              <polygon
                points={\`\${fp.x - flagW / 2},\${fp.y + 4} \${fp.x + flagW / 2},\${fp.y + 4} \${fp.x},\${fp.y + 4 + flagH}\`}
                fill={fp.color}
              />
              <polygon
                points={\`\${fp.x - flagW / 2},\${fp.y + 4} \${fp.x - flagW / 2 + 6},\${fp.y + 4} \${fp.x + 2},\${fp.y + 4 + flagH - 6} \${fp.x},\${fp.y + 4 + flagH}\`}
                fill="#fff"
                opacity="0.15"
              />
            </g>
          );
        })}
      </svg>

      <div className="cartoony-content">
        <h2 className="cartoony-title">Let's Celebrate!</h2>
        <p className="cartoony-text">
          Hover over the candles to blow them out and make a wish!
        </p>

        <div className="svg-cake-wrap">
          <svg viewBox="0 0 300 280" className="svg-cake" aria-label="Birthday cake">
            <ellipse cx="150" cy="255" rx="140" ry="18" fill="#d4af37" opacity="0.3" />
            <ellipse cx="150" cy="250" rx="130" ry="15" fill="#e8d48b" />
            <rect x="40" y="190" width="220" height="60" rx="12" fill="#ffe082" />
            <rect x="40" y="190" width="220" height="15" rx="8" fill="#fff3c4" />
            {[60, 90, 120, 150, 180, 210, 240].map((dx, i) => (
              <ellipse key={\`bd\${i}\`} cx={dx} cy={195} rx={8} ry={12 + (i % 3) * 4} fill="#fff" opacity="0.85" />
            ))}
            {[65, 95, 125, 155, 185, 215, 240].map((dx, i) => (
              <circle key={\`dot\${i}\`} cx={dx} cy={225} r="4" fill={['#ff7675','#74b9ff','#a29bfe','#55efc4','#ffeaa7','#fd79a8','#fdcb6e'][i]} />
            ))}
            <rect x="75" y="130" width="150" height="65" rx="10" fill="#ffecb3" />
            <rect x="75" y="130" width="150" height="12" rx="6" fill="#fff8e1" />
            {[95, 120, 150, 180, 205].map((dx, i) => (
              <ellipse key={\`td\${i}\`} cx={dx} cy={136} rx={7} ry={10 + (i % 2) * 5} fill="#fff" opacity="0.9" />
            ))}
            {[90, 110, 130, 160, 180, 200].map((dx, i) => (
              <rect key={\`sp\${i}\`} x={dx} y={155 + (i % 3) * 8} width="3" height="8" rx="1.5" fill={['#ff7675','#74b9ff','#a29bfe','#55efc4','#ffeaa7','#fd79a8'][i]} transform={\`rotate(\${-30 + i * 20} \${dx} \${155 + (i % 3) * 8})\`} />
            ))}
            {candlesLit.map((lit, i) => {
              const cx = 120 + i * 30;
              return <g key={\`candle-\${i}\`} className="svg-candle" onMouseEnter={() => toggleCandle(i)} style={{ cursor: 'pointer' }}>
                <rect x={cx - 4} y={100} width={8} height={32} rx={3} fill={['#ff7675','#74b9ff','#ffeaa7'][i]} />
                <rect x={cx - 4} y={100} width={8} height={5} rx={2} fill="#fff" opacity="0.5" />
                {lit && <>
                  <ellipse cx={cx} cy={94} rx={5} ry={9} fill="#ff9f43" className="candle-flame">
                    <animate attributeName="ry" values="9;7;9" dur="0.4s" repeatCount="indefinite" />
                    <animate attributeName="rx" values="5;4;5" dur="0.5s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx={cx} cy={91} rx={2.5} ry={5} fill="#feca57">
                    <animate attributeName="ry" values="5;3.5;5" dur="0.3s" repeatCount="indefinite" />
                  </ellipse>
                  <circle cx={cx} cy={88} r="2" fill="#fff8e1" opacity="0.8">
                    <animate attributeName="r" values="2;1.5;2" dur="0.35s" repeatCount="indefinite" />
                  </circle>
                </>}
              </g>;
            })}
            <text x="150" y="175" textAnchor="middle" fill="#d4af37" fontSize="22" fontFamily="'Playfair Display', serif" fontWeight="700">17</text>
          </svg>
          {allBlown && <p className="wish-made">Your wish has been made!</p>}
        </div>

        <button className="confetti-btn" onClick={triggerConfetti}>
          Pop Confetti!
        </button>

        {confettiBatches.map(id => (
          <div key={id} className="confetti-overlay">
            {[...Array(60)].map((_, i) => (
              <div key={i} className={\`confetti-piece piece-\${i % 6}\`} style={{
                left: \`\${Math.random() * 100}%\`,
                animationDelay: \`\${Math.random() * 0.6}s\`,
                animationDuration: \`\${2.2 + Math.random() * 2}s\`,
              }}></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}`;

code = code.substring(0, startIdx) + newSection + code.substring(endIdx);
fs.writeFileSync('src/BirthdayExperience.tsx', code);
console.log('Done - replaced CartoonySection');
