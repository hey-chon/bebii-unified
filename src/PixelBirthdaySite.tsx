    // @ts-nocheck
/* eslint-disable */
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  EDIT THIS BLOCK: names, dates, and all the personal copy           */
/* ------------------------------------------------------------------ */
const CONFIG = {
  name: "My Bebii",
  from: "Your handsome bebii",
  birthday: new Date(2026, 9, 17, 0, 0, 0),
  dateLabel: "October 17, 2026",
  nickname: "Bebii", // used in the adventure game greetings
};

// Set `photo` to an image URL to replace the pixel icon with a real picture.
const MEMORIES = [
  { title: "Flip", date: "- Jimson", icon: "coffee", bg: "#FFC4D6", rot: 0, photo: null,
    note: "Don't forget to eat poo sa tamang oras bebii koo, wag poo magpapalipas ng gutom."},
  { title: "Flip", date: "- Jimson", icon: "flower", bg: "#FFB4CB", rot: 0, photo: null,
    note: "I want you to know how enough you are for me bebii koo, you're wonderful and amazing as always." },
  { title: "Flip", date: "- Jimson", icon: "camera", bg: "#FFD0DE", rot: 0, photo: null,
    note: "I want you to know how pretty, gorgeous, beautiful and cutiee you are bebii koo." },
  { title: "Flip", date: "- Jimson", icon: "moon", bg: "#FFBCD2", rot: 0, photo: null,
    note: "I want you to know that you're the only one I've been thinking before I sleep and when I wake up." },
];

const REASONS = [
  "Your laugh is one of my favorite sounds bebii with matching kurot grrrr.",
  "Your presence makes my day complete bebii koo.",
  "You make my life better bebii koo, thankyousomuch for everything.",
  "I want you to know poo na ikaw lang ang gusto kong mayakap sa pag gising at pag tulog.",
  "You believe in me na kaya koo poo bebii koo always and in all ways.",
  "You make home feel like a person, not a place and it was all you.",
  "You believe in me on the days I forget how bebii koo, and I'm very thankful to have you poo bebii.",
  "Your smile fixes a bad day faster than anything else hehe.",
  "I want you to know poo na you're the best part of every plan we make.",
];

const GIFTS = [
  { text: "Flower bouquet poo hehe, kahit nabigay koo napo sayo nung nag moa us hehe :>", icon: "star", c: "#B9A6FF", r: "#FFF0F4" },
  { text: "A Birthday Surprise website you can visit anytime bebii koo hehe, I made this for you poo :>", icon: "star", c: "#8FD9B6", r: "#FFF0F4" },
  { text: "Siyempre ang napaka pogi mo poo na bebii habii pa-birthday gift koo rin poo sayo ay akooooo :>", icon: "star", c: "#FFC15E", r: "#FFF0F4" },
];

const TRACKS = [
  { title: "Slow Dance in the Kitchen", note: "For socks on the floor and nowhere to be.", c: "#7FD0F5" },
  { title: "Rainy Window", note: "For tea, blankets, and a quiet afternoon.", c: "#8FD9B6" },
  { title: "Golden Hour", note: "For the drive home with the windows down.", c: "#FFC15E" },
  { title: "Midnight Snack", note: "For the best conversations of the week.", c: "#C9B6FF" },
];

const LETTER = `Happy Birthday, ${CONFIG.name}.

I wanted to make you something that feels the way you feel to me: warm, a little silly, and impossible to rush through. So here is a tiny cozy corner of the internet where every tap is a small present.

Thank you for the quiet nights, the loud laughs, and every ordinary day you turned into a favorite one. I hope this next year is soft with you and full of everything you deserve.

Blow out the candle, make your wish, and know I will be right here helping it come true.

Always yours,
${CONFIG.from}`;

const PAIRS = [
  { k: "cookie", icon: "cookie" }, { k: "moon", icon: "moon" }, { k: "star", icon: "star" },
  { k: "coffee", icon: "coffee" }, { k: "cat", icon: "cat" }, { k: "flower", icon: "flower" },
];

/* ------------------------------------------------------------------ */
/*  Pixel icons (X = current text color). Replaces all vector icons.   */
/* ------------------------------------------------------------------ */
const ICONS = {
  heart: [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."],
  star: ["...X...", "..XXX..", "XXXXXXX", ".XXXXX.", "..XXX..", ".XX.XX.", ".X...X."],
  camera: ["..XXX....", "XXXXXXXXX", "X..XXX..X", "X.X...X.X", "X.X...X.X", "X..XXX..X", "XXXXXXXXX"],
  gift: [".XX..XX.", "X..XX..X", "XXXXXXXX", "X..XX..X", "X..XX..X", "X..XX..X", "XXXXXXXX"],
  music: ["...XXXXX", "...X...X", "...X...X", ".XXX.XXX", "XXXX.XXX", ".XX..XX."],
  sparkles: ["...X...", "...X...", "..XXX..", "XXXXXXX", "..XXX..", "...X...", "...X..."],
  mail: ["XXXXXXXXX", "XX.....XX", "X.X...X.X", "X..X.X..X", "X...X...X", "XXXXXXXXX"],
  flame: ["..X..", ".XXX.", ".XXX.", "XXXXX", "XXXXX", ".XXX."],
  send: ["...X...", "..XXX..", ".XXXXX.", "...X...", "...X...", "...X..."],
  play: ["XX....", "XXXX..", "XXXXXX", "XXXX..", "XX...."],
  pause: ["XX..XX", "XX..XX", "XX..XX", "XX..XX", "XX..XX", "XX..XX"],
  ticket: ["XXXXXXXXX", "X...X...X", "X...X...X", "X...X...X", "XXXXXXXXX"],
  sun: ["...X...", ".X.X.X.", "..XXX..", "XXXXXXX", "..XXX..", ".X.X.X.", "...X..."],
  coffee: [".X.X.....", "XXXXXXXX.", "XXXXXXXXX", "XXXXXXX.X", "XXXXXXXXX", ".XXXXXX..", "..XXXX..."],
  cat: ["XX.....XX", "XXX...XXX", "XXXXXXXXX", "XX.XXX.XX", "XXXXXXXXX", ".XXXXXXX.", "..XXXXX.."],
  flower: ["..XX.XX..", ".XXXXXXX.", "..XX.XX..", ".XXXXXXX.", "..XX.XX..", "....X....", "....X...."],
  cookie: ["..XXXX..", ".XXXXXX.", "XXX.XXXX", "XXXXXX.X", "XX.XXXXX", "XXXXX.XX", ".XXXXXX.", "..XXXX.."],
  moon: ["..XXXX..", ".XXX....", "XXX.....", "XXX.....", "XXX.....", ".XXX....", "..XXXX.."],
  chain: ["XXXX.....", "X..X.....", "X..XXXX..", "XXXXX..X.", "....X..X.", "....XXXX."],
  up: ["...X...", "..XXX..", ".XXXXX.", "XXXXXXX", "..XXX..", "..XXX..", "..XXX.."],
  left: ["...X...", "..XX...", ".XXXXXX", "XXXXXXX", ".XXXXXX", "..XX...", "...X..."],
  right: ["...X...", "...XX..", "XXXXXX.", "XXXXXXX", "XXXXXX.", "...XX..", "...X..."],
};

/* ------------------------------------------------------------------ */
/*  Styles: everything is square, stepped, and baby pink               */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Press+Start+2P&family=VT323&display=swap');
:root{--ink:#4B3770;--line:#7D5C94;--pink:#FFD6E2;--pink-lt:#FFE9F0;--pink-dk:#FFC4D6;--pink-dp:#FFB4CB;--rose:#B03A6A;--shd:#E8A3BC;--blush:#FF8FAB;--lamp:#FFC15E;--mint:#8FD9B6;--lilac:#C9B6FF;--gut:clamp(16px,5vw,32px)}
.bd,.bd *{box-sizing:border-box;border-radius:0}
.bd{font-family:'Pixelify Sans',ui-monospace,monospace;color:var(--ink);background:var(--pink);overflow-x:hidden;min-height:100vh;line-height:1.5;font-size:clamp(17px,.4vw + 15.5px,19px);-webkit-text-size-adjust:100%}
.bd button{font-family:inherit;-webkit-tap-highlight-color:transparent}
.hand{font-family:'VT323','Pixelify Sans',monospace;font-weight:400}
.bd button:focus-visible,.bd input:focus-visible{outline:4px solid #E0457B;outline-offset:3px}
.px{display:block;image-rendering:pixelated}
.ico{display:inline-block;flex:none;vertical-align:middle}
.sticker{background:var(--pink-lt);border:4px solid var(--line);box-shadow:6px 6px 0 var(--shd)}

.btn{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;text-align:center;min-height:50px;gap:12px;padding:12px 20px;font-size:18px;font-weight:600;line-height:1.15;border:4px solid var(--line);background:var(--pink-lt);color:var(--ink);box-shadow:5px 5px 0 var(--line)}
.btn:active{transform:translate(5px,5px);box-shadow:0 0 0 var(--line)}
.btn.mint,.btn.pink{background:var(--pink-dk)}

/* hero (background kept exactly as before) */
.hero{position:relative;min-height:100vh;min-height:100svh;padding:clamp(88px,14vw,108px) var(--gut) 0;background:radial-gradient(ellipse at 50% 22%,rgba(255,255,255,.72) 0%,rgba(255,255,255,0) 56%),linear-gradient(180deg,#FFE9F0 0%,#FFD6E2 48%,#FFC4D6 100%);text-align:center;overflow:hidden;display:flex;flex-direction:column;align-items:center;color:var(--ink)}
.star{position:absolute;width:var(--s);height:var(--s);background:#FFFFFF;clip-path:polygon(33% 0,66% 0,66% 33%,100% 33%,100% 66%,66% 66%,66% 100%,33% 100%,33% 66%,0 66%,0 33%,33% 33%);animation:twinkle 3.4s steps(2) infinite;animation-delay:var(--d)}
@keyframes twinkle{0%,100%{opacity:.25}50%{opacity:1}}
.moon{position:absolute;top:clamp(88px,10vw,112px);right:clamp(10px,4vw,64px);width:clamp(44px,9vw,104px);height:auto;animation:float 7s steps(8) infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.lights{position:absolute;top:0;left:0;width:100%;height:96px;pointer-events:none}
.bulb{animation:glow 2.6s steps(3) infinite;animation-delay:var(--d)}
@keyframes glow{0%,100%{opacity:.55}50%{opacity:1}}
.h1{position:relative;z-index:2;font-family:'Press Start 2P',monospace;font-weight:400;letter-spacing:0;font-size:clamp(22px,7.2vw,30px);line-height:1.6;margin:0;color:var(--ink);text-wrap:balance;text-shadow:.08em .08em 0 #FFFFFF,.16em .16em 0 var(--shd)}
@media(min-width:561px){.h1{font-size:clamp(30px,5.2vw,56px)}}
.word{display:inline-block;white-space:nowrap;margin:0 .3em}
.ch{display:inline-block;animation:drop .8s steps(6) both,wave 3.4s steps(4) infinite;animation-delay:var(--d),calc(var(--d) + 1.6s)}
@keyframes wave{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes drop{from{transform:translateY(-70px);opacity:0}to{transform:none;opacity:1}}
.dateline{font-size:clamp(28px,3.8vw,36px);margin:18px 0 0;color:var(--rose)}
.cd{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,2.6vw,22px);width:min(100%,560px);padding:4px 10px 14px 4px;margin:18px 0 0}
@media(max-width:359px){.cd{grid-template-columns:repeat(2,minmax(0,1fr));width:min(100%,260px)}}
.tile{min-width:0;margin:0;padding:clamp(10px,2vw,16px) 4px clamp(8px,1.6vw,12px);background:var(--pink-lt);border:0;color:var(--ink);box-shadow:0 -4px 0 0 var(--line),0 4px 0 0 var(--line),-4px 0 0 0 var(--line),4px 0 0 0 var(--line),8px 12px 0 0 var(--shd)}
.tile b{display:block;font-family:'Press Start 2P',monospace;font-size:clamp(18px,5vw,30px);line-height:1.3;font-weight:400}
.tile span{font-size:clamp(12px,3.3vw,17px);font-weight:600;color:var(--rose)}
.cdnote{margin:6px 0 0;font-size:20px;color:#7A3556}
.blowrow{margin:clamp(16px,3vw,28px) 0 0;min-height:112px;display:flex;flex-direction:column;align-items:center;gap:12px}
.blowmsg{margin:0;font-size:28px;color:var(--rose);animation:pop .5s steps(5) both}
@keyframes pop{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}
.scene{position:relative;width:min(clamp(300px,56vw,560px),100%);margin-top:auto;cursor:pointer}
.scene svg{display:block;width:100%;height:auto;overflow:visible}
.tabletop{width:calc(100% + 2*var(--gut));margin:-1px calc(-1*var(--gut)) 0;height:clamp(48px,8vw,64px);background:repeating-linear-gradient(0deg,rgba(255,255,255,.3) 0 16px,transparent 16px 32px),repeating-linear-gradient(90deg,rgba(255,255,255,.3) 0 16px,transparent 16px 32px),#FFA9C3;border-top:4px solid var(--line)}
.flame{animation:flick .7s linear infinite}
@keyframes flick{0%,49%{transform:translate(0,0)}50%,100%{transform:translate(1px,0)}}
.pulse{animation:pulse 1.6s steps(2) infinite}
@keyframes pulse{0%,100%{opacity:.18}50%{opacity:.34}}
.puff{animation:puff 2.4s steps(6) forwards;opacity:0}
.puff.b{animation-delay:.3s}.puff.c{animation-delay:.6s}
@keyframes puff{0%{opacity:.9;transform:translateY(0)}100%{opacity:0;transform:translateY(-12px)}}
.steamp{animation:steam 2.6s steps(4) infinite}
.steamp.b{animation-delay:.9s}
@keyframes steam{0%{opacity:0;transform:translateY(2px)}50%{opacity:.95}100%{opacity:0;transform:translateY(-3px)}}
.sway{animation:swaytick 3s linear infinite}
@keyframes swaytick{0%,49%{transform:translate(0,0)}50%,100%{transform:translate(1px,0)}}

/* pixel art */
.titleblock{position:relative;z-index:2;display:inline-block;margin-top:6px}
.spk{position:absolute;animation:pxblink 1.6s steps(1) infinite}
.spk.s2{animation-delay:.4s}.spk.s3{animation-delay:.8s}.spk.s4{animation-delay:1.1s}
@keyframes pxblink{0%{opacity:1}50%{opacity:0}}
.pxcloud{position:absolute;left:0;z-index:0;animation:drift linear infinite;animation-timing-function:steps(260)}
@keyframes drift{from{transform:translateX(-340px)}to{transform:translateX(calc(100vw + 40px))}}
.pxheart{position:absolute;bottom:70px;z-index:1;opacity:0;animation:pxrise var(--t) steps(48) infinite;animation-delay:var(--d)}
@keyframes pxrise{0%{opacity:0;transform:translateY(0)}8%{opacity:.95}85%{opacity:.95}100%{opacity:0;transform:translateY(-78vh)}}
.pxballoon{position:absolute;bottom:-160px;z-index:1;animation:balloonup var(--t) steps(100) infinite;animation-delay:var(--d)}
@keyframes balloonup{from{transform:translateY(0)}to{transform:translateY(-118vh)}}
.pxballoon .px{animation:bsway 3.2s steps(6) infinite alternate}
@keyframes bsway{from{transform:translateX(-10px)}to{transform:translateX(10px)}}
.pxcat{position:absolute;right:7%;bottom:30px;z-index:3;width:80px;height:70px}
.pxcat .px{position:absolute;left:0;top:0}
.pxcat .f1{animation:frameA .9s steps(1) infinite}
.pxcat .f2{animation:frameB .9s steps(1) infinite}
@keyframes frameA{0%{opacity:1}50%{opacity:0}}
@keyframes frameB{0%{opacity:0}50%{opacity:1}}
.pxcat .cathrt{left:26px;top:-26px;opacity:0;animation:catheart 4s steps(8) infinite}
@keyframes catheart{0%,55%{opacity:0;transform:translateY(0)}60%{opacity:1;transform:translateY(-4px)}90%{opacity:1;transform:translateY(-20px)}100%{opacity:0;transform:translateY(-24px)}}
@media(max-width:640px){.pxcat{display:none}}
.hero .dateline,.hero .cd,.hero .cdnote,.hero .blowrow{position:relative;z-index:2}

/* sections: all baby pink, separated by a stepped edge */
.sec{--secy:clamp(84px,12vw,130px);position:relative;padding:var(--secy) 0 calc(var(--secy) - 28px);overflow:hidden;background:var(--pink)}
.divider{position:absolute;top:0;left:0;width:100%;height:24px;pointer-events:none;background:linear-gradient(90deg,var(--pink-dk) 50%,transparent 50%) 0 0/48px 12px repeat-x,linear-gradient(90deg,transparent 50%,var(--pink-dk) 50%) 0 12px/48px 12px repeat-x}
.wrap{position:relative;z-index:2;max-width:1060px;margin:0 auto;padding-left:max(var(--gut),env(safe-area-inset-left,0px));padding-right:max(var(--gut),env(safe-area-inset-right,0px))}
.sechead{text-align:center;margin-bottom:clamp(32px,6vw,56px)}
.badge{display:grid;place-items:center;width:clamp(60px,14vw,72px);height:clamp(60px,14vw,72px);margin:0 auto clamp(14px,3vw,20px);background:var(--pink-dk);border:4px solid var(--line);box-shadow:5px 5px 0 var(--line);color:var(--ink)}
.sec h2{font-family:'Press Start 2P',monospace;font-weight:400;font-size:clamp(17px,2.4vw + 9px,32px);line-height:1.55;margin:0;text-wrap:balance;overflow-wrap:break-word;text-shadow:.1em .1em 0 #FFFFFF}
.sub{font-size:clamp(24px,3vw,30px);margin:clamp(12px,2.4vw,18px) auto 0;max-width:min(100%,26em);line-height:1.15;text-wrap:balance}
.decor{position:absolute;z-index:1;pointer-events:none;animation:float 6s steps(6) infinite;animation-delay:var(--d);filter:drop-shadow(4px 4px 0 var(--line))}
@media(max-width:1239px){.decor{display:none}}

/* wishes */
.sky{position:relative;height:clamp(290px,64vw,360px);border:4px solid var(--line);overflow:hidden;background:var(--pink-dk);box-shadow:6px 6px 0 var(--shd)}
.sky .empty{position:absolute;inset:0;display:grid;place-items:center;font-size:28px;color:var(--rose);padding:20px;text-align:center;line-height:1.1}
.lantern{position:absolute;bottom:-130px;width:100px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;animation:rise 5s steps(25) forwards,bob 4s steps(4) 5s infinite}
@keyframes rise{to{bottom:var(--h)}}
@keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}
.lbody{width:56px;height:68px;border:4px solid var(--line);background:var(--c);position:relative;box-shadow:4px 4px 0 var(--line)}
.lbody::before{content:"";position:absolute;left:50%;top:6px;bottom:6px;width:20px;transform:translateX(-50%);border-left:4px solid rgba(75,55,112,.45);border-right:4px solid rgba(75,55,112,.45)}
.ltag{margin-top:10px;font-size:22px;line-height:1;color:var(--ink);text-align:center;max-width:120px}
.wishbar{display:flex;gap:16px;margin-top:clamp(24px,4vw,34px);flex-wrap:wrap;justify-content:center}
@media(max-width:560px){.wishbar{flex-direction:column;align-items:stretch}.wishbar input{max-width:none;flex:none}}
.wishbar input{flex:1 1 260px;max-width:460px;min-height:54px;font:500 19px 'Pixelify Sans',monospace;padding:12px 18px;border:4px solid var(--line);background:var(--pink-lt);color:var(--ink);box-shadow:5px 5px 0 var(--line)}
.wishbar input::placeholder{color:#B07A95}

/* memories */
.polas{display:grid;grid-template-columns:1fr;gap:clamp(32px,6vw,44px) 30px;max-width:1020px;margin:0 auto}
@media(min-width:540px){.polas{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1100px){.polas{grid-template-columns:repeat(4,1fr)}}
.polaroid{perspective:900px;width:min(100%,264px);aspect-ratio:246/318;justify-self:center;padding:0;border:0;background:none;cursor:pointer}
.pflip{position:relative;display:block;width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s steps(6)}
.flipped .pflip{transform:rotateY(180deg)}
.pface{position:absolute;inset:0;display:flex;flex-direction:column;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:var(--pink-lt);border:4px solid var(--line);box-shadow:6px 6px 0 var(--shd);padding:14px}
.pface.back{transform:rotateY(180deg);justify-content:center;align-items:center;text-align:center;gap:14px}
.photo{position:relative;flex:1;display:grid;place-items:center;border:4px solid var(--line);overflow:hidden;color:var(--ink)}
.photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;image-rendering:pixelated}
.photo .dot{position:absolute;border:4px solid var(--line);opacity:.35}
.cap{margin-top:12px;font-size:26px;line-height:1;color:var(--ink);text-align:center;font-family:'VT323',monospace}
.pface.back p{margin:0;font-size:27px;line-height:1.1;color:var(--ink)}
.pface.back small{font-size:17px;font-weight:500;color:var(--rose)}

/* jar */
.jarlayout{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,48px);align-items:center;max-width:860px;margin:0 auto}
@media(max-width:760px){.jarlayout{grid-template-columns:1fr}}
.jarcol{display:flex;flex-direction:column;align-items:center;gap:22px}
.jarwrap svg{width:clamp(220px,64vw,300px);height:auto;display:block}
.wiggle{animation:wiggle .6s steps(4)}
@keyframes wiggle{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}60%{transform:translateX(6px)}}
.notecard{position:relative;min-height:190px;padding:36px clamp(18px,4vw,28px) 26px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;animation:unfold .6s steps(6) both;transform-origin:top center}
@keyframes unfold{from{transform:scaleY(.2);opacity:0}to{transform:none;opacity:1}}
.notecard p{margin:0;font-size:clamp(26px,5vw,32px);line-height:1.05;color:var(--ink)}
.notecard.idle{border-style:dashed;box-shadow:none;background:rgba(255,233,240,.6);animation:none}
.tape{position:absolute;top:-16px;left:50%;width:84px;height:28px;transform:translateX(-50%);background:var(--pink-dp);border:4px solid var(--line)}
.count{font-size:18px;font-weight:500}

/* gifts */
.gifts{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(28px,4vw,44px);max-width:920px;margin:0 auto}
@media(max-width:879px){.gifts{grid-template-columns:1fr;max-width:420px}}
.gcol{display:flex;flex-direction:column;align-items:center;gap:22px;padding-top:60px}
.gbtn{position:relative;width:150px;height:150px;border:0;background:none;padding:0;cursor:pointer}
.gbody{position:absolute;bottom:0;left:12px;right:12px;height:88px;background:var(--gc);border:4px solid var(--line)}
.gbody::after,.glid::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:24px;transform:translateX(-50%);background:var(--rb);border-left:4px solid var(--line);border-right:4px solid var(--line)}
.glid{position:absolute;bottom:80px;left:2px;right:2px;height:40px;background:var(--gc);border:4px solid var(--line);transform-origin:left bottom;transition:transform .6s steps(6)}
.bow{position:absolute;top:-28px;width:28px;height:28px;background:var(--rb);border:4px solid var(--line);z-index:2}
.bow.l{left:calc(50% - 30px)}
.bow.r{left:calc(50% + 2px)}
.gopen .glid{transform:translate(36px,-36px) rotate(20deg)}
.ticket{width:100%;min-height:170px;padding:22px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--ink)}
.ticket h3{margin:0;font-family:'Press Start 2P',monospace;font-weight:400;font-size:13px;line-height:1.6}
.ticket p{margin:0;font-size:18px;line-height:1.35}
.ticket.pop{animation:pop .6s steps(6) both}
.ticket.idle{border-style:dashed;box-shadow:none;background:rgba(255,233,240,.55);font-size:18px}

/* songs */
.songs{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,56px);align-items:center;max-width:900px;margin:0 auto}
@media(max-width:760px){.songs{grid-template-columns:1fr}}
.deck{position:relative;width:clamp(240px,72vw,320px);aspect-ratio:1;margin:0 auto;background:var(--pink-lt);border:4px solid var(--line);box-shadow:6px 6px 0 var(--shd);display:grid;place-items:center}
.vinyl{position:relative;width:80%;aspect-ratio:1}
.vinyl svg{position:absolute;inset:0;width:100%;height:100%}
.vf{opacity:0;animation:vfr 1.2s steps(1) infinite;animation-play-state:paused}
.vinyl.on .vf{animation-play-state:running}
@keyframes vfr{0%{opacity:1}25%{opacity:0}100%{opacity:0}}
.arm{position:absolute;top:6%;right:8%;width:12px;height:46%;background:var(--pink-dp);border:4px solid var(--line);transform-origin:50% 8px;transform:rotate(-24deg);transition:transform .8s steps(8);z-index:2}
.arm.on{transform:rotate(12deg)}
.pivot{position:absolute;top:3%;right:calc(8% - 8px);width:28px;height:28px;background:var(--pink-dk);border:4px solid var(--line);z-index:3}
.tracklist{display:flex;flex-direction:column;gap:14px}
.track{display:flex;align-items:center;gap:14px;text-align:left;min-height:64px;padding:12px 16px;border:4px solid var(--line);background:var(--pink-lt);color:var(--ink);cursor:pointer;box-shadow:5px 5px 0 var(--shd)}
.track.act{background:var(--pink-dk)}
.track .dotc{flex:none;width:38px;height:38px;border:4px solid var(--line);background:var(--c);display:grid;place-items:center}
.track b{display:block;font-weight:600;font-size:18px;line-height:1.2}
.track small{font-size:15px;color:var(--rose)}
.eq{display:inline-flex;align-items:flex-end;gap:4px;height:20px;margin-left:10px}
.eq i{display:block;width:6px;height:100%;background:var(--ink);transform-origin:bottom;animation:eq .8s steps(4) infinite}
.eq i:nth-child(2){animation-delay:.2s}.eq i:nth-child(3){animation-delay:.4s}.eq i:nth-child(4){animation-delay:.1s}
@keyframes eq{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
.nowrow{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:12px}
.now{font-size:20px;font-weight:500;display:flex;align-items:center}

/* game */
.gamewrap{max-width:min(100%,480px);margin:0 auto}
.board{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(8px,2.4vw,16px)}
.mf .ico{width:58%;height:auto}
.mcard{position:relative;aspect-ratio:1;padding:0;border:0;background:none;cursor:pointer;perspective:700px}
.mflip{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .4s steps(4)}
.mcard.up .mflip{transform:rotateY(180deg)}
.mf{position:absolute;inset:0;display:grid;place-items:center;border:4px solid var(--line);backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:4px 4px 0 var(--shd)}
.mf.back{background:var(--pink-dp);color:var(--pink-lt)}
.mf.front{transform:rotateY(180deg);background:var(--pink-lt);color:var(--ink)}
.mcard.ok .mf.front{background:var(--pink-dk)}
.gstat{display:flex;justify-content:space-between;align-items:center;margin-top:24px;gap:12px;flex-wrap:wrap}
.win{margin-top:20px;padding:18px;text-align:center;animation:pop .6s steps(6) both;color:var(--ink)}
.win p{margin:0;font-size:30px;line-height:1.05}

/* letter */
.envbtn{display:block;margin:30px auto 0;padding:0;border:0;background:none;cursor:pointer;width:clamp(240px,80vw,360px)}
.envbtn svg{display:block;width:100%;height:auto;overflow:visible}
.hint{text-align:center;margin:18px 0 0;font-size:28px}
.paperwrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .8s steps(8);max-width:640px;margin:0 auto}
.paperwrap.show{grid-template-rows:1fr;margin-top:30px}
.paperin{overflow:hidden;min-height:0}
.paper{--pp:clamp(18px,5vw,30px);position:relative;padding:34px var(--pp);background:var(--pink-lt);border:4px solid var(--line);box-shadow:6px 6px 0 var(--shd);color:var(--ink);font-size:27px;line-height:34px;background-image:linear-gradient(transparent 32px,rgba(255,143,171,.55) 33px);background-size:100% 34px;background-position:0 32px}
.paper p{margin:0;white-space:pre-wrap}
.paper .ghost{visibility:hidden}
.paper .typed{position:absolute;left:var(--pp);right:var(--pp);top:34px}
.caret{display:inline-block;width:10px;height:22px;background:var(--ink);margin-left:2px;vertical-align:-4px;animation:blink .8s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.skip{margin-top:20px;text-align:center}

/* footer */
.foot{position:relative;padding:clamp(100px,14vw,140px) var(--gut) clamp(60px,8vw,90px);text-align:center;background:var(--pink);color:var(--ink);overflow:hidden}
.foot h2{font-family:'Press Start 2P',monospace;font-weight:400;font-size:clamp(14px,3vw,24px);margin:30px 0 14px;line-height:1.7;text-wrap:balance;text-shadow:3px 3px 0 #FFFFFF}
.foot p{margin:0;font-size:28px;color:var(--rose)}
.cat{width:clamp(220px,64vw,320px);margin:0 auto;position:relative}
.cat .px{width:100%;height:auto}
.breathe{animation:breathe 3.4s steps(1) infinite;transform-origin:50% 100%}
@keyframes breathe{0%,49%{transform:scaleY(1)}50%,100%{transform:scaleY(1.05)}}
.z{position:absolute;left:14%;top:0;font-family:'Press Start 2P',monospace;font-size:16px;color:var(--rose);opacity:0;animation:zz 3.6s steps(6) infinite}
.z.b{animation-delay:1.2s;left:20%}.z.c{animation-delay:2.4s;left:26%}
@keyframes zz{0%{opacity:0;transform:translate(0,10px)}30%{opacity:1}100%{opacity:0;transform:translate(26px,-50px)}}

/* confetti */
.confetti{position:fixed;inset:0;pointer-events:none;z-index:80;overflow:hidden}
.cp{position:absolute;top:-20px;width:var(--w);height:var(--w);background:var(--c);border:2px solid var(--line);animation:fall var(--t) steps(36) forwards;animation-delay:var(--d)}
@keyframes fall{to{transform:translate(var(--dx),110vh)}}

@media (hover:hover){
  .btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--line)}
  .polaroid:hover,.gbtn:hover{transform:translateY(-6px)}
  .track:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--shd)}
  .mcard:hover:not(.up) .mflip{transform:translateY(-4px)}
  .envbtn:hover svg{transform:translateY(-4px)}
}
@media (max-height:520px) and (orientation:landscape){
  .hero{min-height:0;padding-top:84px}
  .blowrow{min-height:0}
  .moon{width:44px;top:84px;right:14px}
}
@media (min-width:1600px){.wrap{max-width:1240px}}
@media (min-width:1800px){.h1{font-size:72px}.scene{width:min(100%,704px)}}
@media (min-width:2200px){.h1{font-size:88px}.scene{width:min(100%,880px)}.wrap{max-width:1400px}}

@media (prefers-reduced-motion:reduce){
  .bd *,.bd *::before,.bd *::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}
}
`;

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */
const pad = (n) => String(n).padStart(2, "0");
const COLORS = ["#FF8FAB", "#FFC15E", "#8FD9B6", "#C9B6FF", "#FFF0F4"];
const OL = "#7D5C94";

function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const raw = target.getTime() - now;
  const s = Math.floor(Math.max(0, raw) / 1000);
  return { done: raw <= 0, d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

function usePrefersReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);
  return r;
}

function Confetti({ burst }) {
  const [show, setShow] = useState(false);
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        c: COLORS[i % COLORS.length],
        w: 8 + Math.floor(Math.random() * 3) * 4,
        t: 2.6 + Math.random() * 2.4,
        d: Math.random() * 0.7,
        dx: (Math.random() - 0.5) * 240,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burst]
  );
  useEffect(() => {
    if (!burst) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 5600);
    return () => clearTimeout(t);
  }, [burst]);
  if (!show) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="cp"
          style={{ left: p.left + "%", "--c": p.c, "--w": p.w + "px", "--t": p.t + "s", "--d": p.d + "s", "--dx": p.dx + "px" }}
        />
      ))}
    </div>
  );
}

function SplitText({ text, start = 0 }) {
  let i = 0;
  return text.split(" ").map((w, wi) => (
    <span className="word" key={wi}>
      {w.split("").map((c) => {
        const d = start + i++ * 0.045;
        return (
          <span className="ch" key={i} style={{ "--d": d + "s" }}>
            {c}
          </span>
        );
      })}
    </span>
  ));
}

/* ------------------------------------------------------------------ */
/*  Pixel art                                                          */
/* ------------------------------------------------------------------ */
const SP_HEART = [
  "..OO.OO..", ".OPPOPPO.", "OPWPPPPPO", "OPPPPPPPO",
  ".OPPPPPO.", "..OPPPO..", "...OPO...", "....O....",
];
const SP_SPARKLE = [
  "...Y...", "...Y...", "..YWY..", "YYWWWYY", "..YWY..", "...Y...", "...Y...",
];
const SP_CLOUD = [
  "........WWWW........", "......WWWWWWWW......", "...WWW.WWWWWWWWWW...",
  "..WWWWWWWWWWWWWWWW..", ".WWWWWWWWWWWWWWWWWW.", "WWWWWWWWWWWWWWWWWWWW", ".BBBBBBBBBBBBBBBBBB.",
];
const SP_BALLOON = [
  "..OOOOO..", ".OPPPPPO.", "OPWPPPPPO", "OPWPPPPPO", "OPPPPPPPO", "OPPPPPPPO",
  ".OPPPPPO.", ".OPPPPPO.", "..OPPPO..", "...OPO...", "....O....", "....T....", "....T....", "...T.....",
];
const SP_CAT_A = [
  "..OO....OO......", ".OFFO..OFFO.....", ".OFFFOOFFFO.....", ".OFFFFFFFFO.....",
  ".OFEFFFFEFO.....", ".OFFFPPFFFO.....", ".OFFFFFFFFO.....", "..OOFFFFOO......",
  "..OFFLLLLFFO....", ".OFFLLLLLLFFO.OO", ".OFFLLLLLLFFOOFO", ".OFFFLLLLFFFOFFO",
  ".OFFFFFFFFFFOFO.", "..OOOOOOOOOOOO..",
];
const SP_CAT_B = [
  "..OO....OO......", ".OFFO..OFFO.....", ".OFFFOOFFFO.....", ".OFFFFFFFFO.....",
  ".OFOFFFFOFO.....", ".OFFFPPFFFO.....", ".OFFFFFFFFO.....", "..OOFFFFOO......",
  "..OFFLLLLFFO..O.", ".OFFLLLLLLFFOOFO", ".OFFLLLLLLFFOFFO", ".OFFFLLLLFFFOFO.",
  ".OFFFFFFFFFFOO..", "..OOOOOOOOOOOO..",
];
const SP_CAT_SLEEP = [
  "..OO....OO",
  ".OFFO..OFFO",
  ".OFFFOOFFFO",
  ".OFFFFFFFFFOOOOOOOOOOO",
  ".OFEEFFFEEFFFTFFTFFTFFO",
  ".OFFFFPFFFFFFFFFFFFFFFO",
  ".OPFFFFFFFPFFFFFFFFFFFOOO",
  ".OFFFFFFFFFFFFFFFFFFFFFFFO",
  "..OLLLLFFFFFFFFFFFFFFOOOO",
  "...OOOOOOOOOOOOOOOOO",
];
const SP_MOON = [
  "....OOOOO....", "..OOWWWWWOO..", ".OWWWWWWWWWO.", ".OWWDDWWWWWO.", "OWWWDDWWWWWWO",
  "OWWEWWWWWEWWO", "OWPWWWWWWWPWO", "OWWWWEEEWWWWO", "OWWWWWWWWWWWO", ".OWWWWWWWWWO.",
  ".OWWWWWDDWWO.", "..OOWWWWWOO..", "....OOOOO....",
];
const HEART_PAL = { O: "#C45B83", P: "#FF8FAB", W: "#FFFFFF" };
const SPARK_PAL = { Y: "#FFC94D", W: "#FFFFFF" };
const CLOUD_PAL = { W: "#FFFFFF", B: "#FFDCE6" };
const CAT_PAL = { O: "#8A5A44", F: "#FFB86B", L: "#FFE9C7", E: "#4B3770", P: "#FF8FAB", T: "#E58F3E" };
const MOON_PAL = { O: OL, W: "#FFF0C2", D: "#F7D98A", E: OL, P: "#FF8FAB" };
const balloonPal = (c) => ({ O: "#8E6AA8", P: c, W: "#FFFFFF", T: "#8E6AA8" });
const ICO_PAL = { X: "currentColor" };

function Pixel({ rows, pal, px = 4, className = "", style }) {
  const w = Math.max(...rows.map((r) => r.length));
  const rects = [];
  rows.forEach((r, y) => {
    let x = 0;
    while (x < w) {
      const c = r[x];
      if (!c || c === ".") { x++; continue; }
      let e = x + 1;
      while (e < w && r[e] === c) e++;
      rects.push(<rect key={x + "-" + y} x={x} y={y} width={e - x} height="1" fill={pal[c] || "#000"} />);
      x = e;
    }
  });
  return (
    <svg className={"px " + className} style={style} width={w * px} height={rows.length * px} viewBox={`0 0 ${w} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true">
      {rects}
    </svg>
  );
}

function Ico({ n, px = 3, className = "", style }) {
  return <Pixel rows={ICONS[n]} pal={ICO_PAL} px={px} className={"ico " + className} style={style} />;
}

function PixelClouds() {
  const cl = [
    { top: "14%", px: 5, dur: 95, delay: -30, op: 0.95 },
    { top: "30%", px: 4, dur: 130, delay: -85, op: 0.8 },
    { top: "7%", px: 3, dur: 160, delay: -50, op: 0.7 },
  ];
  return cl.map((c, i) => (
    <div key={i} className="pxcloud" style={{ top: c.top, animationDuration: c.dur + "s", animationDelay: c.delay + "s", opacity: c.op }} aria-hidden="true">
      <Pixel rows={SP_CLOUD} pal={CLOUD_PAL} px={c.px} />
    </div>
  ));
}

function PixelHearts() {
  const hs = [
    [6, 3, 11, 0], [18, 4, 14, 3], [31, 3, 12, 6], [47, 4, 15, 1.5],
    [63, 3, 13, 8], [76, 4, 11, 4.5], [88, 3, 14, 7], [94, 3, 12, 10],
  ];
  return hs.map(([l, px, t, d], i) => (
    <div key={i} className="pxheart" style={{ left: l + "%", "--t": t + "s", "--d": d + "s" }} aria-hidden="true">
      <Pixel rows={SP_HEART} pal={HEART_PAL} px={px} />
    </div>
  ));
}

function PixelBalloons() {
  const bs = [
    [4, "#B7A5FF", 26, 0], [90, "#FFE08A", 30, -9], [14, "#9CD6F5", 34, -19],
  ];
  return bs.map(([l, c, t, d], i) => (
    <div key={i} className="pxballoon" style={{ left: l + "%", "--t": t + "s", "--d": d + "s" }} aria-hidden="true">
      <Pixel rows={SP_BALLOON} pal={balloonPal(c)} px={5} />
    </div>
  ));
}

function PixelCat() {
  return (
    <div className="pxcat" aria-hidden="true">
      <Pixel rows={SP_CAT_A} pal={CAT_PAL} px={5} className="f1" />
      <Pixel rows={SP_CAT_B} pal={CAT_PAL} px={5} className="f2" />
      <Pixel rows={SP_HEART} pal={HEART_PAL} px={3} className="cathrt" />
    </div>
  );
}

/* Box = 1-unit outline + fill, all on the pixel grid */
function Box({ x, y, w, h, fill, line = OL }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={line} />
      <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} fill={fill} />
    </g>
  );
}

function Lights() {
  const { wire, bulbs } = useMemo(() => {
    const wire = [];
    const bulbs = [];
    for (let x = 0; x < 1200; x += 12) {
      const t = ((x % 400) + 6) / 400;
      wire.push([x, Math.round((8 + 164 * t * (1 - t)) / 6) * 6]);
    }
    let k = 0;
    for (let s = 0; s < 3; s++) {
      [0.18, 0.34, 0.5, 0.66, 0.82].forEach((t) => {
        const x = s * 400 + t * 400;
        const y = 8 + 164 * t * (1 - t);
        bulbs.push({ x: Math.round(x / 12) * 12, y: Math.round(y / 6) * 6, c: COLORS[k % 4], d: (k * 0.37) % 2.4 });
        k++;
      });
    }
    return { wire, bulbs };
  }, []);
  return (
    <svg className="lights" viewBox="0 0 1200 96" preserveAspectRatio="xMidYMin slice" shapeRendering="crispEdges" aria-hidden="true">
      {wire.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="12" height="6" fill="#D98AA8" />
      ))}
      {bulbs.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y + 6} width="6" height="6" fill="#D98AA8" />
          <rect className="bulb" style={{ "--d": b.d + "s" }} x={b.x - 6} y={b.y + 12} width="18" height="18" fill={b.c} stroke={OL} strokeWidth="3" />
        </g>
      ))}
    </svg>
  );
}

function Moon() {
  return <Pixel rows={SP_MOON} pal={MOON_PAL} px={8} className="moon" />;
}

function TableScene({ lit }) {
  const W = "#FFFFFF";
  return (
    <svg viewBox="0 -8 64 44" shapeRendering="crispEdges" role="img" aria-label="A pixel birthday cake with a candle, a mug of cocoa and a small plant">
      {/* plant */}
      <g className="sway">
        <Box x={53} y={19} w={3} h={8} fill="#8FD9B6" />
        <Box x={56} y={14} w={3} h={13} fill="#6CC79C" />
        <Box x={59} y={20} w={3} h={7} fill="#A8E6C6" />
      </g>
      <Box x={52} y={29} w={10} h={7} fill="#FF8FAB" />
      <Box x={51} y={27} w={12} h={3} fill="#FFB4C6" />

      {/* plate */}
      <Box x={16} y={32} w={32} h={4} fill={W} />

      {/* bottom tier */}
      <Box x={18} y={22} w={28} h={10} fill="#FF8FAB" />
      <rect x="19" y="23" width="26" height="2" fill={W} />
      <rect x="20" y="25" width="2" height="2" fill={W} />
      <rect x="26" y="25" width="2" height="3" fill={W} />
      <rect x="32" y="25" width="3" height="2" fill={W} />
      <rect x="38" y="25" width="2" height="3" fill={W} />
      <rect x="42" y="25" width="2" height="2" fill={W} />
      <rect x="22" y="29" width="1" height="1" fill={W} />
      <rect x="29" y="30" width="1" height="1" fill="#FFC15E" />
      <rect x="35" y="29" width="1" height="1" fill="#8FD9B6" />
      <rect x="41" y="30" width="1" height="1" fill={W} />

      {/* middle tier */}
      <Box x={22} y={14} w={20} h={8} fill="#8FD9B6" />
      <rect x="23" y="15" width="18" height="2" fill={W} />
      <rect x="24" y="17" width="2" height="2" fill={W} />
      <rect x="30" y="17" width="2" height="3" fill={W} />
      <rect x="36" y="17" width="2" height="2" fill={W} />

      {/* top tier */}
      <Box x={26} y={7} w={12} h={7} fill="#C9B6FF" />
      <rect x="27" y="8" width="10" height="2" fill={W} />
      <rect x="28" y="10" width="2" height="2" fill={W} />
      <rect x="32" y="10" width="2" height="3" fill={W} />
      <rect x="35" y="10" width="2" height="2" fill={W} />

      {/* candle */}
      <Box x={30} y={1} w={4} h={7} fill="#FFC15E" />
      <rect x="31" y="4" width="2" height="1" fill="#E8A33E" />
      <rect x="31" y="-1" width="2" height="2" fill={OL} />

      {lit ? (
        <g>
          <rect className="pulse" x="26" y="-8" width="12" height="8" fill="#FFC15E" />
          <g className="flame">
            <rect x="31" y="-6" width="2" height="1" fill="#FFB020" />
            <rect x="30" y="-5" width="4" height="3" fill="#FFB020" />
            <rect x="31" y="-4" width="2" height="2" fill="#FFF1B0" />
            <rect x="31" y="-2" width="2" height="1" fill="#FFB020" />
          </g>
        </g>
      ) : (
        <g aria-hidden="true">
          <rect className="puff" x="31" y="-3" width="2" height="2" fill="#FFFFFF" />
          <rect className="puff b" x="33" y="-3" width="2" height="2" fill="#FFFFFF" />
          <rect className="puff c" x="29" y="-3" width="2" height="2" fill="#FFFFFF" />
        </g>
      )}

      {/* mug */}
      <rect className="steamp" x="4" y="23" width="1" height="3" fill="#FFFFFF" />
      <rect className="steamp b" x="7" y="22" width="1" height="3" fill="#FFFFFF" />
      <rect x="11" y="29" width="4" height="1" fill={OL} />
      <rect x="14" y="29" width="1" height="5" fill={OL} />
      <rect x="11" y="33" width="4" height="1" fill={OL} />
      <Box x={0} y={27} w={11} h={9} fill="#FFC15E" />
      <rect x="1" y="28" width="9" height="1" fill="#FFE08A" />
      <rect x="4" y="30" width="1" height="1" fill="#FF8FAB" />
      <rect x="6" y="30" width="1" height="1" fill="#FF8FAB" />
      <rect x="3" y="31" width="5" height="1" fill="#FF8FAB" />
      <rect x="4" y="32" width="3" height="1" fill="#FF8FAB" />
      <rect x="5" y="33" width="1" height="1" fill="#FF8FAB" />
    </svg>
  );
}

function Hero({ fire }) {
  const cd = useCountdown(CONFIG.birthday);
  const [lit, setLit] = useState(true);
  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, () => ({
        l: Math.random() * 100,
        t: 6 + Math.random() * 58,
        s: 6 + Math.floor(Math.random() * 3) * 4,
        d: Math.random() * 3.4,
      })),
    []
  );
  const toggle = () => {
    if (lit) fire();
    setLit((v) => !v);
  };
  return (
    <header className="hero" id="top">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: s.l + "%", top: s.t + "%", "--s": s.s + "px", "--d": s.d + "s" }} aria-hidden="true" />
      ))}
      <Lights />
      <Moon />
      <PixelClouds />
      <PixelBalloons />
      <PixelHearts />

      <div className="titleblock">
        <Pixel rows={SP_SPARKLE} pal={SPARK_PAL} px={5} className="spk" style={{ left: "-3%", top: "-16%" }} />
        <Pixel rows={SP_SPARKLE} pal={SPARK_PAL} px={4} className="spk s2" style={{ right: "-2%", top: "4%" }} />
        <Pixel rows={SP_SPARKLE} pal={SPARK_PAL} px={3} className="spk s3" style={{ left: "5%", bottom: "-10%" }} />
        <Pixel rows={SP_SPARKLE} pal={SPARK_PAL} px={4} className="spk s4" style={{ right: "12%", bottom: "-14%" }} />
        <h1 className="h1">
          <SplitText text="Happy Birthday" />
          <br />
          <SplitText text={CONFIG.name} start={0.7} />
        </h1>
      </div>
      <p className="hand dateline">{CONFIG.dateLabel}</p>

      <div className="cd" role="timer" aria-label="Countdown to your birthday">
        {[["Days", cd.d], ["Hours", cd.h], ["Minutes", cd.m], ["Seconds", cd.s]].map(([l, v]) => (
          <div className="tile" key={l}>
            <b>{pad(v)}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <p className="cdnote">{cd.done ? "Today is your day." : "until your day begins"}</p>

      <div className="blowrow">
        <button className="btn" onClick={toggle}>
          <Ico n="flame" px={4} />
          {lit ? "Blow out the candle" : "Light it again"}
        </button>
        {!lit && <p className="hand blowmsg">Your wish is out in the sky. Keep scrolling.</p>}
      </div>

      <div className="scene" onClick={toggle}>
        <TableScene lit={lit} />
      </div>
      <div className="tabletop" aria-hidden="true" />
      <PixelCat />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Section shell                                                      */
/* ------------------------------------------------------------------ */
function Divider() {
  return <div className="divider" aria-hidden="true" />;
}

function Decor({ items }) {
  return items.map(([n, top, side, px, color, d], i) => (
    <span key={i} className="decor" style={{ top, [side[0]]: side[1], "--d": d + "s", color }} aria-hidden="true">
      <Ico n={n} px={px} />
    </span>
  ));
}

function Section({ id, icon, title, sub, decor = [], children }) {
  return (
    <section id={id} className="sec">
      <Divider />
      <Decor items={decor} />
      <div className="wrap">
        <div className="sechead">
          <span className="badge">
            <Ico n={icon} px={4} />
          </span>
          <h2>{title}</h2>
          <p className="hand sub">{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Wish lanterns                                                      */
/* ------------------------------------------------------------------ */
function Wishes() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const release = () => {
    const t = text.trim();
    if (!t) return;
    setItems((a) => [
      ...a.slice(-5),
      { id: Date.now(), t, x: 20 + Math.random() * 60, h: 30 + Math.random() * 26, c: ["#7FD0F5", "#FFC15E", "#8FD9B6", "#C9B6FF"][Math.floor(Math.random() * 4)] },
    ]);
    setText("");
  };
  return (
    <>
      <div className="sky" aria-live="polite">
        {items.length === 0 && <p className="empty hand">Type a wish below and send it to the container!</p>}
        {items.map((it) => (
          <div className="lantern" key={it.id} style={{ left: it.x + "%", "--h": it.h + "%", "--c": it.c }}>
            <div className="lbody" />
            <span className="ltag hand">{it.t}</span>
          </div>
        ))}
      </div>
      <div className="wishbar">
        <input
          value={text}
          maxLength={36}
          placeholder="Write your wish"
          aria-label="Your wish"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && release()}
        />
        <button className="btn" onClick={release}>
          <Ico n="send" px={4} />
          Send the wish
        </button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Memories                                                           */
/* ------------------------------------------------------------------ */
function Polaroid({ m }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      className={"polaroid" + (flipped ? " flipped" : "")}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={m.title + ". Tap to read the note."}
    >
      <span className="pflip">
        <span className="pface">
          <span className="photo" style={{ background: m.bg }}>
            {m.photo ? (
              <img src={m.photo} alt={m.title} />
            ) : (
              <>
                <span className="dot" style={{ width: 64, height: 64, top: -16, left: -16 }} />
                <span className="dot" style={{ width: 40, height: 40, bottom: 14, right: 12 }} />
                <Ico n={m.icon} px={9} />
              </>
            )}
          </span>
          <span className="cap">{m.title}</span>
        </span>
        <span className="pface back">
          <Pixel rows={SP_HEART} pal={HEART_PAL} px={5} />
          <p className="hand">{m.note}</p>
          <small>{m.date}</small>
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Jar of reasons                                                     */
/* ------------------------------------------------------------------ */
function Jar() {
  const [cur, setCur] = useState(null);
  const [seen, setSeen] = useState([]);
  const [tick, setTick] = useState(0);
  const pull = () => {
    let pool = REASONS.map((_, i) => i).filter((i) => !seen.includes(i));
    let base = seen;
    if (pool.length === 0) {
      pool = REASONS.map((_, i) => i).filter((i) => i !== cur);
      base = [];
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setSeen([...base, pick]);
    setCur(pick);
    setTick((t) => t + 1);
  };
  const notes = [
    [96, 262, -14, "#9CD6F5"], [150, 268, 6, "#FFC15E"], [206, 262, 16, "#8FD9B6"],
    [120, 236, 10, "#C9B6FF"], [180, 238, -8, "#FFC15E"], [90, 222, -22, "#8FD9B6"],
    [214, 226, 20, "#B9A6FF"], [150, 210, -4, "#FFF0F4"],
  ];
  return (
    <div className="jarlayout">
      <div className="jarcol">
        <div key={tick} className={"jarwrap" + (tick ? " wiggle" : "")}>
          <svg viewBox="0 0 300 320" role="img" aria-label="A glass jar full of folded paper notes">
            {notes.map(([x, y, r, c], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
                <rect x="-26" y="-16" width="52" height="32" rx="5" fill={c} stroke="#7D5C94" strokeWidth="2.8" />
                <path d="M-12 -3 h24 M-12 6 h14" stroke="#7D5C94" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            ))}
            <path d="M70 74 H230 Q262 100 262 150 V250 Q262 300 212 300 H88 Q38 300 38 250 V150 Q38 100 70 74Z" fill="rgba(255,255,255,.4)" stroke="#7D5C94" strokeWidth="3.5" />
            <path d="M62 130 q-4 50 0 100" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity=".8" />
            <rect x="92" y="52" width="116" height="24" rx="6" fill="rgba(255,255,255,.55)" stroke="#7D5C94" strokeWidth="3.5" />
            <rect x="78" y="16" width="144" height="38" rx="11" fill="#FFC15E" stroke="#7D5C94" strokeWidth="3.5" />
            <path d="M100 26 v18 M122 26 v18 M144 26 v18 M166 26 v18 M188 26 v18" stroke="#7D5C94" strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
          </svg>
        </div>
        <button className="btn" onClick={pull}>
          <Ico n="heart" px={3} />
          Pull a note
        </button>
      </div>
      <div>
        {cur === null ? (
          <div className="notecard sticker idle">
            <p className="hand">Pull a note from the jar to read your first reason.</p>
          </div>
        ) : (
          <div key={tick} className="notecard sticker">
            <span className="tape" />
            <Pixel rows={SP_HEART} pal={HEART_PAL} px={4} />
            <p className="hand">{REASONS[cur]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gifts                                                              */
/* ------------------------------------------------------------------ */
function Gifts({ fire }) {
  const [open, setOpen] = useState([false, false, false]);
  const toggle = (i) => {
    if (!open[i]) fire();
    setOpen((o) => o.map((v, k) => (k === i ? !v : v)));
  };
  return (
    <div className="gifts">
      {GIFTS.map((g, i) => (
        <div className="gcol" key={g.title}>
          <button
            className={"gbtn" + (open[i] ? " gopen" : "")}
            style={{ "--gc": g.c, "--rb": g.r }}
            onClick={() => toggle(i)}
            aria-label={(open[i] ? "Close" : "Open") + " gift " + (i + 1)}
            aria-pressed={open[i]}
          >
            <span className="gbody" />
            <span className="glid">
              <span className="bow l" />
              <span className="bow r" />
            </span>
          </button>
          {open[i] ? (
            <div className="ticket sticker pop">
              <Ico n={g.icon} px={5} />
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </div>
          ) : (
            <div className="ticket sticker idle">Tap the box to open it</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Songs                                                              */
/* ------------------------------------------------------------------ */
function discRows(mode) {
  const N = 21;
  const c = (N - 1) / 2;
  const rows = [];
  for (let y = 0; y < N; y++) {
    let s = "";
    for (let x = 0; x < N; x++) {
      const dx = x - c;
      const dy = y - c;
      const r = Math.sqrt(dx * dx + dy * dy);
      if (mode === "base") {
        if (r > 10.6) s += ".";
        else if (r > 9.4) s += "O";
        else if (r <= 1.3) s += "K";
        else if (r <= 4.3) s += "L";
        else s += Math.floor(r) % 2 ? "D" : "G";
      } else {
        const a = Math.atan2(dy, dx);
        const d = (((a - (mode * Math.PI) / 4) % Math.PI) + Math.PI) % Math.PI;
        s += r > 5 && r < 9.2 && (d < 0.35 || d > Math.PI - 0.35) ? "W" : ".";
      }
    }
    rows.push(s);
  }
  return rows;
}

function Record({ color, on }) {
  const base = useMemo(() => discRows("base"), []);
  const frames = useMemo(() => [0, 1, 2, 3].map(discRows), []);
  return (
    <div className={"vinyl" + (on ? " on" : "")}>
      <Pixel rows={base} pal={{ O: OL, D: "#C45B83", G: "#D9739A", L: color, K: "#FFE9F0" }} px={10} />
      {frames.map((f, i) => (
        <Pixel key={i} rows={f} pal={{ W: "#FFFFFF" }} px={10} className="vf" style={{ animationDelay: i * 0.3 + "s" }} />
      ))}
    </div>
  );
}

function Songs() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const t = TRACKS[idx];
  const choose = (i) => {
    setIdx(i);
    setPlaying(true);
  };
  return (
    <div className="songs">
      <div className="deck">
        <Record color={t.c} on={playing} />
        <span className={"arm" + (playing ? " on" : "")} />
        <span className="pivot" />
      </div>
      <div>
        <div className="tracklist">
          {TRACKS.map((tr, i) => (
            <button key={tr.title} className={"track" + (i === idx ? " act" : "")} style={{ "--c": tr.c }} onClick={() => choose(i)}>
              <span className="dotc">
                <Ico n="music" px={2} />
              </span>
              <span>
                <b>{tr.title}</b>
                <small>{tr.note}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="nowrow">
          <span className="now">
            {playing ? "Now spinning" : "Paused"}
            {playing && (
              <span className="eq" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
            )}
          </span>
          <button className="btn mint" onClick={() => setPlaying((p) => !p)}>
            <Ico n={playing ? "pause" : "play"} px={3} />
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Match game                                                         */
/* ------------------------------------------------------------------ */
function makeDeck() {
  const d = [...PAIRS, ...PAIRS].map((p, i) => ({ ...p, id: i }));
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function Game({ fire }) {
  const [cards, setCards] = useState(makeDeck);
  const [open, setOpen] = useState([]);
  const [done, setDone] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const flip = (i) => {
    if (lock || open.includes(i) || done.includes(cards[i].k)) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = next;
      if (cards[a].k === cards[b].k) {
        setTimeout(() => {
          setDone((d) => [...d, cards[a].k]);
          setOpen([]);
          setLock(false);
        }, 450);
      } else {
        setTimeout(() => {
          setOpen([]);
          setLock(false);
        }, 850);
      }
    }
  };
  const won = done.length === PAIRS.length;
  useEffect(() => {
    if (won) fire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);
  const reset = () => {
    setCards(makeDeck());
    setOpen([]);
    setDone([]);
    setMoves(0);
    setLock(false);
  };
  return (
    <div className="gamewrap">
      <div className="board">
        {cards.map((c, i) => {
          const up = open.includes(i) || done.includes(c.k);
          return (
            <button
              key={c.id}
              className={"mcard" + (up ? " up" : "") + (done.includes(c.k) ? " ok" : "")}
              onClick={() => flip(i)}
              aria-label={up ? c.k : "Hidden card"}
            >
              <span className="mflip">
                <span className="mf back">
                  <Ico n="heart" px={4} />
                </span>
                <span className="mf front">
                  <Ico n={c.icon} px={5} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="gstat">
        <span style={{ fontWeight: 500 }}>
          Moves: {moves} &nbsp;|&nbsp; Pairs: {done.length} of {PAIRS.length}
        </span>
        <button className="btn" onClick={reset}>
          <Ico n="sparkles" px={3} />
          Shuffle
        </button>
      </div>
      {won && (
        <div className="win sticker">
          <p className="hand">All pairs found in {moves} moves. You always find the cozy things.</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Letter                                                             */
/* ------------------------------------------------------------------ */
function Envelope({ open }) {
  const body = "#FFE9F0";
  const flap = "#FFB4CB";
  const rows = [];
  for (let j = 0; j <= 8; j++) {
    const y = open ? 3 - j : 5 + j;
    rows.push(
      <g key={j}>
        <rect x={j + 1} y={y} width="1" height="1" fill={OL} />
        <rect x={30 - j} y={y} width="1" height="1" fill={OL} />
        <rect x={j + 2} y={y} width={28 - 2 * j} height="1" fill={open ? "#FFC4D6" : flap} />
      </g>
    );
  }
  const vlines = [];
  for (let j = 0; j < 9; j++) {
    vlines.push(<rect key={"a" + j} x={1 + j} y={22 - j} width="1" height="1" fill="#E8A3BC" />);
    vlines.push(<rect key={"b" + j} x={30 - j} y={22 - j} width="1" height="1" fill="#E8A3BC" />);
  }
  return (
    <svg viewBox="0 -8 32 32" shapeRendering="crispEdges" role="img" aria-label="A pink envelope sealed with a heart">
      <Box x={0} y={4} w={32} h={20} fill={body} />
      {vlines}
      {rows}
      <rect x="10" y={open ? -6 : 14} width="12" height="1" fill={OL} />
      {!open && (
        <g>
          <Box x={14} y={10} w={4} h={4} fill="#FFC15E" />
        </g>
      )}
    </svg>
  );
}

function Letter({ fire }) {
  const reduced = usePrefersReduced();
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!open) return;
    if (reduced) {
      setN(LETTER.length);
      return;
    }
    const t = setInterval(() => {
      setN((v) => {
        if (v >= LETTER.length) {
          clearInterval(t);
          return v;
        }
        return v + 2;
      });
    }, 26);
    return () => clearInterval(t);
  }, [open, reduced]);
  const doOpen = () => {
    if (open) return;
    setOpen(true);
    fire();
  };
  const typing = open && n < LETTER.length;
  return (
    <>
      <button className={"envbtn" + (open ? " eopen" : "")} onClick={doOpen} aria-label="Open the letter">
        <Envelope open={open} />
      </button>
      {!open && <p className="hand hint">Tap the envelope to open your letter</p>}
      <div className={"paperwrap" + (open ? " show" : "")}>
        <div className="paperin">
          <div className="paper hand">
            <p className="ghost" aria-hidden="true">{LETTER}</p>
            <p className="typed" aria-label={LETTER}>
              {LETTER.slice(0, n)}
              {typing && <span className="caret" />}
            </p>
          </div>
          {typing && (
            <div className="skip">
              <button className="btn" onClick={() => setN(LETTER.length)}>
                Show the whole letter
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer cat                                                         */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="foot">
      <Divider />
      <PixelClouds />
      <PixelHearts />
      <div className="cat">
        <span className="z">z</span>
        <span className="z b">z</span>
        <span className="z c">z</span>
        <Pixel rows={SP_CAT_SLEEP} pal={CAT_PAL} px={10} className="breathe" />
      </div>
      <h2>Happy birthday, {CONFIG.name}.</h2>
      <p className="hand">Made with love by {CONFIG.from}</p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  ADVENTURE GAME: "Tied Together" (built by Claude)                  */
/*  Optimized: cached glow/text sprites, pauses when off-screen,       */
/*  steady 60 Hz stepping, compositor-only DOM updates.                */
/*  Edit the 17 NOTES below: one memory per gem.                       */
/* ------------------------------------------------------------------ */
const W = 320, H = 180, G = 0.28, JUMP = -5.7, RUN = 1.7, CHAIN = 62, N = 118;
const DEFAULT_MESSAGE = "Seventeen gems, one very long chain, and I'd climb every one of those roofs again. Happy golden birthday.";
// Replace these with your own memories, one per gem (17 total).
const NOTES = [
    "Still my favorite person to be tied to.",
    "You make ordinary days feel like they have a soundtrack.",
    "I'd pick your side of the chain any day.",
    "Seventeen looks good on you.",
    "Your laugh is the best sound there is.",
    "Quiet days with you are my favorite kind.",
    "You make me braver.",
    "Thank you for being so easy to love.",
    "Another one. We make a good team.",
    "I like who I am around you.",
    "No rush. We've got time.",
    "You were the best surprise.",
    "Every road gets cozier with you on it.",
    "Proud of you, always.",
    "Almost at the top. Look how far we've come.",
    "One more, then cake.",
    "That's all seventeen. Go find the cake.",
];
const ROOMS = [
    { name: "Living room", say: "Lead the way. I'll keep up.", wall: "#e6cfb0", wain: "#a9754f", floor: "#b88a5e", curt: "#c9785f", top: "#c99a68", body: "#8f6444", edge: "#6b4a37", flower: "#c97b84", lamp: "#f3d595" },
    { name: "Kitchen", say: "Smells like cookies. Keep going.", wall: "#b8c9a6", wain: "#e8e0cc", floor: "#c9b48e", curt: "#e8c46a", top: "#f0e8d6", body: "#b5895e", edge: "#8a6446", flower: "#d9826a", lamp: "#f6dc9a" },
    { name: "Library nook", say: "A draft from the window. Hold on!", wall: "#5f7a6c", wain: "#4a3328", floor: "#6b4a37", curt: "#8b4a52", top: "#8b6a4c", body: "#5a3f33", edge: "#3e2b23", flower: "#e0b86a", lamp: "#f8d98d" },
    { name: "Bedroom", say: "Soft blankets everywhere. Stay close.", wall: "#d9aeb4", wain: "#f1e4dc", floor: "#c9a27a", curt: "#a8b8d0", top: "#f1e4dc", body: "#c98f8f", edge: "#9a6a6a", flower: "#f6e3a1", lamp: "#ffe0a8" },
    { name: "The attic", say: "Almost there. I can smell cake.", wall: "#43405e", wain: "#2f2c45", floor: "#5b4636", curt: "#d9826a", top: "#c9a45c", body: "#6b5a52", edge: "#3a2f36", flower: "#f6e1a6", lamp: "#ffe39a" },
];
const BASE = [
    { name: "Morning meadow", say: "Lead the way. I'll keep up.", sky: ["#f8e3c4", "#f4cfa8", "#efb995"], far: "#e6c3a6", near: "#d3a78c", top: "#8fae6e", body: "#a47b5a", edge: "#6f8a52", flower: "#f3d8a0", lamp: "#cdb48c" },
    { name: "Rooftop hours", say: "Warm tiles. Watch your step.", sky: ["#f7d9a9", "#f1bb90", "#e69f88"], far: "#dba58e", near: "#c68578", top: "#bd6c56", body: "#dcb890", edge: "#8d4e44", flower: "#f6e0b0", lamp: "#e9c98e" },
    { name: "Above the clouds", say: "Don't look down. I've got the chain.", sky: ["#f3cdbb", "#e9aeaa", "#cf93a8"], far: "#dba9b0", near: "#c78f9f", top: "#fbf1e6", body: "#e9ddd8", edge: "#cbbdb9", flower: "#f4c7c3", lamp: "#f1d9b0" },
    { name: "Lantern dusk", say: "Lanterns. Stay close.", sky: ["#c48a8f", "#9a7092", "#665d86"], far: "#8b6c92", near: "#6d587f", top: "#7c9a84", body: "#4e5f68", edge: "#3e4c54", flower: "#e9b6a4", lamp: "#f8d98d" },
    { name: "The summit", say: "Almost there. I can smell cake.", sky: ["#3b4a6b", "#2d3a58", "#222c47"], far: "#3f4d6c", near: "#33405c", top: "#e0c27c", body: "#5a5078", edge: "#9d8450", flower: "#f6e1a6", lamp: "#ffe39a" },
];
const ZONES = BASE.map((z, i) => ({ ...z, ...ROOMS[i] }));
const CH = [[261.63, 329.63, 392, 493.88], [220, 261.63, 329.63, 392], [174.61, 220, 261.63, 329.63], [196, 246.94, 293.66, 329.63]];
const SND = {
    ctx: null, out: null, nz: null, lp: null, id: 0, i: 0, off: false,
    init() {
        if (this.ctx) {
            void this.ctx.resume();
            return;
        }
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC)
            return;
        const c = new AC(), o = c.createGain();
        const mc = c.createDynamicsCompressor(), rv = c.createConvolver(), rg = c.createGain(), ir = c.createBuffer(2, c.sampleRate * 2, c.sampleRate);
        for (let h = 0; h < 2; h++) {
            const d = ir.getChannelData(h);
            for (let i = 0; i < d.length; i++)
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
        }
        rv.buffer = ir;
        rg.gain.value = 0.4;
        o.gain.value = this.off ? 0 : 0.9;
        o.connect(mc);
        o.connect(rg);
        rg.connect(rv);
        rv.connect(mc);
        mc.connect(c.destination);
        void c.resume();
        const lp = c.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 1900;
        lp.connect(o);
        this.lp = lp;
        const b = c.createBuffer(1, c.sampleRate, c.sampleRate), d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++)
            d[i] = Math.random() * 2 - 1;
        this.ctx = c;
        this.out = o;
        this.nz = b;
    },
    tone(f, d, type, v, to = f) {
        const c = this.ctx, o = this.out;
        if (!c || !o)
            return;
        const t = c.currentTime, os = c.createOscillator(), g = c.createGain();
        os.type = type;
        os.frequency.setValueAtTime(f, t);
        os.frequency.exponentialRampToValueAtTime(to, t + d);
        const a = Math.min(0.5, d * 0.15);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v * 2, t + a);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        os.connect(g);
        g.connect(this.lp || o);
        os.start(t);
        os.stop(t + d + 0.05);
    },
    noise(d, v, fq) {
        const c = this.ctx, o = this.out;
        if (!c || !o || !this.nz)
            return;
        const t = c.currentTime, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
        s.buffer = this.nz;
        f.type = "lowpass";
        f.frequency.value = fq;
        g.gain.setValueAtTime(v * 2, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        s.connect(f);
        f.connect(g);
        g.connect(o);
        s.start(t);
        s.stop(t + d);
    },
    music() {
        if (this.id)
            return;
        this.id = window.setInterval(() => {
            const i = this.i++, ch = CH[Math.floor(i / 8) % 4];
            if (this.ctx && this.ctx.state === "suspended")
                void this.ctx.resume();
            this.tone(ch[[0, 2, 1, 3, 2, 1, 3, 2][i % 8]], 1.6, "sine", 0.05);
            if (i % 2 === 0)
                this.tone(ch[1] * 2, 1.2, "triangle", 0.015);
            if (i % 8 === 0) {
                this.tone(ch[0] / 2, 4.6, "sine", 0.05);
                this.tone(ch[2] / 2, 4.6, "sine", 0.03);
                this.tone(ch[3], 4.6, "sine", 0.02);
            }
            if (i % 8 === 4)
                this.tone(ch[0] / 2, 2, "sine", 0.04);
            if (i % 6 === 5)
                this.tone(ch[3] * 2, 1.8, "sine", 0.025);
            this.noise(0.12, 0.004, 5000);
        }, 600);
    },
    mute(m) { this.off = m; if (this.out)
        this.out.gain.value = m ? 0 : 0.9; },
    stop() { window.clearInterval(this.id); this.id = 0; },
    pause() { this.stop(); if (this.ctx) void this.ctx.suspend(); },
    wake() { if (!this.ctx) return; void this.ctx.resume(); this.music(); },
};
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const MIXC = new Map();
const mix = (a, b, t) => {
    const key = a + b + t;
    let v = MIXC.get(key);
    if (v === undefined) {
        const A = hex(a), B = hex(b);
        v = "#" + A.map((x, i) => Math.round(x + (B[i] - x) * t).toString(16).padStart(2, "0")).join("");
        if (MIXC.size > 4000) MIXC.clear();
        MIXC.set(key, v);
    }
    return v;
};
const rng = (seed) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
function build() {
    const r = rng(17);
    const p = [{ x: -60, y: 140, w: 220, z: 0, d: 0, k: 0, c: -1, gone: 0 }];
    let x = 160, y = 140;
    for (let i = 1; i < N; i++) {
        const gap = 14 + r() * 14, w = 52 + r() * 46;
        let ny = Math.max(78, Math.min(150, y + (r() - 0.5) * 40));
        if (y - ny > 18)
            ny = y - 18;
        const q = r();
        x += gap;
        p.push({ x, y: ny, w, z: 0, d: Math.floor(r() * 4), k: i > 8 && i < 60 && q < 0.1 ? 1 : i > 8 && q > 0.8 ? 2 : 0, c: -1, gone: 0 });
        x += w;
        y = ny;
    }
    x += 22;
    p.push({ x, y: 126, w: 240, z: 0, d: 0, k: 0, c: -1, gone: 0 });
    const end = x + 240;
    p.forEach((q) => (q.z = Math.max(0, Math.min(4, Math.floor((q.x / end) * 5)))));
    const gems = Array.from({ length: 17 }, (_, k) => {
        const q = p[4 + Math.floor((k * 110) / 16)];
        return { x: q.x + q.w / 2, y: q.y - (k % 2 ? 34 : 14), got: false };
    });
    return { p, gems, end, cake: x + 120, cakeY: 126 };
}
const LEVEL = build();
const rs = rng(5);
const STARS = Array.from({ length: 46 }, () => ({ x: rs() * W, y: rs() * H * 0.55, p: rs() * 6 }));
const STARS7 = STARS.slice(0, 7);
const body = (x, y, f) => ({ x, y, vx: 0, vy: 0, g: true, f, t: 0 });
const fresh = () => ({
    her: body(40, 140, 1), him: body(18, 140, 1),
    gems: LEVEL.gems.map((g) => ({ ...g })), sparks: [], cam: 0, got: 0, t: 0,
    safe: { x: 40, y: 140 }, zone: -1, lag: 0, buf: 0, coy: 0, hj: 0, hc: 0, pj: false, done: false, fin: 0, nb: 0, rk: [], gr: [], msg: [], ft: 0,
});
function phys(b) {
    const py = b.y;
    b.vy = Math.min(6.5, b.vy + G);
    b.x = Math.max(-50, b.x + b.vx);
    b.y += b.vy;
    b.g = false;
    if (b.vy < 0)
        return null;
    for (const p of LEVEL.p) {
        if (p.gone <= 0 && b.x > p.x - 2 && b.x < p.x + p.w + 2 && py <= p.y + 1 && b.y >= p.y) {
            b.y = p.y;
            b.vy = 0;
            b.g = true;
            return p;
        }
    }
    return null;
}
const groundAhead = (x, y) => LEVEL.p.some((p) => p.gone <= 0 && x > p.x && x < p.x + p.w && p.y >= y - 4 && p.y <= y + 16);
const disc = (c, cx, cy, r) => {
    for (let dy = -r; dy <= r; dy++) {
        const w = Math.floor(Math.sqrt(r * r - dy * dy));
        c.fillRect(cx - w, cy + dy, w * 2 + 1, 1);
    }
};
function person(c, b, cam, her) {
    const x = Math.round(b.x - cam), y = Math.round(b.y);
    const fr = b.g && Math.abs(b.vx) > 0.4 ? Math.floor(b.t / 6) % 2 : 0;
    const hair = her ? "#5b3a2e" : "#3a2f2c", top = her ? "#d98a74" : "#6f93a8", legs = her ? "#7a5a64" : "#4b5a6a";
    if (b.g) {
        c.fillStyle = "#00000022";
        c.fillRect(x - 4, y, 8, 1);
    }
    c.fillStyle = legs;
    c.fillRect(x - 3, y - 4, 2, fr ? 3 : 4);
    c.fillRect(x + 1, y - 4, 2, fr ? 4 : 3);
    c.fillStyle = top;
    c.fillRect(x - 3, y - 9, 6, 5);
    if (her)
        c.fillRect(x - 4, y - 6, 8, 3);
    c.fillStyle = "#f1c9a5";
    c.fillRect(x - 3, y - 14, 6, 5);
    c.fillStyle = hair;
    c.fillRect(x - 3, y - 15, 6, 2);
    if (her) {
        c.fillRect(x - 4, y - 14, 1, 6);
        c.fillRect(x + 3, y - 14, 1, 6);
        c.fillStyle = "#f6e3a1";
        c.fillRect(x - b.f * 4 - 1, y - 16, 2, 2);
    }
    else
        c.fillRect(x - b.f * 3 - (b.f > 0 ? 0 : 0), y - 14, 1, 2);
    c.fillStyle = "#f2a6a6";
    c.fillRect(x - 3, y - 10, 1, 1);
    c.fillRect(x + 2, y - 10, 1, 1);
    c.fillStyle = "#3a2a2a";
    c.fillRect(x + b.f * 1 - 0, y - 12, 1, 1);
}
const FONT = {
    A: "010101111101101", B: "110101110101110", C: "011100100100011", D: "110101101101110", E: "111100110100111", F: "111100110100100",
    G: "011100101101011", H: "101101111101101", I: "111010010010111", J: "001001001101010", K: "101101110101101", L: "100100100100111",
    M: "101111111101101", N: "110101101101101", O: "010101101101010", P: "110101110100100", Q: "010101101111011", R: "110101110101101",
    S: "011100010001110", T: "111010010010010", U: "101101101101111", V: "101101101101010", W: "101101111111101", X: "101101010101101",
    Y: "101101010010010", Z: "111001010100111", "0": "111101101101111", "1": "010110010010111", "2": "110001010100111", "3": "110001010001110",
    "4": "101101111001001", "5": "111100110001110", "6": "011100111101111", "7": "111001010010010", "8": "111101111101111", "9": "111101111001110",
    "!": "010010010000010", ",": "000000000010100", "'": "010010000000000", ".": "000000000000010", "?": "110001010000010", "-": "000000111000000",
};
const wrap = (t, n) => {
    const L = [];
    let l = "";
    for (const w of t.toUpperCase().split(" ")) {
        if ((l + " " + w).trim().length > n) {
            L.push(l);
            l = w;
        }
        else
            l = (l + " " + w).trim();
    }
    if (l)
        L.push(l);
    return L;
};
const PT = new Map();
function ptextSprite(t, sc, col, line) {
    const key = sc + col + line + t;
    let cv = PT.get(key);
    if (cv) return cv;
    cv = document.createElement("canvas");
    cv.width = t.length * 4 * sc + 2;
    cv.height = 5 * sc + 2;
    const g = cv.getContext("2d");
    const pass = (ox, oy, fill) => {
        g.fillStyle = fill;
        for (let n = 0; n < t.length; n++) {
            const gl = FONT[t[n]];
            if (!gl) continue;
            for (let i = 0; i < 15; i++)
                if (gl[i] === "1")
                    g.fillRect(1 + n * 4 * sc + (i % 3) * sc + ox, 1 + Math.floor(i / 3) * sc + oy, sc, sc);
        }
    };
    pass(-1, 0, line); pass(1, 0, line); pass(0, -1, line); pass(0, 1, line); pass(0, 0, col);
    if (PT.size > 200) PT.clear();
    PT.set(key, cv);
    return cv;
}
function ptext(c, t, cx, cy, sc, col, line) {
    const x0 = Math.round(cx - (t.length * 4 * sc - sc) / 2);
    c.drawImage(ptextSprite(t, sc, col, line), x0 - 1, cy - 1);
}
function finale(c, s) {
    const PINK = "#ffd1e1", EDGE = "#e58aa8";
    if (s.fin === 1) {
        c.globalAlpha = 0.75 + 0.25 * Math.sin(s.t * 0.08);
        ptext(c, "MAKE A WISH,", 160, 34, 3, PINK, EDGE);
        ptext(c, "THEN JUMP TO BLOW", 160, 56, 2, PINK, EDGE);
        ptext(c, "OUT THE CANDLES", 160, 70, 2, PINK, EDGE);
        c.globalAlpha = 1;
        return;
    }
    const a = s.t - s.ft - 70;
    if (s.fin !== 2 || a < 0 || !s.gr.length)
        return;
    const n = Math.floor(a / 90);
    for (let k = Math.max(0, n - 2); k <= n; k++) {
        const age = a - k * 90, tx = s.gr[k % s.gr.length];
        if (age >= 216)
            continue;
        c.globalAlpha = Math.max(0, Math.min(1, age / 14, (216 - age) / 40));
        ptext(c, tx, 160 + [-6, 8, 0][k % 3], Math.round([30, 58, 86][k % 3] - age * 0.1 + (age < 10 ? 10 - age : 0)), tx.length > 21 ? 2 : 3, PINK, EDGE);
    }
    c.globalAlpha = Math.max(0, Math.min(1, (a - 90) / 30));
    const y0 = 168 - s.msg.length * 14;
    s.msg.forEach((l, i) => ptext(c, l, 160, y0 + i * 14, 2, PINK, EDGE));
    c.globalAlpha = 1;
}
const HEART = ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"];
const HS = new Map();
function heart(c, x, y, col) {
    let cv = HS.get(col);
    if (!cv) {
        cv = document.createElement("canvas");
        cv.width = 7;
        cv.height = 6;
        const g = cv.getContext("2d");
        g.fillStyle = col;
        HEART.forEach((row, r) => [...row].forEach((ch, q) => { if (ch === "1") g.fillRect(q, r, 1, 1); }));
        if (HS.size > 300) HS.clear();
        HS.set(col, cv);
    }
    c.drawImage(cv, x - 3, y - 3);
}
let GARL = null;
function garland() {
    if (GARL) return GARL;
    GARL = document.createElement("canvas");
    GARL.width = 48;
    GARL.height = 7;
    const g = GARL.getContext("2d");
    g.fillStyle = "#4a3329";
    for (let x = 0; x < 48; x += 2)
        g.fillRect(x, Math.round(Math.abs(Math.sin((x / 48) * Math.PI)) * 6), 2, 1);
    return GARL;
}
const BK = ["#c9785f", "#6f93a8", "#e0c27c", "#8aa86b", "#a47b9a"];
const bk = (n) => BK[((n % 5) + 5) % 5];
const PIC = [["#cfe0e6", "#8fae6e", "#fbe6bd"], ["#f3cdbb", "#a8706a", "#fff1de"], ["#d9d2ea", "#6f93a8", "#f7e3a6"]];
function furn(c, t, x, col, lamp, dim) {
    const b = H - 18;
    c.fillStyle = col;
    if (t === 0) {
        c.fillRect(x, b - 12, 44, 12);
        c.fillRect(x, b - 22, 44, 10);
        c.fillRect(x - 4, b - 16, 6, 16);
        c.fillRect(x + 42, b - 16, 6, 16);
        c.fillStyle = mix(col, "#ffffff", 0.18);
        c.fillRect(x + 4, b - 16, 16, 4);
        c.fillRect(x + 24, b - 16, 16, 4);
        c.fillStyle = "#d9a877";
        c.fillRect(x + 30, b - 30, 8, 8);
        c.fillRect(x + 30, b - 32, 2, 2);
        c.fillRect(x + 36, b - 32, 2, 2);
        c.fillStyle = "#f1d3b0";
        c.fillRect(x + 32, b - 25, 4, 3);
    }
    else if (t === 1) {
        c.fillRect(x + 6, b - 40, 2, 40);
        c.fillRect(x, b - 2, 14, 2);
        c.fillStyle = lamp;
        c.fillRect(x + 1, b - 52, 12, 12);
        glow(c, x + 7, b - 46, 24, lamp, 0.3 * dim);
    }
    else if (t === 2) {
        c.fillRect(x + 2, b - 10, 10, 10);
        c.fillStyle = mix(col, "#6f9a5a", 0.6);
        c.fillRect(x, b - 24, 5, 14);
        c.fillRect(x + 9, b - 22, 5, 12);
        c.fillRect(x + 4, b - 30, 6, 20);
    }
    else {
        c.fillRect(x, b - 46, 30, 46);
        for (let r = 0; r < 4; r++)
            for (let q = 0; q < 5; q++) {
                c.fillStyle = bk(r * 3 + q);
                c.fillRect(x + 2 + q * 5, b - 43 + r * 11, 4, 8);
            }
    }
}
const FC = ["#ffd98a", "#ffb3c7", "#a8e6dc", "#f1ead9", "#ffc08a", "#d4c2ff"];
const D17 = [["010", "110", "010", "010", "111"], ["111", "001", "010", "010", "010"]];
const FL = Array.from({ length: 26 }, () => ({ x: rs() * W, y: 60 + rs() * 100, p: rs() * 6 }));
function boom(s, x, y, kind, c) {
    const add = (vx, vy, col, l) => s.sparks.push({ x, y, vx, vy, l, c: col });
    if (kind === 1) {
        for (let i = 0; i < 64; i++) {
            const t = (i / 64) * Math.PI * 2;
            add(0.04 * 16 * Math.sin(t) ** 3, -0.04 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)), "#ffb3c7", 95);
        }
    }
    else if (kind === 2) {
        D17.forEach((d, n) => d.forEach((row, r) => [...row].forEach((ch, q) => {
            if (ch === "1")
                for (let j = 0; j < 3; j++)
                    add((n * 4 - 3.5 + q) * 0.24 + (Math.random() - 0.5) * 0.04, (r - 2) * 0.24 + (Math.random() - 0.5) * 0.04, "#ffd98a", 95);
        })));
    }
    else {
        for (let i = 0; i < 46; i++) {
            const a = (i / 46) * 6.283, sp = 0.8 + (i % 2) * 0.7 + Math.random() * 0.2;
            add(Math.cos(a) * sp, Math.sin(a) * sp, i % 5 ? c : "#f1ead9", 70 + Math.random() * 25);
        }
    }
    SND.noise(0.5, 0.05, 900);
    SND.tone(150, 0.35, "sine", 0.06, 50);
    SND.tone(1000 + Math.random() * 600, 0.9, "sine", 0.025);
}
function fireworks(s) {
    s.nb = Math.min(1, s.nb + 0.012);
    if (s.nb > 0.4 && s.t % 14 === 0) {
        const n = s.t / 14, k = n % 9 === 4 ? 1 : n % 9 === 8 ? 2 : 0;
        s.rk.push({ x: k ? s.cam + W / 2 : s.cam + 40 + Math.random() * (W - 80), y: H + 4, ty: k ? 62 : 24 + Math.random() * 60, c: FC[n % 6], k });
    }
    let n = 0;
    for (const r of s.rk) {
        r.y -= 3.4;
        if (r.y > r.ty) s.rk[n++] = r;
        else boom(s, r.x, r.y, r.k, r.c);
    }
    s.rk.length = n;
}
const GL = new Map();
function glowSprite(r, col) {
    const key = r + col;
    let cv = GL.get(key);
    if (cv) return cv;
    cv = document.createElement("canvas");
    cv.width = cv.height = r * 2 + 1;
    const g = cv.getContext("2d");
    g.globalCompositeOperation = "lighter";
    g.fillStyle = col;
    for (let k = r; k > 2; k -= 3) {
        g.globalAlpha = 0.3 * (1 - k / r) * 0.5 + 0.01;
        disc(g, r, r, k);
    }
    GL.set(key, cv);
    return cv;
}
function glow(c, x, y, r, col, a) {
    c.globalCompositeOperation = "lighter";
    c.globalAlpha = Math.min(1, a / 0.3);
    c.drawImage(glowSprite(r, col), Math.round(x) - r, Math.round(y) - r);
    c.globalCompositeOperation = "source-over";
    c.globalAlpha = 1;
}
let VIG = null;
function vignette() {
    if (VIG) return VIG;
    VIG = document.createElement("canvas");
    VIG.width = W;
    VIG.height = H;
    const g = VIG.getContext("2d");
    g.fillStyle = "#1a1020";
    for (let i = 0; i < 4; i++) {
        g.globalAlpha = 0.07 * (4 - i);
        g.fillRect(0, i * 3, W, 3);
        g.fillRect(0, H - (i + 1) * 3, W, 3);
        g.fillRect(i * 3, 0, 3, H);
        g.fillRect(W - (i + 1) * 3, 0, 3, H);
    }
    return VIG;
}
function lights(c, s, cam, night) {
    const dim = 0.3 + night * 0.7;
    for (const p of LEVEL.p) {
        const sx = p.x + p.w - 8 - cam;
        if (p.d === 3 && p.gone <= 0 && sx > -30 && sx < W + 30)
            glow(c, sx, p.y - 13, 24, ZONES[p.z].lamp, 0.3 * dim);
    }
    for (const g of s.gems) {
        const gx = g.x - cam;
        if (!g.got && gx > -14 && gx < W + 14)
            glow(c, gx, g.y, 12, "#ffb3c7", 0.25);
    }
    glow(c, s.her.x - cam, s.her.y - 8, 20, "#ffd9a0", 0.12 * dim);
    glow(c, s.him.x - cam, s.him.y - 8, 16, "#ffe6b8", 0.08 * dim);
    if (s.fin < 2 && Math.abs(LEVEL.cake - cam - W / 2) < W / 2 + 24)
        glow(c, LEVEL.cake - cam, LEVEL.cakeY - 26, 22, "#ffd98a", 0.25);
    c.fillStyle = "#f6e7a0";
    for (const f of FL) {
        c.globalAlpha = (0.2 + night * 0.8) * (0.5 + 0.5 * Math.sin(s.t * 0.05 + f.p));
        c.fillRect(Math.round((((f.x - cam * 0.5 + Math.sin(s.t * 0.01 + f.p) * 8) % W) + W) % W), Math.round(f.y + Math.sin(s.t * 0.02 + f.p) * 6), 2, 2);
    }
    c.globalAlpha = 1;
    c.fillStyle = "#fff1de";
    for (const r of s.rk)
        c.fillRect(Math.round(r.x - cam), Math.round(r.y), 2, 4);
    if (s.zone === 2 && s.t % 420 < 150) {
        c.globalAlpha = 0.5;
        for (let i = 0; i < 7; i++)
            c.fillRect((((i * 53 - s.t * 5) % W) + W) % W, 20 + i * 21, 14, 1);
    }
    if (s.fin === 2) {
        c.globalAlpha = 1;
        for (let i = 0; i < 9; i++) {
            const x = ((i * 37 + 20) % (W - 20)) + Math.sin(s.t * 0.01 + i) * 6, y = H - ((s.t * 0.35 + i * 29) % (H + 24));
            glow(c, x, y, 11, "#ffb867", 0.3 * s.nb);
            c.fillStyle = "#ffd58f";
            c.fillRect(Math.round(x) - 2, Math.round(y) - 3, 5, 6);
            c.fillStyle = "#e89a5a";
            c.fillRect(Math.round(x) - 2, Math.round(y) + 3, 5, 1);
        }
    }
    c.globalAlpha = 1;
    c.drawImage(vignette(), 0, 0);
}
function draw(c, s) {
    const cam = Math.round(s.cam), t = s.t;
    const zf = (Math.max(0, cam + W * 0.5) / LEVEL.end) * 5, zi = Math.min(4, Math.floor(zf));
    const zt = zi < 4 ? Math.round(Math.max(0, Math.min(1, (zf - zi - 0.6) / 0.4)) * 48) / 48 : 0;
    const A = ZONES[zi], B = ZONES[Math.min(4, zi + 1)];
    const night = Math.max(s.nb, Math.min(1, (zf - 2.7) / 1.3));
    const sky = [0, 1, 2].map((i) => mix(A.sky[i], B.sky[i], zt));
    const pc = cam * 0.6, fc = cam * 0.8, dim = 0.3 + night * 0.7;
    const wall = mix(A.wall, B.wall, zt), wain = mix(A.wain, B.wain, zt);
    c.fillStyle = wall;
    c.fillRect(0, 0, W, H);
    c.fillStyle = mix(wall, "#ffffff", 0.07);
    for (let x = -(Math.round(pc) % 16); x < W; x += 16)
        c.fillRect(x, 0, 8, H);
    for (let k = Math.floor(pc / 150) - 1; k * 150 - pc < W; k++) {
        const x = Math.round(k * 150 + 40 - pc), m = ((k % 3) + 3) % 3;
        if (m === 2) {
            c.fillStyle = mix(wain, "#000000", 0.2);
            c.fillRect(x - 2, H - 80, 30, 62);
            c.fillStyle = "#8a5a3c";
            c.fillRect(x, H - 78, 26, 60);
            c.fillStyle = "#a47048";
            c.fillRect(x + 3, H - 74, 20, 22);
            c.fillRect(x + 3, H - 48, 20, 26);
            c.fillStyle = "#e0c27c";
            c.fillRect(x + 20, H - 50, 2, 3);
        }
        else {
            const wy = 26, ww = 34, wh = 44;
            for (let i = 0; i < 3; i++) {
                c.fillStyle = sky[i];
                c.fillRect(x, wy + Math.round((i * wh) / 3), ww, Math.ceil(wh / 3));
            }
            c.fillStyle = mix(A.near, B.near, zt);
            c.fillRect(x, wy + wh - 8, ww, 8);
            c.fillStyle = "#fff4d6";
            for (const st of STARS7) {
                c.globalAlpha = night * (0.5 + 0.5 * Math.sin(t * 0.04 + st.p + k));
                c.fillRect(x + 2 + Math.floor(st.x % 30), wy + 2 + Math.floor(st.y % 30), 1, 1);
            }
            c.globalAlpha = 1;
            c.fillStyle = "#f1ead9";
            c.fillRect(x - 2, wy - 2, ww + 4, 2);
            c.fillRect(x - 2, wy + wh, ww + 4, 2);
            c.fillRect(x - 2, wy, 2, wh);
            c.fillRect(x + ww, wy, 2, wh);
            c.fillRect(x + ww / 2 - 1, wy, 2, wh);
            c.fillRect(x - 4, wy + wh + 2, ww + 8, 3);
            c.fillStyle = mix(A.curt, B.curt, zt);
            c.fillRect(x - 9, wy - 4, 7, wh + 12);
            c.fillRect(x + ww + 2, wy - 4, 7, wh + 12);
            c.fillStyle = mix(A.curt, "#000000", 0.18);
            for (let i = 1; i < 7; i += 3) {
                c.fillRect(x - 9 + i, wy - 4, 1, wh + 12);
                c.fillRect(x + ww + 2 + i, wy - 4, 1, wh + 12);
            }
        }
        const px = Math.round(k * 150 + 105 - pc), q = PIC[((k % 3) + 3) % 3];
        c.fillStyle = "#6b4a37";
        c.fillRect(px, 34, 18, 22);
        c.fillStyle = q[0];
        c.fillRect(px + 2, 36, 14, 18);
        c.fillStyle = q[1];
        c.fillRect(px + 2, 46, 14, 8);
        c.fillStyle = q[2];
        c.fillRect(px + 8, 40, 4, 4);
        heart(c, px + 36, 76, mix(wall, "#ffffff", 0.5));
        heart(c, px + 52, 92, mix(wall, "#ffffff", 0.35));
    }
    c.fillStyle = wain;
    c.fillRect(0, H - 56, W, 38);
    c.fillStyle = mix(wain, "#ffffff", 0.25);
    c.fillRect(0, H - 56, W, 2);
    c.fillStyle = mix(wain, "#000000", 0.15);
    for (let x = -(Math.round(pc) % 32); x < W; x += 32)
        c.fillRect(x, H - 52, 1, 30);
    for (let k = Math.floor(fc / 100) - 1; k * 100 - fc < W; k++) {
        furn(c, ((k % 4) + 4) % 4, Math.round(k * 100 + 20 - fc), mix(wain, "#000000", 0.28), A.lamp, dim);
    }
    const fl = mix(A.floor, B.floor, zt);
    c.fillStyle = fl;
    c.fillRect(0, H - 18, W, 18);
    c.fillStyle = mix(fl, "#000000", 0.2);
    c.fillRect(0, H - 18, W, 2);
    for (let x = -(Math.round(cam) % 24); x < W; x += 24)
        c.fillRect(x, H - 16, 1, 16);
    for (let k = Math.floor(cam / 220) - 1; k * 220 - cam < W; k++) {
        const x = Math.round(k * 220 + 60 - cam);
        c.fillStyle = mix(A.curt, "#ffffff", 0.4);
        c.fillRect(x, H - 14, 70, 10);
        c.fillStyle = mix(A.curt, "#ffffff", 0.65);
        c.fillRect(x + 4, H - 12, 62, 6);
    }
    c.fillStyle = mix(wain, "#000000", 0.3);
    c.fillRect(0, 0, W, 9);
    c.fillStyle = wain;
    c.fillRect(0, 9, W, 2);
    for (let gx = -(((Math.round(pc) % 48) + 48) % 48); gx < W; gx += 48)
        c.drawImage(garland(), gx, 13);
    for (let k = Math.floor(pc / 24); k * 24 - pc < W + 24; k++) {
        const x = Math.round(k * 24 - pc), y = 13 + Math.round(Math.abs(Math.sin(((k * 24) / 48) * Math.PI)) * 6);
        glow(c, x, y + 3, 6, FC[k % 6], 0.3 * (0.5 + night * 0.5));
        c.fillStyle = FC[k % 6];
        c.fillRect(x - 1, y + 1, 3, 3);
        if (k % 4 === 1) {
            c.fillStyle = "#e8d9a8";
            c.fillRect(x, y + 4, 1, 8);
            c.fillStyle = FC[(k + 2) % 6];
            c.fillRect(x - 2, y + 13, 5, 1);
            c.fillRect(x, y + 11, 1, 5);
            c.fillRect(x - 1, y + 12, 3, 3);
        }
    }
    c.fillStyle = "#0b1030";
    c.globalAlpha = s.nb * 0.5;
    c.fillRect(0, 0, W, H);
    c.globalAlpha = 1;
    for (const p of LEVEL.p) {
        const sx = Math.round(p.x - cam);
        if (sx > W || sx + p.w < 0 || p.gone > 0)
            continue;
        const Z = ZONES[p.z], w = Math.round(p.w), y = Math.round(p.y);
        c.fillStyle = Z.body;
        c.fillRect(sx, y + 3, w, 9);
        for (let i = 3; i < w - 2; i += 5) {
            c.fillStyle = bk(Math.floor(p.x / 5) + Math.floor(i / 5));
            c.fillRect(sx + i, y + 5, 3, 6);
        }
        c.fillStyle = Z.edge;
        c.fillRect(sx + 2, y + 12, 2, 5);
        c.fillRect(sx + w - 4, y + 12, 2, 5);
        c.fillStyle = Z.top;
        c.fillRect(sx, y, w, 4);
        c.fillStyle = Z.edge;
        c.fillRect(sx, y + 3, w, 1);
        if (p.k === 1) {
            c.fillStyle = Z.edge;
            for (let i = 6; i < w - 4; i += 11)
                c.fillRect(sx + i, y + 4 + (p.c > 0 ? t % 4 : 0), 1, 6);
        }
        if (p.k === 2) {
            c.fillStyle = "#d98e9a";
            c.fillRect(sx + (w >> 1) - 4, y - 3, 8, 3);
            c.fillStyle = "#f2b8c0";
            c.fillRect(sx + (w >> 1) - 5, y - 5, 10, 2);
        }
        if (p.d === 1) {
            c.fillStyle = "#6f93a8";
            c.fillRect(sx + 6, y - 3, 9, 3);
            c.fillStyle = "#d9826a";
            c.fillRect(sx + 7, y - 6, 8, 3);
            c.fillStyle = "#e0c27c";
            c.fillRect(sx + 8, y - 8, 6, 2);
        }
        if (p.d === 2) {
            c.fillStyle = "#c9785f";
            c.fillRect(sx + 7, y - 5, 6, 5);
            c.fillStyle = "#6f9a5a";
            c.fillRect(sx + 6, y - 10, 3, 5);
            c.fillRect(sx + 11, y - 9, 3, 4);
            c.fillRect(sx + 8, y - 12, 4, 7);
        }
        if (p.d === 0 && p.k === 0 && Math.floor(p.x) % 3 === 0 && p.w > 56) {
            const br = Math.sin(t * 0.05) > 0 ? 0 : 1;
            c.fillStyle = "#e8b98a";
            c.fillRect(sx + 8, y - 4 + br, 9, 4 - br);
            c.fillRect(sx + 15, y - 6, 5, 5);
            c.fillRect(sx + 5, y - 2, 3, 1);
            c.fillStyle = "#c98f5e";
            c.fillRect(sx + 15, y - 8, 1, 2);
            c.fillRect(sx + 19, y - 8, 1, 2);
            c.fillStyle = "#3a2a2a";
            c.fillRect(sx + 16, y - 4, 1, 1);
            c.fillRect(sx + 18, y - 4, 1, 1);
            c.fillStyle = "#f1ead9";
            c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 0.06);
            c.fillRect(sx + 22, y - 12 - ((t >> 4) % 3), 2, 2);
            c.globalAlpha = 1;
        }
        if (p.d === 3) {
            c.fillStyle = Z.edge;
            c.fillRect(sx + w - 8, y - 12, 1, 12);
            c.fillStyle = Z.lamp;
            c.fillRect(sx + w - 10, y - 16, 5, 5);
        }
    }
    s.gems.forEach((g) => {
        if (g.got)
            return;
        const sx = Math.round(g.x - cam), gy = Math.round(g.y + Math.sin(t * 0.06 + g.x) * 2);
        if (sx < -6 || sx > W + 6)
            return;
        heart(c, sx, gy, "#f58aa5");
        c.fillStyle = "#ffd6e0";
        c.fillRect(sx - 2, gy - 2, 1, 1);
    });
    const cx = Math.round(LEVEL.cake - cam), by = LEVEL.cakeY;
    c.fillStyle = "#efc2b4";
    c.fillRect(cx - 9, by - 8, 18, 8);
    c.fillStyle = "#fff1de";
    c.fillRect(cx - 9, by - 10, 18, 2);
    c.fillStyle = "#e5a39b";
    c.fillRect(cx - 6, by - 15, 12, 5);
    c.fillStyle = "#fff1de";
    c.fillRect(cx - 6, by - 17, 12, 2);
    c.fillStyle = "#9ec3d6";
    c.fillRect(cx - 3, by - 23, 2, 6);
    c.fillStyle = "#e8b86a";
    c.fillRect(cx + 1, by - 23, 2, 6);
    if (s.fin < 2) {
        c.fillStyle = "#ffd98a";
        c.fillRect(cx - 3, by - 26 - (t % 30 < 15 ? 0 : 1), 2, 3);
        c.fillRect(cx + 1, by - 26 - (t % 24 < 12 ? 0 : 1), 2, 3);
    }
    const { her, him } = s;
    const x1 = her.x + her.f * 3 - cam, y1 = her.y - 5, x2 = him.x + him.f * 3 - cam, y2 = him.y - 5;
    const sag = 4 + Math.max(0, CHAIN - Math.hypot(x1 - x2, y1 - y2)) * 0.5;
    for (let i = 0; i <= 8; i++) {
        const u = i / 8;
        c.fillStyle = i % 2 ? "#f2a6b8" : "#ffd0dc";
        c.fillRect(Math.round(x1 + (x2 - x1) * u), Math.round(y1 + (y2 - y1) * u + sag * 4 * u * (1 - u)), 2, 2);
    }
    person(c, him, cam, false);
    person(c, her, cam, true);
    for (const k of s.sparks) {
        c.globalAlpha = Math.min(1, k.l / 30);
        c.fillStyle = k.c;
        c.fillRect(Math.round(k.x - cam), Math.round(k.y), 2, 2);
    }
    c.globalAlpha = 1;
    lights(c, s, cam, night);
    finale(c, s);
}

/* ------------------------------------------------------------------ */
/*  Game overlay styles (pink pixel frame, same look as the site)      */
/* ------------------------------------------------------------------ */
const GAME_CSS = `
.ct-wrap{max-width:960px;margin:0 auto}
.ct-frame{background:#222c47;border:4px solid var(--line);box-shadow:6px 6px 0 var(--shd);line-height:0}
.ct-stage{position:relative;aspect-ratio:16/9;overflow:hidden;line-height:1.4;color:var(--ink);user-select:none;-webkit-user-select:none}
.ct-canvas{width:100%;height:100%;display:block;image-rendering:pixelated}
.ct-hud,.ct-mute{position:absolute;top:3%;display:flex;align-items:center;gap:.55em;min-height:32px;background:var(--pink-lt);color:var(--ink);border:3px solid var(--line);padding:.15em .7em;font-size:clamp(11px,2.1vw,16px);font-weight:600;line-height:1.2;box-shadow:3px 3px 0 rgba(42,31,77,.35)}
.ct-hud{left:2.5%}
.ct-mute{right:2.5%;cursor:pointer}
.ct-banner{position:absolute;top:14%;left:0;right:0;padding:0 4%;text-align:center;font-family:'Press Start 2P',monospace;font-size:clamp(9px,2.3vw,20px);line-height:1.5;color:#fff1de;text-shadow:2px 2px 0 #4B3770;animation:ct-fade 3.4s both;pointer-events:none}
@keyframes ct-fade{0%{opacity:0}18%,75%{opacity:1}100%{opacity:0}}
.ct-at{position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;will-change:transform}
.ct-bub{position:absolute;left:0;top:0;transform:translate(-50%,calc(-100% - 8px));background:var(--pink-lt);color:var(--ink);border:3px solid var(--line);padding:.3em .7em;font-size:clamp(10px,1.9vw,15px);width:max-content;max-width:min(62vw,240px);text-align:center;line-height:1.25;box-shadow:3px 3px 0 rgba(42,31,77,.35)}
.ct-bub small{display:block;color:var(--rose);font-size:.85em}
.ct-bub:after{content:"";position:absolute;left:50%;top:100%;margin-left:-6px;border:6px solid transparent;border-top-color:var(--line)}
.ct-note{position:absolute;left:50%;bottom:6%;transform:translateX(-50%);background:var(--pink-lt);color:var(--ink);border:3px solid var(--line);padding:.45em .9em;font-size:clamp(11px,2.1vw,17px);text-align:center;width:max-content;max-width:88%;line-height:1.3;animation:ct-fade 4.6s both;pointer-events:none;box-shadow:3px 3px 0 rgba(42,31,77,.35)}
.ct-prog{position:absolute;left:0;right:0;bottom:0;height:4px;background:rgba(255,233,240,.25);pointer-events:none}
.ct-prog div{height:100%;background:var(--blush);transform-origin:0 50%;transform:scaleX(0);will-change:transform}
.ct-ov{position:absolute;inset:0;display:grid;place-items:center;background:rgba(75,55,112,.55);padding:3%}
.ct-card{background:var(--pink-lt);border:4px solid var(--line);box-shadow:6px 6px 0 var(--shd);padding:clamp(12px,3vw,28px);max-width:min(480px,92%);text-align:center;color:var(--ink);line-height:1.35;font-size:clamp(12px,2.2vw,18px)}
.ct-card h2{font-family:'Press Start 2P',monospace;font-weight:400;font-size:clamp(12px,3vw,24px);line-height:1.5;margin:0 0 .6em;text-shadow:.1em .1em 0 #fff}
.ct-card p{margin:.4em 0}
.ct-card .btn{min-height:40px;padding:8px 18px;font-size:clamp(13px,2.4vw,18px);margin-top:.8em}
.ct-again{display:flex;justify-content:center;margin-top:24px}
.ct-polaroid{position:absolute;left:3%;top:14%;width:20%;aspect-ratio:1;object-fit:cover;image-rendering:auto;background:var(--pink-lt);border:3px solid var(--line);padding:.35em .35em 1.2em;animation:ct-fade 3s both;pointer-events:none}
@media (max-width:520px){.ct-hud,.ct-mute{min-height:24px;border-width:2px;padding:.1em .5em;box-shadow:2px 2px 0 rgba(42,31,77,.35);top:2.5%}}
.ct-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ct-pad{display:none;justify-content:space-between;align-items:center;gap:12px;margin-top:24px}
.ct-pad .grp{display:flex;gap:16px}
@media (pointer:coarse){.ct-pad{display:flex}}
.ct-b{width:72px;height:72px;padding:0;display:grid;place-items:center;border:4px solid var(--line);background:var(--pink-lt);color:var(--ink);box-shadow:5px 5px 0 var(--line);cursor:pointer;touch-action:none;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none}
.ct-b:active{transform:translate(5px,5px);box-shadow:0 0 0 var(--line);background:var(--pink-dk)}
.ct-help{margin:22px auto 0;max-width:36em;text-align:center;font-size:17px;line-height:1.5}
.ct-kb{display:inline}.ct-touch{display:none}
@media (pointer:coarse){.ct-kb{display:none}.ct-touch{display:inline}}
.ct-credit{display:flex;align-items:center;justify-content:center;gap:10px;margin:16px 0 0;font-size:17px;color:var(--rose)}
@media (prefers-reduced-motion:reduce){
  .bd .ct-banner,.bd .ct-note,.bd .ct-polaroid{animation:none !important}
}
`;

const STEP_MS = 1000 / 60;
const NO_KEYS = () => ({ l: false, r: false, j: false });

function ChainedAdventure({ herName = "love", hisName = "me", title = "Tied Together", finalMessage = DEFAULT_MESSAGE, nickname = "Bebii", photos = [] }) {
  const cv = useRef(null);
  const stage = useRef(null);
  const at = useRef(null);
  const prog = useRef(null);
  const st = useRef(null);
  if (st.current === null) st.current = fresh();
  const keys = useRef(NO_KEYS());
  const timers = useRef({});
  const [phase, setPhase] = useState("title");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const live = useRef(false); // the section is on screen
  const [count, setCount] = useState(0);
  const [bubble, setBubble] = useState("");
  const [note, setNote] = useState("");
  const [banner, setBanner] = useState("");
  const [wish, setWish] = useState(false);
  const [muted, setMuted] = useState(false);
  const [gn, setGn] = useState(0);
  const greets = useMemo(
    () => [`Happy Birthday ${nickname}!`, "Happiest Birthday!", "Happy 17th Birthday!", `I love you, ${nickname}!`, "Happy Golden Birthday!", "Make every wish come true!"],
    [nickname]
  );

  useEffect(() => {
    if (phase !== "end") return;
    setGn(0);
    const iv = window.setInterval(() => setGn((n) => n + 1), 1500);
    return () => window.clearInterval(iv);
  }, [phase]);

  const flash = useCallback((k, set, v, ms) => {
    set(v);
    window.clearTimeout(timers.current[k]);
    timers.current[k] = window.setTimeout(() => set(""), ms);
  }, []);

  // Keyboard: only while the game is playing AND on screen, and never while typing elsewhere on the page.
  useEffect(() => {
    const m = { ArrowLeft: "l", KeyA: "l", ArrowRight: "r", KeyD: "r", ArrowUp: "j", KeyW: "j", Space: "j" };
    const typing = (e) => {
      const t = e.target;
      return !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    };
    const dn = (e) => {
      const k = m[e.code];
      if (!k || phaseRef.current !== "play" || !live.current || typing(e)) return;
      e.preventDefault();
      keys.current[k] = true;
    };
    const up = (e) => { const k = m[e.code]; if (k) keys.current[k] = false; };
    const off = () => { keys.current = NO_KEYS(); };
    window.addEventListener("keydown", dn);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", off);
    return () => { window.removeEventListener("keydown", dn); window.removeEventListener("keyup", up); window.removeEventListener("blur", off); };
  }, []);

  useEffect(() => {
    const canvas = cv.current;
    const stageEl = stage.current;
    const c = canvas && canvas.getContext("2d", { alpha: false });
    if (!canvas || !stageEl || !c) return;
    c.imageSmoothingEnabled = false;
    let raf = 0, last = 0, acc = 0, running = false, force = true, onScreen = false;
    let scale = stageEl.clientWidth / W, lastP = -1, lastT = "";

      const puff = (x, y, col, n) => {
              for (let i = 0; i < n; i++)
                  st.current.sparks.push({ x, y, vx: (Math.random() - 0.5) * 1.6, vy: -Math.random() * 1.4, l: 34, c: col });
          };
          const rescue = (s, line) => {
              s.him.x = s.her.x - s.her.f * 14;
              s.him.y = s.her.y;
              s.him.vx = 0;
              s.him.vy = 0;
              s.him.g = true;
              s.lag = 0;
              puff(s.him.x, s.him.y - 6, "#f1ead9", 8);
              flash("b", setBubble, line, 3000);
              SND.tone(520, 0.5, "sine", 0.06, 392);
          };
          const blow = (s) => {
              s.fin = 2;
              s.ft = s.t;
              setWish(false);
              SND.noise(0.6, 0.08, 700);
              [523, 659, 784, 1047].forEach((f, i) => window.setTimeout(() => SND.tone(f, 1.8, "sine", 0.06), i * 140));
              timers.current.end = window.setTimeout(() => setPhase("end"), 1200);
          };
          const step = () => {
              const s = st.current, { her, him } = s, k = keys.current;
              s.t++;
              her.t++;
              him.t++;
              for (const p of LEVEL.p) {
                  if (p.c > 0 && --p.c === 0) {
                      p.c = -1;
                      p.gone = 200;
                  }
                  else if (p.gone > 0)
                      p.gone--;
              }
              if (phaseRef.current === "title")
                  return;
              const dir = (k.r ? 1 : 0) - (k.l ? 1 : 0);
              her.vx += (dir * RUN - her.vx) * 0.22;
              if (s.zone === 2 && s.t % 420 < 150)
                  her.vx -= 0.07;
              if (dir)
                  her.f = dir > 0 ? 1 : -1;
              const dist = Math.hypot(her.x - him.x, her.y - him.y);
              if (dist > CHAIN && Math.sign(her.vx) === Math.sign(her.x - him.x))
                  her.vx *= 0.5;
              if (k.j && !s.pj) {
                  s.buf = 7;
                  if (s.fin === 1)
                      blow(s);
              }
              s.pj = k.j;
              if (her.g)
                  s.coy = 6;
              else if (s.coy > 0)
                  s.coy--;
              if (s.buf > 0)
                  s.buf--;
              if (s.buf > 0 && s.coy > 0) {
                  her.vy = JUMP;
                  her.g = false;
                  s.buf = 0;
                  s.coy = 0;
                  s.hj = 9;
                  SND.tone(330, 0.16, "sine", 0.07, 520);
              }
              if (!k.j && her.vy < -2)
                  her.vy += 0.25;
              const pv = her.vy, hp = phys(her);
              if (hp) {
                  if (pv > 3) {
                      puff(her.x, her.y, "#f1ead9", 4);
                      SND.noise(0.08, 0.03, 300);
                  }
                  if (hp.k === 1) {
                      if (hp.c < 0) {
                          hp.c = 40;
                          SND.noise(0.2, 0.05, 500);
                      }
                  }
                  else
                      s.safe = { x: Math.min(Math.max(her.x, hp.x + 8), hp.x + hp.w - 8), y: hp.y };
                  if (hp.k === 2) {
                      her.vy = -8.4;
                      her.g = false;
                      SND.tone(260, 0.3, "sine", 0.08, 760);
                  }
              }
              const dx = her.x - her.f * 18 - him.x, want = Math.abs(dx) > 5 ? Math.sign(dx) : 0;
              him.vx += (want * RUN * (dist > CHAIN ? 1.15 : 0.92) - him.vx) * 0.2;
              him.f = want ? (want > 0 ? 1 : -1) : her.x > him.x ? 1 : -1;
              if (s.hc > 0)
                  s.hc--;
              let jump = false;
              if (s.hj > 0 && --s.hj === 0)
                  jump = true;
              if (want && !groundAhead(him.x + him.f * 9, him.y))
                  jump = true;
              if (her.y < him.y - 10 && Math.abs(her.x - him.x) < 50)
                  jump = true;
              if (jump && him.g && s.hc === 0) {
                  him.vy = JUMP;
                  him.g = false;
                  s.hc = 20;
              }
              phys(him);
              s.lag = dist > CHAIN * 1.5 ? s.lag + 1 : 0;
              if (s.lag > 70 || him.y > H + 30)
                  rescue(s, "Found you. Keep going.");
              if (her.y > H + 20) {
                  her.x = s.safe.x;
                  her.y = s.safe.y;
                  her.vx = 0;
                  her.vy = 0;
                  rescue(s, ["Gotcha. Up you go.", "Held the chain. Try again.", "Got you. No rush."][Math.floor(Math.random() * 3)]);
              }
              s.gems.forEach((g, i) => {
                  if (g.got)
                      return;
                  const near = (b) => Math.abs(b.x - g.x) < 18 && Math.abs(b.y - 6 - g.y) < 26;
                  if (near(her) || near(him)) {
                      g.got = true;
                      s.got++;
                      setCount(s.got);
                      puff(g.x, g.y, "#ffb3c7", 10);
                      flash("n", setNote, NOTES[i], 4600);
                      SND.tone(784, 0.6, "sine", 0.07);
                      window.setTimeout(() => SND.tone(1175, 0.8, "sine", 0.06), 110);
                      window.setTimeout(() => SND.tone(1568, 1, "sine", 0.04), 230);
                  }
              });
              const z = Math.min(4, Math.floor((her.x / LEVEL.end) * 5));
              if (z !== s.zone && z >= 0) {
                  s.zone = z;
                  flash("z", setBanner, ZONES[z].name, 3400);
                  flash("b", setBubble, ZONES[z].say, 3200);
              }
              s.cam += (Math.max(0, her.x - W * 0.42) - s.cam) * 0.08;
              if (!s.done && her.g && her.x > LEVEL.cake - 14) {
                  s.done = true;
                  s.fin = 1;
                  setWish(true);
                  s.gems.forEach((g) => { g.got = true; });
                  s.got = 17;
                  setCount(17);
                  flash("n", setNote, "All seventeen are yours. None can ever be missed.", 5000);
                  puff(LEVEL.cake, LEVEL.cakeY - 20, "#f4cf6a", 24);
                  SND.tone(660, 0.5, "sine", 0.08);
              }
              if (s.fin === 2)
                  fireworks(s);
              if (s.fin === 2 && s.t % 4 === 0) {
                  s.sparks.push({ x: s.cam + Math.random() * W, y: -4, vx: (Math.random() - 0.5) * 0.4, vy: 0.5 + Math.random() * 0.4, l: 220, c: ["#f4cf6a", "#e5a39b", "#9ec3d6", "#f1ead9"][Math.floor(Math.random() * 4)] });
              }
              {
                  let n = 0;
                  for (const p of s.sparks) {
                      p.x += p.vx; p.y += p.vy; p.vy += 0.02;
                      if (--p.l > 0) s.sparks[n++] = p;
                  }
                  s.sparks.length = n;
              }
          };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      let dt = Math.min(50, now - last);
      last = now;
      // snap to the display's refresh so 60 / 120 Hz screens step evenly (no judder)
      if (Math.abs(dt - STEP_MS) < 2) dt = STEP_MS; else if (Math.abs(dt - STEP_MS / 2) < 1) dt = STEP_MS / 2;
      acc += dt;
      let n = 0;
      while (acc >= STEP_MS - 0.001) { step(); acc -= STEP_MS; n++; }
      const s = st.current;
      // nothing changed (120 Hz+ screens) or the idle title scene: skip the redraw
      if (!force && (n === 0 || (phaseRef.current === "title" && (s.t & 1)))) return;
      force = false;
      draw(c, s);
      const el = at.current;
      if (el) {
        const t = "translate3d(" + ((s.him.x - s.cam) * scale).toFixed(1) + "px," + ((s.him.y - 18) * scale).toFixed(1) + "px,0)";
        if (t !== lastT) { lastT = t; el.style.transform = t; }
      }
      const pr = prog.current;
      if (pr) {
        const p = Math.max(0, Math.min(1, s.her.x / LEVEL.cake));
        if (Math.abs(p - lastP) > 0.002) { lastP = p; pr.style.transform = "scaleX(" + p.toFixed(3) + ")"; }
      }
    };

    // Run only while the section is on screen and the tab is visible: no wasted CPU, no stray music.
    const apply = () => {
      const on = onScreen && !document.hidden;
      live.current = onScreen;
      if (on === running) return;
      running = on;
      if (on) {
        last = performance.now(); acc = 0; force = true;
        raf = requestAnimationFrame(frame);
        if (phaseRef.current !== "title") SND.wake();
      } else {
        cancelAnimationFrame(raf);
        SND.pause();
        keys.current = NO_KEYS();
      }
    };
    const io = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((es) => { onScreen = es[es.length - 1].isIntersecting; apply(); }, { rootMargin: "120px 0px" })
      : null;
    if (io) io.observe(stageEl); else { onScreen = true; apply(); }
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => { scale = stageEl.clientWidth / W; lastT = ""; force = true; }) : null;
    if (ro) ro.observe(stageEl);
    document.addEventListener("visibilitychange", apply);
    const tm = timers.current;
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", apply);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      SND.pause();
      Object.values(tm).forEach((id) => window.clearTimeout(id));
    };
  }, [flash]);

  const start = () => {
    window.clearTimeout(timers.current.end);
    LEVEL.p.forEach((p) => { p.c = -1; p.gone = 0; });
    st.current = fresh();
    st.current.gr = greets.map((g) => g.toUpperCase());
    st.current.msg = wrap(finalMessage, 36);
    setCount(0); setNote(""); setWish(false); setPhase("play");
    SND.init(); SND.music();
    // bring the whole game into view so nothing is cut off while playing
    const el = stage.current;
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) {
        const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
      }
    }
  };
  const hold = (k) => ({
    onPointerDown: (e) => { e.preventDefault(); keys.current[k] = true; },
    onPointerUp: () => { keys.current[k] = false; },
    onPointerLeave: () => { keys.current[k] = false; },
    onPointerCancel: () => { keys.current[k] = false; },
    onContextMenu: (e) => e.preventDefault(),
  });

  return (
    <div className="ct-wrap">
      <style>{GAME_CSS}</style>
      <div className="ct-frame">
        <div className="ct-stage" ref={stage}>
          <canvas ref={cv} width={W} height={H} className="ct-canvas" role="img" aria-label="A pixel adventure: two people tied together by a chain climb through a never-ending cozy house toward a birthday cake." />
          <div className="ct-hud"><Pixel rows={SP_HEART} pal={HEART_PAL} px={2} />{count} of 17</div>
          <button className="ct-mute" aria-label="Toggle sound" onClick={(e) => { SND.mute(!muted); setMuted(!muted); e.currentTarget.blur(); }}>{muted ? "Sound off" : "Sound on"}</button>
          {wish && <div className="ct-sr">Make a wish, then jump to blow out the candles</div>}
          <div className="ct-prog"><div ref={prog} /></div>
          {banner && <div className="ct-banner" key={banner}>{banner}</div>}
          <div ref={at} className="ct-at">{bubble && <div className="ct-bub"><small>{hisName}</small>{bubble}</div>}</div>
          {note && <div className="ct-note" key={note}>{note}</div>}
          {phase === "title" && (
            <div className="ct-ov">
              <div className="ct-card">
                <h2>{title}</h2>
                <p>A little adventure for {herName}.</p>
                <button className="btn" onClick={start}>Begin</button>
              </div>
            </div>
          )}
          {phase === "end" && (
            <>
              {photos.length > 0 && <img key={Math.floor(gn / 2)} className="ct-polaroid" src={photos[Math.floor(gn / 2) % photos.length]} alt="" />}
              <span className="ct-sr">Happy 17th birthday, {herName}. {finalMessage}</span>
            </>
          )}
        </div>
      </div>
      {phase === "end" && (
        <div className="ct-again"><button className="btn" onClick={start}>Play again</button></div>
      )}
      <div className="ct-pad">
        <div className="grp">
          <button className="ct-b" aria-label="Move left" {...hold("l")}><Ico n="left" px={4} /></button>
          <button className="ct-b" aria-label="Move right" {...hold("r")}><Ico n="right" px={4} /></button>
        </div>
        <button className="ct-b" aria-label="Jump" {...hold("j")}><Ico n="up" px={4} /></button>
      </div>
      <p className="hand ct-help">
        <span className="ct-kb">Move with the arrow keys or A and D, and jump with Space. </span>
        <span className="ct-touch">Use the buttons to move and jump. </span>
        There's no timer, nothing can be missed, and you can't lose. If you slip, the chain catches you.
      </p>
      <p className="ct-credit"><Pixel rows={SP_HEART} pal={HEART_PAL} px={3} />Game built by Claude too</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function BirthdaySite() {
  const [burst, setBurst] = useState(0);
  const fire = () => setBurst((b) => b + 1);

  return (
    <div className="bd">
      <style>{CSS}</style>
      <Confetti burst={burst} />

      <Hero fire={fire} />

      <Section
        id="wish" icon="star"
        title="Make a wish" sub="Every type carries one wish. Write as many as you want."
        decor={[["star", "18%", ["left", "5%"], 5, "#FFC15E", 0], ["moon", "60%", ["right", "6%"], 5, "#FFF0C2", 1.5]]}
      >
        <Wishes />
      </Section>

      <Section
        id="memories" icon="camera"
        title="A Cutie Reminders" sub="Tap a card to flip it over and read the note."
        decor={[["star", "12%", ["left", "4%"], 5, "#FFC15E", 0], ["flower", "70%", ["right", "4%"], 5, "#FFFFFF", 1]]}
      >
        <div className="polas">
          {MEMORIES.map((m) => (
            <Polaroid key={m.title} m={m} />
          ))}
        </div>
      </Section>

      <Section
        id="jar" icon="heart"
        title="Pull A Note" sub="The jar contains lovely notes. Pull a note to make you kilig."
        decor={[["sparkles", "16%", ["right", "6%"], 5, "#FFC15E", 0.5], ["coffee", "74%", ["left", "5%"], 5, "#FFFFFF", 2]]}
      >
        <Jar />
      </Section>

      <Section
        id="gifts" icon="gift"
        title="Open your gifts" sub="Three little presents, wrapped just for today."
        decor={[["gift", "10%", ["left", "5%"], 5, "#C9B6FF", 0], ["star", "66%", ["right", "6%"], 5, "#FFFFFF", 1.2]]}
      >
        <Gifts fire={fire} />
      </Section>

      <Section
        id="songs" icon="music"
        title="Our soundtrack" sub="Pick a record and watch it spin."
        decor={[["music", "14%", ["right", "5%"], 5, "#FFC15E", 0.8], ["moon", "72%", ["left", "4%"], 5, "#FFF0C2", 1.8]]}
      >
        <Songs />
      </Section>

      <Section
        id="game" icon="sparkles"
        title="Match the cozy things" sub="Find all six pairs. Take your time."
        decor={[["cat", "12%", ["left", "5%"], 5, "#FFB86B", 0], ["cookie", "68%", ["right", "5%"], 5, "#FFE08A", 1]]}
      >
        <Game fire={fire} />
      </Section>

      <Section
        id="adventure" icon="chain"
        title="Our little adventure" sub="Two people, one chain, and seventeen gems to find on the way up."
        decor={[["star", "14%", ["left", "4%"], 5, "#FFC15E", 0.4], ["heart", "70%", ["right", "4%"], 5, "#FF8FAB", 1.6]]}
      >
        <ChainedAdventure herName={CONFIG.name} hisName={CONFIG.from} nickname={CONFIG.nickname} />
      </Section>

      <Section
        id="letter" icon="mail"
        title="A letter for you" sub="Something I wanted to say properly."
        decor={[["heart", "20%", ["left", "6%"], 5, "#FF8FAB", 0], ["star", "62%", ["right", "6%"], 5, "#FFC15E", 1.4]]}
      >
        <Letter fire={fire} />
      </Section>

      <Footer />
    </div>
  );
}
