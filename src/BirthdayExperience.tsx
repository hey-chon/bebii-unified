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

function TreeIllustration({ revealed }: { revealed: boolean }) {
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
    <div className="wish-content">
      <p className="wish-overline">{birthdayContent.wish.overline}</p>
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

  const toggleCandle = (index: number) => {
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);
  };

  return (
    <section className="cartoony-section" aria-label="Birthday celebration decorations">
      <div className="bunting-flags">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`flag flag-${i % 3}`}></div>
        ))}
      </div>
      <div className="cartoony-content">
        <h2 className="cartoony-title">Let's Celebrate!</h2>
        <p className="cartoony-text">
          A touch of fun and whimsy for your special golden day. 
          Balloons, confetti, and everything bright to bring out your beautiful smile!
          Hover over the candles below to blow them out and make a wish!
        </p>
        
        <div className="interactive-cake">
          <div className="cake-tier top-tier">
            {candlesLit.map((lit, i) => (
              <div key={i} className={`candle ${lit ? 'lit' : ''}`} onMouseEnter={() => toggleCandle(i)}>
                {lit && <div className="flame"></div>}
              </div>
            ))}
          </div>
          <div className="cake-tier bottom-tier"></div>
        </div>

        <div className="cartoony-graphics">
           <div className="balloon red-balloon"></div>
           <div className="balloon yellow-balloon"></div>
           <div className="balloon blue-balloon"></div>
        </div>
      </div>
    </section>
  );
}

function FunGamesSection() {
  const [popped, setPopped] = useState<number[]>([]);

  const popBalloon = (id: number) => {
    if (!popped.includes(id)) {
      setPopped([...popped, id]);
    }
  };

  return (
    <section className="fun-games-section">
      <h2 className="cartoony-title">Pop the Balloons!</h2>
      <p className="cartoony-text">Click to pop them for a fun surprise!</p>
      
      <div className="pop-balloons-container">
        {[1, 2, 3, 4, 5].map(id => (
          <div 
            key={id} 
            className={`poppable-balloon ${popped.includes(id) ? 'popped' : ''}`}
            onClick={() => popBalloon(id)}
          >
            {popped.includes(id) ? '✨' : '🎈'}
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
        <div className="tree-copy">
          <p className="tree-kicker">{birthdayContent.tree.kicker}</p>
          <h2 className="tree-title">{birthdayContent.tree.title}</h2>
          <p className="tree-sub">{birthdayContent.tree.subtitle}</p>
        </div>
        <TreeIllustration revealed={treeRevealed} />
        <a className="scroll-cue" href="#memories">{birthdayContent.tree.scrollCue}</a>
      </section>
      <Memories />
      <LetterSection onOpenGift={() => setGiftOpen(true)} />
      <CartoonySection />
      <FunGamesSection />
    </>}
    {giftOpen && <GiftModal onClose={() => setGiftOpen(false)} />}
  </main>;
}

export default BirthdayExperience;
