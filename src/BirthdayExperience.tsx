import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { birthdayContent } from './content';

type Phase = 'opening' | 'wish' | 'story';
type RevealOrigin = { x: number; y: number };

const treePhotoFrames = [
  { x: 185, y: 119, width: 56, height: 76, rotation: -7, tint: '#efd8cf' },
  { x: 375, y: 128, width: 56, height: 76, rotation: 8, tint: '#e8d5c3' },
  { x: 140, y: 220, width: 58, height: 78, rotation: -11, tint: '#e9cfc8' },
  { x: 443, y: 219, width: 58, height: 78, rotation: 10, tint: '#f0dbbf' },
  { x: 198, y: 316, width: 56, height: 76, rotation: -8, tint: '#e7d7bd' },
  { x: 356, y: 333, width: 56, height: 76, rotation: 9, tint: '#edd1c6' },
] as const;

const floatyPositions = [
  [8, 22, 16, 6], [17, 69, 12, 2], [29, 17, 18, 9], [47, 79, 13, 3],
  [74, 17, 14, 8], [90, 32, 17, 4], [84, 76, 12, 10], [59, 23, 8, 0],
] as const;

function HeartMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.8 8.8c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.4Z" fill="currentColor" /></svg>;
}

function Floaties() {
  return <div className="floaties" aria-hidden="true">{floatyPositions.map(([left, top, size, delay], index) => <span className="floaty" key={index} style={{ '--left': `${left}%`, '--top': `${top}%`, '--size': `${size}px`, '--delay': `${delay * -.3}s`, '--dur': `${5 + index % 3}s` } as React.CSSProperties}><HeartMark /></span>)}</div>;
}

type PhotoFrameProps = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  tint: string;
  src: string;
  alt: string;
  label: string;
  delay: number;
  portrait?: boolean;
};

function PhotoFrame({ id, x, y, width, height, rotation, tint, src, alt, label, delay, portrait = false }: PhotoFrameProps) {
  const photoX = x + 6;
  const photoY = y + 6;
  const photoWidth = width - 12;
  const photoHeight = height - 25;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const photoClipId = `${id}-clip`;

  return <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
    <g className="photo-frame" style={{ '--frame-delay': `${delay}s` } as React.CSSProperties}>
      <defs>
        <clipPath id={photoClipId}><rect x={photoX} y={photoY} width={photoWidth} height={photoHeight} rx="3" /></clipPath>
      </defs>
      <path className="photo-frame-hanger" d={`M${centerX - 5} ${y + 3} Q${centerX} ${y - 9} ${centerX + 5} ${y + 3}`} />
      <rect className="photo-frame-paper" x={x} y={y} width={width} height={height} rx="5" />
      {src ? <image href={src} x={photoX} y={photoY} width={photoWidth} height={photoHeight} clipPath={`url(#${photoClipId})`} preserveAspectRatio="xMidYMid slice" aria-label={alt} /> : <g clipPath={`url(#${photoClipId})`}>
        <rect x={photoX} y={photoY} width={photoWidth} height={photoHeight} fill={tint} />
        {portrait ? <>
          <circle cx={centerX} cy={photoY + photoHeight * .39} r={photoWidth * .34} fill="#f6e4d7" opacity=".78" />
          <circle cx={centerX} cy={photoY + photoHeight * .36} r={photoWidth * .14} fill="#bf827f" />
          <path d={`M${photoX + photoWidth * .17} ${photoY + photoHeight} Q${photoX + photoWidth * .2} ${photoY + photoHeight * .55} ${centerX} ${photoY + photoHeight * .57} Q${photoX + photoWidth * .8} ${photoY + photoHeight * .55} ${photoX + photoWidth * .83} ${photoY + photoHeight}Z`} fill="#a96e79" />
        </> : <>
          <circle cx={photoX + photoWidth * .73} cy={photoY + photoHeight * .27} r={photoWidth * .1} fill="#f3d59f" />
          <path d={`M${photoX} ${photoY + photoHeight * .76} Q${photoX + photoWidth * .25} ${photoY + photoHeight * .43} ${photoX + photoWidth * .48} ${photoY + photoHeight * .72} Q${photoX + photoWidth * .75} ${photoY + photoHeight * .35} ${photoX + photoWidth} ${photoY + photoHeight * .68} V${photoY + photoHeight} H${photoX}Z`} fill="#bd9f87" />
          <path d={`M${photoX} ${photoY + photoHeight * .84} Q${photoX + photoWidth * .32} ${photoY + photoHeight * .57} ${photoX + photoWidth * .56} ${photoY + photoHeight * .85} Q${photoX + photoWidth * .79} ${photoY + photoHeight * .59} ${photoX + photoWidth} ${photoY + photoHeight * .81} V${photoY + photoHeight} H${photoX}Z`} fill="#8eaa91" />
        </>}
      </g>}
      <rect className="photo-frame-window" x={photoX} y={photoY} width={photoWidth} height={photoHeight} rx="3" />
      <circle className="photo-frame-pin" cx={centerX} cy={y + 2} r="2.5" />
      <text className="photo-frame-caption" x={centerX} y={y + height - 6} textAnchor="middle">{label}</text>
    </g>
  </g>;
}

function TreeIllustration({ revealed, children }: { revealed: boolean; children?: React.ReactNode }) {
  return <div className={`tree-art picture-tree ${revealed ? 'is-revealed' : ''}`} role="img" aria-label={revealed ? birthdayContent.tree.bloomedLabel : birthdayContent.tree.unbloomedLabel}>
    <svg viewBox="0 0 600 650" aria-hidden="true">
      <defs>
        <filter id="photo-frame-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#714b48" floodOpacity=".19" />
        </filter>
      </defs>
      <path className="tree-trunk" d="M304 665 C300 555 304 483 296 404 C289 331 283 269 276 208 M300 420 C256 352 206 320 143 283 M286 354 C227 293 204 236 197 173 M299 397 C363 339 411 312 475 276 M291 318 C343 269 374 219 393 156 M279 250 C246 211 241 169 246 133 M298 459 C349 416 388 393 432 378" />
      <path className="tree-bough" d="M143 283 C124 265 111 248 105 226 M143 283 C124 290 105 291 87 285 M197 173 C182 153 178 134 181 116 M197 173 C211 154 218 138 218 119 M475 276 C493 259 509 238 514 217 M475 276 C498 280 515 279 534 270 M393 156 C388 135 390 115 399 96 M393 156 C410 141 425 133 443 129 M246 133 C238 117 237 101 242 85 M432 378 C451 365 468 355 487 350" />
      {treePhotoFrames.map((frame, index) => {
        const photo = birthdayContent.photos[index];
        return <PhotoFrame
          key={`memory-frame-${index}`}
          id={`memory-frame-${index}`}
          {...frame}
          src={photo?.src ?? ''}
          alt={photo?.caption ?? birthdayContent.tree.photoFramePlaceholder}
          label={photo?.src ? 'MEMORY' : 'ADD PHOTO'}
          delay={index * .1}
        />;
      })}
      <PhotoFrame
        id="girlfriend-portrait-frame"
        x={259}
        y={205}
        width={82}
        height={106}
        rotation={0}
        tint="#efd2c9"
        src={birthdayContent.treePortrait.src}
        alt={birthdayContent.treePortrait.alt}
        label={birthdayContent.treePortrait.src ? 'A FAVORITE MOMENT' : birthdayContent.tree.portraitPlaceholder}
        delay={.58}
        portrait
      />
    </svg>
    {children}
  </div>;
}

function Opening({ onRelease }: { onRelease: (origin: RevealOrigin) => void }) {
  const [pull, setPull] = useState(0);
  const [flying, setFlying] = useState(false);
  const [hit, setHit] = useState(false);
  const [flightVector, setFlightVector] = useState({ x: 0, y: 0 });
  const pointerDown = useRef(false);
  const launchStarted = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const bowSvgRef = useRef<SVGSVGElement>(null);
  const beganAt = useRef(0);

  const launch = () => {
    if (launchStarted.current) return;
    launchStarted.current = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let revealOrigin: RevealOrigin = { x: 50, y: 42 };
    const bowBounds = bowSvgRef.current?.getBoundingClientRect();
    const heartBounds = heartRef.current?.getBoundingClientRect();
    if (bowBounds && heartBounds && bowBounds.width > 0 && bowBounds.height > 0) {
      const arrowTip = {
        x: bowBounds.left + (203 / 280) * bowBounds.width,
        y: bowBounds.top + (95 / 190) * bowBounds.height,
      };
      const impactPoint = {
        x: heartBounds.left + heartBounds.width * .52,
        y: heartBounds.top + heartBounds.height * .5,
      };
      setFlightVector({ x: impactPoint.x - arrowTip.x, y: impactPoint.y - arrowTip.y });
      revealOrigin = {
        x: Math.max(0, Math.min(100, (impactPoint.x / window.innerWidth) * 100)),
        y: Math.max(0, Math.min(100, (impactPoint.y / window.innerHeight) * 100)),
      };
    }

    setFlying(true);
    setPull(0);
    window.setTimeout(() => setHit(true), reducedMotion ? 0 : 820);
    window.setTimeout(() => onRelease(revealOrigin), reducedMotion ? 80 : 2240);
  };

  const release = () => {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    if (pull > 20) {
      launch();
    } else {
      setPull(0);
    }
  };

  const beginPull = (event: React.PointerEvent<SVGCircleElement>) => {
    if (flying) return;
    event.preventDefault();
    pointerDown.current = true;
    beganAt.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const movePull = (event: React.PointerEvent<SVGCircleElement>) => {
    if (!pointerDown.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setPull(Math.max(0, Math.min(90, beganAt.current - event.clientX + (event.clientY - rect.top) * .08)));
  };

  const keyboardRelease = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setPull(60);
      launch();
    }
  };

  const travel = flying ? `translate(${flightVector.x}px, ${flightVector.y}px)` : `translate(${pull}px, 0)`;

  return <section className={`opening ${flying ? 'is-flying' : ''}`} aria-label={birthdayContent.opening.ariaLabel}>
    <Floaties />
    <div className="opening-content" ref={stageRef}>
      <div className="hero-typography">
        <h1 className="hero-title">{birthdayContent.opening.title}</h1>
        <p className="hero-subtitle">{birthdayContent.opening.subtitle}</p>
      </div>
      
      <div className="opening-interactive">
        <div className="bow-stage">
          <svg className="bow-svg" ref={bowSvgRef} viewBox="0 0 280 190" role="img" aria-label={birthdayContent.opening.bowLabel}>
            <path className="bow-wood" d="M54 17 C113 38 113 151 54 173" />
            <path className="bow-string" d={`M54 17 L${80 - pull * .65} 95 L54 173`} />
            <g style={{ transform: travel, transition: flying ? 'transform .82s cubic-bezier(.12,.8,.18,1)' : 'transform .12s ease-out' }}>
              <line className="arrow-trail" x1="16" y1="95" x2="190" y2="95" />
              <line className="arrow-shaft" x1="72" y1="95" x2="192" y2="95" />
              <path className="arrow-tip" d="M203 95 L187 88 L190 95 L187 102 Z" />
              <path className="arrow-feather" d="M79 95 L67 87 M80 95 L66 95 M79 95 L67 103" />
            </g>
            <circle className="drag-handle" cx={80 - pull * .65} cy="95" r="13" fill="transparent" aria-label={birthdayContent.opening.dragLabel} onPointerDown={beginPull} onPointerMove={movePull} onPointerUp={release} onPointerCancel={release} />
          </svg>
        </div>

        <div className={`hero-heart-wrap ${hit ? 'heart-hit' : ''}`} ref={heartRef} aria-hidden="true">
          <span className="heart-aura" />
          <div className="hero-heart">
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <defs>
                <radialGradient id="heartGrad" cx="35%" cy="28%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="38%" stopColor="#fff7b0" />
                  <stop offset="72%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#e6ac00" />
                </radialGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartGrad)" />
            </svg>
            <span className="heart-glint" />
          </div>
          {hit && <>
            <span className="heart-shockwave shockwave-one" />
            <span className="heart-shockwave shockwave-two" />
            <span className="impact-flash" />
            <span className="heart-burst">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--angle': `${index * 15}deg`, '--distance': `${92 + (index % 5) * 15}px`, '--tone': ['#ffffff','#ffeb3b','#ffd700','#fff3e0'][index % 4], '--wait': `${(index % 4) * .035}s` } as React.CSSProperties}>{index % 4 === 0 ? <b>✦</b> : <HeartMark />}</i>)}</span>
          </>}
        </div>
      </div>
    </div>
  </section>;
}

function WishInterlude({ onAutoAdvance, revealOrigin }: { onAutoAdvance: () => void; revealOrigin: RevealOrigin }) {
  useEffect(() => {
    const timeout = window.setTimeout(onAutoAdvance, 3800);
    return () => window.clearTimeout(timeout);
  }, [onAutoAdvance]);
  return <section className="wish-interlude" aria-label={birthdayContent.wish.ariaLabel} style={{ '--reveal-x': `${revealOrigin.x}%`, '--reveal-y': `${revealOrigin.y}%` } as React.CSSProperties}>
    <Floaties />
    {/* Sparkle particles matching golden atmosphere */}
    <div className="wish-sparkles" aria-hidden="true">
      {Array.from({ length: 30 }, (_, i) => (
        <span key={`wsp-${i}`} className="wish-sparkle-dot" style={{
          '--wsd-left': `${3 + (i * 19) % 94}%`,
          '--wsd-top': `${5 + (i * 27) % 88}%`,
          '--wsd-delay': `${(i * 0.29) % 4}s`,
          '--wsd-dur': `${2 + (i % 5) * 0.6}s`,
          '--wsd-size': `${2 + (i % 3)}px`
        } as React.CSSProperties} />
      ))}
    </div>
    <div className="wish-content">
      <h1 className="wish-title">{birthdayContent.wish.title}</h1>
      <div className="gold-rule" />
      <p className="wish-subtitle">{birthdayContent.wish.subtitle}</p>
    </div>
  </section>;
}

function GiftModal({ onClose }: { onClose: () => void }) {
  const [claimed, setClaimed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', keydown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', keydown);
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    };
  }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="gift-modal" role="dialog" aria-modal="true" aria-labelledby="gift-heading">
      {[0,1,2,3,4,5,6,7,8,9,10,11].map((item) => <i key={item} className="sparkle" style={{ '--x': `${8 + (item * 37) % 84}%`, '--y': `${5 + (item * 29) % 82}%`, '--delay': `${item * -.14}s` } as React.CSSProperties} />)}
       <button className="modal-close" ref={closeRef} aria-label={birthdayContent.giftCloseLabel} onClick={onClose}>×</button>
      <div className="gift-art" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M7 21h34v21H7zM4 15h40v8H4zM24 15v27M24 15c-12 0-13-11-6-11 5 0 6 11 6 11Zm0 0c12 0 13-11 6-11-5 0-6 11-6 11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></div>
      <h2 id="gift-heading">{birthdayContent.giftTitle}</h2>
      <p className="gift-message">{birthdayContent.giftMessage}</p>
      <span className="birthday-badge">{birthdayContent.giftBadge}</span>
       {claimed ? <p className="claim-note" role="status">{birthdayContent.giftClaimed}</p> : <button className="claim-button" onClick={() => setClaimed(true)}>{birthdayContent.claimWishesLabel}</button>}
    </div>
  </div>;
}

function CartoonySection() {
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

  /* SVG bunting flags matching screenshot reference */
  const buntingFlags = [
    { t: 0.062, left: '#ee4d47', right: '#d7352f' }, // Red
    { t: 0.188, left: '#f58733', right: '#dc6e1a' }, // Orange
    { t: 0.316, left: '#f8c832', right: '#e3b11e' }, // Yellow
    { t: 0.444, left: '#32be69', right: '#23a355' }, // Green
    { t: 0.572, left: '#17bea7', right: '#0da38e' }, // Teal
    { t: 0.700, left: '#459cf4', right: '#2e83de' }, // Blue
    { t: 0.828, left: '#9762c9', right: '#7e49b0' }, // Purple
    { t: 0.952, left: '#ed4d8e', right: '#d53476' }, // Pink
  ];

  return (
    <section className="cartoony-section" aria-label="Birthday celebration decorations">
      {/* SVG Bunting - curved rope with 3D pennant flags matching reference */}
      <svg className="bunting-svg" viewBox="0 0 1000 190" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="bunting-shadow" x="-30%" y="-10%" width="160%" height="180%">
            <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* 8 Bunting flags with 3D paper fold */}
        {buntingFlags.map((flag, i) => {
          const t = flag.t;
          // Quadratic bezier: P0=(-20, 28), P1=(500, 185), P2=(1020, 18)
          const x = (1 - t) * (1 - t) * (-20) + 2 * (1 - t) * t * 500 + t * t * 1020;
          const y = (1 - t) * (1 - t) * 28 + 2 * (1 - t) * t * 185 + t * t * 18;
          const dx = 2 * (1 - t) * (500 - (-20)) + 2 * t * (1020 - 500);
          const dy = 2 * (1 - t) * (185 - 28) + 2 * t * (18 - 185);
          const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

          return (
            <g
              key={i}
              className="bunting-flag-g"
              transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${angleDeg.toFixed(1)})`}
              filter="url(#bunting-shadow)"
            >
              {/* Left facet (lighter) */}
              <polygon points="-29,0 0,0 0,72" fill={flag.left} />
              {/* Right facet (shaded) */}
              <polygon points="0,0 29,0 0,72" fill={flag.right} />
            </g>
          );
        })}

        {/* Hanging rope across top of flags */}
        <path
          d="M -20 28 Q 500 185 1020 18"
          fill="none"
          stroke="#bfa37c"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      <div className="cartoony-content">
        {/* SVG decorative stars floating around */}
        <svg className="deco-stars" viewBox="0 0 600 80" aria-hidden="true">
          {[
            {x:50,y:30,r:8,c:'#f1c40f'},{x:140,y:55,r:5,c:'#e74c3c'},{x:260,y:20,r:6,c:'#3498db'},
            {x:350,y:60,r:7,c:'#2ecc71'},{x:460,y:25,r:5,c:'#9b59b6'},{x:550,y:50,r:8,c:'#e67e22'},
          ].map((s, i) => (
            <g key={i} className="deco-star-g" style={{ animationDelay: `${i * 0.4}s` }}>
              <path d={`M${s.x} ${s.y - s.r} L${s.x + s.r * 0.36} ${s.y - s.r * 0.36} L${s.x + s.r} ${s.y - s.r * 0.12} L${s.x + s.r * 0.5} ${s.y + s.r * 0.32} L${s.x + s.r * 0.6} ${s.y + s.r} L${s.x} ${s.y + s.r * 0.56} L${s.x - s.r * 0.6} ${s.y + s.r} L${s.x - s.r * 0.5} ${s.y + s.r * 0.32} L${s.x - s.r} ${s.y - s.r * 0.12} L${s.x - s.r * 0.36} ${s.y - s.r * 0.36}Z`} fill={s.c} />
            </g>
          ))}
        </svg>

        <h2 className="cartoony-title">Let's Celebrate!</h2>
        <p className="cartoony-text">
          Hover over the candles to blow them out and make a wish!
        </p>

        {/* SVG Birthday Cake */}
        <div className="svg-cake-wrap">
          <svg viewBox="0 0 300 280" className="svg-cake" aria-label="Birthday cake">
            {/* Plate */}
            <ellipse cx="150" cy="255" rx="140" ry="18" fill="#d4af37" opacity="0.3" />
            <ellipse cx="150" cy="250" rx="130" ry="15" fill="#e8d48b" />

            {/* Bottom tier */}
            <rect x="40" y="190" width="220" height="60" rx="12" fill="#ffe082" />
            <rect x="40" y="190" width="220" height="15" rx="8" fill="#fff3c4" />
            {[60, 90, 120, 150, 180, 210, 240].map((dx, i) => (
              <ellipse key={`bd${i}`} cx={dx} cy={195} rx={8} ry={12 + (i % 3) * 4} fill="#fff" opacity="0.85" />
            ))}
            {[65, 95, 125, 155, 185, 215, 240].map((dx, i) => (
              <circle key={`dot${i}`} cx={dx} cy={225} r="4" fill={['#ff7675','#74b9ff','#a29bfe','#55efc4','#ffeaa7','#fd79a8','#fdcb6e'][i]} />
            ))}

            {/* Top tier */}
            <rect x="75" y="130" width="150" height="65" rx="10" fill="#ffecb3" />
            <rect x="75" y="130" width="150" height="12" rx="6" fill="#fff8e1" />
            {[95, 120, 150, 180, 205].map((dx, i) => (
              <ellipse key={`td${i}`} cx={dx} cy={136} rx={7} ry={10 + (i % 2) * 5} fill="#fff" opacity="0.9" />
            ))}
            {[90, 110, 130, 160, 180, 200].map((dx, i) => (
              <rect key={`sp${i}`} x={dx} y={155 + (i % 3) * 8} width="3" height="8" rx="1.5" fill={['#ff7675x','#74b9ff','#a29bfe','#55efc4','#ffeaa7','#fd79a8'][i]} transform={`rotate(${-30 + i * 20} ${dx} ${155 + (i % 3) * 8})`} />
            ))}

            {/* Candles */}
            {candlesLit.map((lit, i) => {
              const cx = 120 + i * 30;
              return <g key={`candle-${i}`} className="svg-candle" onMouseEnter={() => toggleCandle(i)} style={{ cursor: 'pointer' }}>
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

        {/* Floating golden hearts */}
        <div className="cartoony-floaty-hearts" aria-hidden="true">
          {[
            {left:5,top:18,size:22,delay:0,dur:6},{left:12,top:72,size:16,delay:1.2,dur:5},
            {left:25,top:35,size:20,delay:2.4,dur:7},{left:42,top:80,size:14,delay:0.6,dur:5.5},
            {left:58,top:15,size:24,delay:1.8,dur:6.5},{left:72,top:65,size:18,delay:3.0,dur:5},
            {left:85,top:28,size:15,delay:0.9,dur:7},{left:93,top:55,size:20,delay:2.1,dur:6},
            {left:35,top:50,size:12,delay:3.6,dur:5.5},{left:78,top:42,size:17,delay:1.5,dur:6},
            {left:50,top:10,size:19,delay:0.3,dur:7.5},{left:18,top:58,size:13,delay:2.7,dur:5},
          ].map((h, i) => (
            <span key={`cfh-${i}`} className="cartoony-float-heart" style={{
              '--cfh-left': `${h.left}%`, '--cfh-top': `${h.top}%`,
              '--cfh-size': `${h.size}px`, '--cfh-delay': `${-h.delay}s`,
              '--cfh-dur': `${h.dur}s`
            } as React.CSSProperties}>
              <HeartMark />
            </span>
          ))}
        </div>

        {/* Sparkle particles */}
        <div className="cartoony-sparkles" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={`csp-${i}`} className="cartoony-sparkle-dot" style={{
              '--csd-left': `${5 + (i * 23) % 90}%`,
              '--csd-top': `${8 + (i * 31) % 80}%`,
              '--csd-delay': `${(i * 0.37) % 4}s`,
              '--csd-dur': `${2.5 + (i % 4) * 0.5}s`
            } as React.CSSProperties} />
          ))}
        </div>

        <button className="confetti-btn" onClick={triggerConfetti}>
          Pop Confetti!
        </button>

        {confettiBatches.map(id => (
          <div key={id} className="confetti-overlay">
            {[...Array(60)].map((_, i) => (
              <div key={i} className={`confetti-piece piece-${i % 6}`} style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.6}s`,
                animationDuration: `${2.2 + Math.random() * 2}s`,
              }}></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}


function Memories() {
  return <section className="memories" id="memories">
    <Floaties />
    <header className="section-heading">
      <p className="eyebrow">{birthdayContent.memoriesEyebrow}</p>
      <h2>{birthdayContent.memoriesTitle}</h2>
    </header>
    <div className="memory-grid">
      {birthdayContent.photos.map((photo, index) => <figure className="memory-card" key={`${photo.caption}-${index}`}>
        <div className="photo-slot">
          {photo.src ? <img src={photo.src} alt={photo.caption} loading="lazy" /> : <div className="photo-placeholder">
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="25" height="21" rx="2" stroke="currentColor" /><circle cx="11" cy="12" r="2.2" stroke="currentColor" /><path d="m5 24 7-7 4 4 4-5 7 8" stroke="currentColor" strokeLinejoin="round" /></svg>
            <span>{birthdayContent.photoPlaceholder}</span>
          </div>}
        </div>
        <figcaption className="photo-caption">{photo.caption}</figcaption>
      </figure>)}
    </div>
  </section>;
}

function LetterSection({ onOpenGift }: { onOpenGift: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  const toggleLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      const tl = gsap.timeline();
      tl.to(flapRef.current, { rotationX: 180, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'top center' }, 0)
        .set(flapRef.current, { zIndex: 1 }, 0.3)
        .to(paperRef.current, { y: '-60%', duration: 0.7, ease: 'power2.out' }, 0.4)
        .set(paperRef.current, { zIndex: 10 })
        .to(paperRef.current, { y: '5%', scale: 1.05, duration: 0.6, ease: 'power3.out' });
    } else {
      const tl = gsap.timeline({ onComplete: () => setIsOpen(false) });
      tl.to(paperRef.current, { y: '-60%', scale: 1, duration: 0.6, ease: 'power2.inOut' }, 0)
        .set(paperRef.current, { zIndex: 2 })
        .to(paperRef.current, { y: '0%', duration: 0.7, ease: 'power2.in' }, 0.6)
        .set(flapRef.current, { zIndex: 4 }, 1.0)
        .to(flapRef.current, { rotationX: 0, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'top center' }, 1.0);
    }
  };

  return (
    <section className="letter-section" id="letter">
      <Floaties />
      
      <div className="envelope-scene" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '180px' }}>
        <div className="envelope-wrapper" ref={envelopeRef} onClick={toggleLetter}>
          <div className="envelope-back"></div>
          <div className="envelope-paper-wrap" ref={paperRef}>
            <article className={`beautiful-letter ${isOpen ? 'is-expanded' : ''}`}>
              {isOpen && <button className="envelope-close-btn" aria-label="Close letter" onClick={(e) => { e.stopPropagation(); toggleLetter(); }}>&times;</button>}
              <p className="letter-label">{birthdayContent.messageLabel}</p>
              <h2 className="letter-title">{birthdayContent.messageTitle}</h2>
              <p className="letter-copy">{birthdayContent.message}</p>
              <p className="letter-signature">{birthdayContent.signature}</p>
            </article>
          </div>
          <div className="envelope-front"></div>
          <div className="envelope-flap" ref={flapRef}>
             <div className="envelope-flap-seal">♥</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '80px', opacity: isOpen ? 1 : 0, transition: 'opacity 1s, transform 1s', transform: isOpen ? 'translateY(0)' : 'translateY(20px)', pointerEvents: isOpen ? 'auto' : 'none' }}>
        <button className="gift-button" onClick={onOpenGift}>{birthdayContent.sendGiftLabel}</button>
      </div>
      <p className="page-footer">{birthdayContent.pageFooter}</p>
    </section>
  );
}

function BirthdayExperience() {
  const [phase, setPhase] = useState<Phase>('opening');
  const [treeRevealed, setTreeRevealed] = useState(false);
  const [revealOrigin, setRevealOrigin] = useState<RevealOrigin>({ x: 50, y: 42 });
  const [giftOpen, setGiftOpen] = useState(false);
  const treeRef = useRef<HTMLElement>(null);
  const advanceToStory = () => setPhase('story');
  const openWish = (origin: RevealOrigin) => {
    setRevealOrigin(origin);
    setPhase('wish');
  };

  useEffect(() => {
    if (phase !== 'story' || !treeRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTreeRevealed(true);
        observer.disconnect();
      }
    }, { threshold: .25 });
    observer.observe(treeRef.current);
    return () => observer.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase === 'story') window.setTimeout(() => treeRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, [phase]);

  return <main>
    {phase === 'opening' && <Opening onRelease={openWish} />}
    {phase === 'wish' && <WishInterlude onAutoAdvance={advanceToStory} revealOrigin={revealOrigin} />}
    {phase === 'story' && <>
      <section className="tree-section" ref={treeRef} aria-label="Birthday wishes and photo memories">
        {/* Elegant ambient background layer */}
        <div className="tree-bg-ornaments" aria-hidden="true">
          <svg className="tree-bg-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <radialGradient id="haloGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff8dd" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fdf0be" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fff8da" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="haloGlow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#fef3c7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#fffdf5" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5c05c" stopOpacity="0" />
                <stop offset="50%" stopColor="#d4af37" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#c59b27" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Luminous orbital rings behind Section 1 */}
            <circle cx="500" cy="240" r="280" fill="url(#haloGlow1)" />
            <circle cx="500" cy="240" r="230" fill="none" stroke="url(#goldLineGrad)" strokeWidth="1.2" strokeDasharray="4 8" />
            <circle cx="500" cy="240" r="310" fill="none" stroke="url(#goldLineGrad)" strokeWidth="0.8" strokeDasharray="8 14" />
            <circle cx="500" cy="240" r="390" fill="none" stroke="url(#goldLineGrad)" strokeWidth="0.6" />
            {/* Sunburst aura behind Tree Section 2 */}
            <circle cx="500" cy="740" r="340" fill="url(#haloGlow2)" />
            <circle cx="500" cy="740" r="300" fill="none" stroke="url(#goldLineGrad)" strokeWidth="1" strokeDasharray="6 10" />
            <circle cx="500" cy="740" r="420" fill="none" stroke="url(#goldLineGrad)" strokeWidth="0.7" strokeDasharray="3 9" />
            {/* Delicate gold-leaf celestial sparks */}
            <path d="M500 40 L503 54 L517 57 L503 60 L500 74 L497 60 L483 57 L497 54 Z" fill="#d4af37" opacity="0.35" />
            <path d="M140 220 L142 230 L152 232 L142 234 L140 244 L138 234 L128 232 L138 230 Z" fill="#d4af37" opacity="0.28" />
            <path d="M860 220 L862 230 L872 232 L862 234 L860 244 L858 234 L848 232 L858 230 Z" fill="#d4af37" opacity="0.28" />
            <path d="M120 760 L122 770 L132 772 L122 774 L120 784 L118 774 L108 772 L118 770 Z" fill="#d4af37" opacity="0.25" />
            <path d="M880 760 L882 770 L892 772 L882 774 L880 784 L878 774 L868 772 L878 770 Z" fill="#d4af37" opacity="0.25" />
          </svg>
          <div className="bg-golden-orb bg-orb-1"></div>
          <div className="bg-golden-orb bg-orb-2"></div>
        </div>
        <div className="tree-copy">
          <p className="tree-kicker">{birthdayContent.tree.kicker}</p>
          <h2 className="tree-title">
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <svg 
                className="title-crown-svg"
                style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '-16px',
                  width: '32px',
                  height: '32px',
                  transform: 'rotate(-18deg)',
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 4px 8px rgba(180,140,50,0.35))'
                }}
                viewBox="0 0 64 64"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="tiaraGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff8dd" />
                    <stop offset="40%" stopColor="#dfb746" />
                    <stop offset="75%" stopColor="#b88b22" />
                    <stop offset="100%" stopColor="#e5c567" />
                  </linearGradient>
                </defs>
                <path d="M10 48 Q32 52 54 48" fill="none" stroke="url(#tiaraGold)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 44 Q32 47 52 44" fill="none" stroke="url(#tiaraGold)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M12 44 L16 26 L26 38 L32 16 L38 38 L48 26 L52 44 Z" fill="rgba(245, 215, 125, 0.22)" stroke="url(#tiaraGold)" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="32" cy="15" r="3.2" fill="#ffffff" stroke="url(#tiaraGold)" strokeWidth="1.5" />
                <circle cx="32" cy="15" r="1.4" fill="url(#tiaraGold)" />
                <circle cx="16" cy="25" r="2.2" fill="#ffffff" stroke="url(#tiaraGold)" strokeWidth="1.2" />
                <circle cx="48" cy="25" r="2.2" fill="#ffffff" stroke="url(#tiaraGold)" strokeWidth="1.2" />
                <circle cx="26" cy="38" r="1.5" fill="url(#tiaraGold)" />
                <circle cx="38" cy="38" r="1.5" fill="url(#tiaraGold)" />
              </svg>
              Happy
              <span className="title-celestial title-celestial-left" aria-hidden="true">✦</span>
            </span><br />
            Birthday<br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span className="title-celestial title-celestial-right" aria-hidden="true">✧</span>
              Bebii!
              <svg 
                className="title-hat-svg"
                style={{ 
                  position: 'absolute', 
                  top: '-34px', 
                  right: '-20px', 
                  width: '44px', 
                  height: '50px', 
                  transform: 'rotate(20deg)',
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 4px 10px rgba(180,140,50,0.3))'
                }} 
                viewBox="0 0 64 72" 
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="coneGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff8dd" />
                    <stop offset="35%" stopColor="#dfb746" />
                    <stop offset="70%" stopColor="#b0831a" />
                    <stop offset="100%" stopColor="#e8c75d" />
                  </linearGradient>
                  <linearGradient id="foilPinstripe" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#dfb746" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <path d="M32 14 L54 62 Q32 67 10 62 Z" fill="rgba(255, 246, 218, 0.45)" stroke="url(#coneGold)" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M32 15 L20 62" stroke="url(#foilPinstripe)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M32 15 L28 64" stroke="url(#foilPinstripe)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M32 15 L36 64" stroke="url(#foilPinstripe)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M32 15 L44 62" stroke="url(#foilPinstripe)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M10 62 Q32 68 54 62" fill="none" stroke="url(#coneGold)" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M12 60 Q32 65 52 60" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
                <path d="M32 6 L33.6 11.4 L39 13 L33.6 14.6 L32 20 L30.4 14.6 L25 13 L30.4 11.4 Z" fill="url(#coneGold)" />
                <circle cx="32" cy="13" r="1.5" fill="#ffffff" />
              </svg>
            </span>
          </h2>
          <p className="tree-sub tree-sub-desktop">{birthdayContent.tree.subtitle}</p>
        </div>
        <TreeIllustration revealed={treeRevealed}>
          <p className="tree-sub-mobile">{birthdayContent.tree.subtitle}</p>
        </TreeIllustration>
        <a className="scroll-cue" href="#memories">{birthdayContent.tree.scrollCue}</a>
      </section>
      <Memories />
      <LetterSection onOpenGift={() => setGiftOpen(true)} />
      <CartoonySection />
    </>}
    {giftOpen && <GiftModal onClose={() => setGiftOpen(false)} />}
  </main>;
}

export default BirthdayExperience;
