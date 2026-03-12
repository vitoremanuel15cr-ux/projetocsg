const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace Brand name
html = html.replace(/>TechGreen</g, '>Projeto CSG<');
html = html.replace(/Laboratório TechGreen/g, 'Laboratório Projeto CSG');

// Replace Hero Visual
const heroVisualRegex = /<div class="hero-visual reveal" aria-hidden="true">[\s\S]*?<\/section>/;
const newHeroVisual = `<div class="hero-visual reveal" aria-hidden="true">
            <div class="dashboard-panel">
              <div class="dash-bg-glow"></div>
              
              <div class="dash-card dash-card-1">
                <div class="dash-icon"><i class="fa-solid fa-leaf"></i></div>
                <div class="dash-info">
                  <h4>Biofertilizante</h4>
                  <p>Eficiência Sintrófica</p>
                  <div class="progress-bar"><div class="progress p-green" style="width: 88%"></div></div>
                </div>
                <div class="dash-stats">88%</div>
              </div>

              <div class="dash-card dash-card-2">
                <div class="dash-icon"><i class="fa-solid fa-microbe"></i></div>
                <div class="dash-info">
                  <h4>Degradação PET</h4>
                  <p>Taxa Enzimática</p>
                  <div class="progress-bar"><div class="progress p-blue" style="width: 94%"></div></div>
                </div>
                <div class="dash-stats">94 U/mg</div>
              </div>

              <div class="dash-card dash-card-3">
                 <div class="dna-animation">
                    <div class="strand"></div><div class="strand"></div><div class="strand"></div><div class="strand"></div><div class="strand"></div>
                 </div>
                 <p class="dash-note">Análise Genômica em Tempo Real</p>
              </div>
            </div>
            
            <div class="bio-particle p1"></div>
            <div class="bio-particle p2"></div>
            <div class="bio-particle p3"></div>
            <div class="bio-particle p4"></div>
            <div class="bio-particle p5"></div>
          </div>
        </div>
      </section>`;

html = html.replace(heroVisualRegex, newHeroVisual);

// Add 3D card wrapper to research lines
html = html.replace(/<article class="card reveal">/g, '<article class="card reveal card-hover-3d">\n              <div class="card-glow"></div>');

// Update Timeline
html = html.replace(/<header class="section-header reveal">(\s*)<h2 class="section-title" id="timeline-title">Evolução Metodológica<\/h2>/, '<header class="section-header reveal text-center" style="margin: 0 auto 40px;">$1<h2 class="section-title" id="timeline-title">Evolução Metodológica</h2>');

html = html.replace(/<ol class="timeline"/, '<div class="timeline-wrapper">\n            <ol class="timeline"');
html = html.replace(/<\/ol>\n        <\/div>\n      <\/section>/, '</ol>\n          </div>\n        </div>\n      </section>');

fs.writeFileSync('index.html', html);

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

// Remove old hero-visual styles
css = css.replace(/\/\* Hero Visual \(DNA\/Lab Concept\) \*\/[\s\S]*?\/\* Sections \*\//, `/* Sections */`);

// Remove old timeline styles and replace with new
css = css.replace(/\/\* Timeline \*\/[\s\S]*?\/\* Gallery \*\//, `/* Gallery */`);

// Remove old gallery styles and replace with new
css = css.replace(/\/\* Gallery \*\/[\s\S]*?\/\* Contact \*\//, `/* Contact */`);

// Append new styles
const newStyles = `
/* ==========================================================================
   NOVO VISUAL HERO (Dashboard) & BIOLOGIA
   ========================================================================== */

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  min-height: 400px;
}

.dashboard-panel {
  position: relative;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 2;
}

@media (min-width: 1024px) {
  .hero-inner { grid-template-columns: 1.1fr 0.9fr; gap: 60px; }
  .dashboard-panel {
    transform: rotateX(8deg) rotateY(-12deg);
  }
  .hero-visual:hover .dashboard-panel {
    transform: rotateX(2deg) rotateY(-4deg) scale(1.02);
  }
}

.dash-bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(14,165,233,0.1) 40%, transparent 70%);
  transform: translate(-50%, -50%) translateZ(-50px);
  filter: blur(40px);
  pointer-events: none;
}

.dash-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  transform: translateZ(0);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.dash-card:hover {
  transform: translateZ(20px);
  border-color: rgba(255, 255, 255, 0.2);
}

.dash-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  display: grid;
  place-items: center;
  font-size: 1.4rem;
}
.dash-card-1 .dash-icon { color: var(--green); background: rgba(16,185,129,0.1); }
.dash-card-2 .dash-icon { color: var(--blue); background: rgba(14,165,233,0.1); }

.dash-info {
  flex: 1;
}

.dash-info h4 {
  margin: 0 0 4px;
  font-size: 1.05rem;
  font-family: 'Outfit', sans-serif;
  color: var(--text);
}

.dash-info p {
  margin: 0 0 10px;
  font-size: 0.8rem;
  color: var(--muted);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 3px;
  position: relative;
}
.progress::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 2s infinite;
}
.p-green { background: var(--green); box-shadow: 0 0 10px var(--green); }
.p-blue { background: var(--blue); box-shadow: 0 0 10px var(--blue); }

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.dash-stats {
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  color: var(--text);
}
.dash-card-1 .dash-stats { color: var(--green); }
.dash-card-2 .dash-stats { color: var(--blue); }

.dash-card-3 {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
}

.dna-animation {
  display: flex;
  gap: 6px;
  height: 30px;
  align-items: center;
}
.dna-animation .strand {
  width: 4px;
  background: var(--teal);
  border-radius: 2px;
  animation: dna-pulse 1s ease-in-out infinite alternate;
}
.dna-animation .strand:nth-child(1) { height: 100%; animation-delay: 0s; }
.dna-animation .strand:nth-child(2) { height: 60%; animation-delay: 0.2s; background: var(--blue); }
.dna-animation .strand:nth-child(3) { height: 80%; animation-delay: 0.4s; background: var(--green); }
.dna-animation .strand:nth-child(4) { height: 40%; animation-delay: 0.6s; background: var(--blue); }
.dna-animation .strand:nth-child(5) { height: 90%; animation-delay: 0.8s; background: var(--teal); }

@keyframes dna-pulse {
  0% { transform: scaleY(0.5); opacity: 0.5; }
  100% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 10px currentColor; }
}

.dash-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--teal);
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Biology Particles */
.bio-particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(8px);
  opacity: 0.5;
  animation: float-bio 10s infinite linear;
  z-index: 1;
}

.p1 { width: 80px; height: 80px; background: var(--green); top: 10%; left: -10%; animation-duration: 12s; }
.p2 { width: 120px; height: 120px; background: var(--blue); bottom: 0; right: -5%; animation-duration: 15s; animation-direction: reverse; }
.p3 { width: 60px; height: 60px; background: var(--teal); top: 40%; right: 10%; animation-duration: 9s; }
.p4 { width: 40px; height: 40px; background: #818cf8; bottom: 20%; left: 10%; animation-duration: 11s; }
.p5 { width: 90px; height: 90px; border: 2px solid var(--green); background: transparent; filter: blur(2px); top: -5%; right: 20%; animation-duration: 14s; }

@keyframes float-bio {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -40px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

/* ==========================================================================
   CARDS 3D GLOW
   ========================================================================== */

.projects-grid {
  perspective: 1000px;
}
.card-hover-3d {
  transform-style: preserve-3d;
}
.card-hover-3d:hover {
  transform: translateY(-10px) rotateX(2deg) rotateY(2deg);
}
.card-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.06), transparent 40%);
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.card-hover-3d:hover .card-glow {
  opacity: 1;
}
.card > * { position: relative; z-index: 1; }

/* ==========================================================================
   TIMELINE ALTERNATING
   ========================================================================== */

.timeline-wrapper {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(180deg, var(--green), var(--blue));
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  margin-bottom: 30px;
}
.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-node {
  position: absolute;
  left: 17px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--black);
  border: 3px solid var(--green);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  z-index: 1;
}

.timeline-content {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
  transition: all 300ms ease;
}
.timeline-content:hover {
  background: var(--surface-2);
  transform: translateX(5px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: var(--shadow-md);
}

.timeline-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px;
  font-size: 1.25rem;
  color: var(--green);
}

.timeline-text {
  margin: 0 0 16px;
  color: var(--muted);
}

.timeline-tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(14, 165, 233, 0.1);
  color: var(--blue);
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(14, 165, 233, 0.2);
}

@media (min-width: 768px) {
  .timeline::before {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .timeline-item {
    width: 50%;
    padding-left: 0;
    padding-right: 40px;
    margin-bottom: 50px;
  }
  
  .timeline-item:nth-child(even) {
    margin-left: 50%;
    padding-right: 0;
    padding-left: 40px;
  }
  
  .timeline-node {
    left: auto;
    right: -9px;
  }
  
  .timeline-item:nth-child(even) .timeline-node {
    left: -9px;
    right: auto;
  }
  
  .timeline-item:nth-child(odd) {
    text-align: right;
  }
  
  .timeline-item:nth-child(odd) .timeline-title {
    justify-content: flex-end;
  }
  
  .timeline-item:nth-child(odd) .timeline-content:hover {
    transform: translateX(-5px);
  }
}

.text-center { text-align: center; }
.text-center .section-title { justify-content: center; }

/* ==========================================================================
   GALERIA EDITORIAL GRID
   ========================================================================== */

.gallery-grid {
  display: grid;
  gap: 20px;
}

.gallery-item {
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  overflow: hidden;
  cursor: pointer;
  transition: all 300ms ease;
  display: flex;
  flex-direction: column;
}
.gallery-item:hover {
  transform: translateY(-4px);
  border-color: var(--green);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.15);
}

.gallery-thumb {
  height: 200px;
  display: block;
  background-size: cover;
  background-position: center;
  position: relative;
  flex-grow: 1;
}
.gallery-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(2, 6, 23, 0.8), transparent);
}

.g1 { background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23064e3b"/%3E%3Ccircle cx="200" cy="150" r="100" fill="%2310b981" opacity="0.2"/%3E%3C/svg%3E') center/cover; }
.g2 { background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%230f172a"/%3E%3Ccircle cx="100" cy="100" r="80" fill="%230ea5e9" opacity="0.2"/%3E%3C/svg%3E') center/cover; }
.g3 { background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231e293b"/%3E%3Cpath d="M0,300 L400,0 L400,300 Z" fill="%2314b8a6" opacity="0.1"/%3E%3C/svg%3E') center/cover; }
.g4 { background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23020617"/%3E%3Crect x="50" y="50" width="300" height="200" fill="%233b82f6" opacity="0.15" rx="20"/%3E%3C/svg%3E') center/cover; }

.gallery-caption {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  font-weight: 500;
  color: var(--text);
  font-size: 0.95rem;
}
.gallery-caption i {
  color: var(--green);
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: 280px;
    gap: 24px;
  }
  
  .gallery-item:nth-child(1) {
    grid-column: span 8;
    grid-row: span 2;
  }
  
  .gallery-item:nth-child(2) {
    grid-column: span 4;
    grid-row: span 1;
  }
  
  .gallery-item:nth-child(3) {
    grid-column: span 4;
    grid-row: span 1;
  }
  
  .gallery-item:nth-child(4) {
    grid-column: span 12;
    grid-row: span 1;
    flex-direction: row;
  }
  
  .gallery-item:nth-child(4) .gallery-thumb {
    width: 60%;
    flex: none;
  }
  .gallery-item:nth-child(4) .gallery-caption {
    width: 40%;
    justify-content: center;
    font-size: 1.2rem;
  }
}
`;

fs.writeFileSync('style.css', css + newStyles);

// 3. Update script.js
let js = fs.readFileSync('script.js', 'utf8');
js = js.replace('})();', `
  /* ---------------------------
     3D Card Hover Effect
  ---------------------------- */
  const cards = document.querySelectorAll('.card-hover-3d');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', \`\${x}px\`);
      card.style.setProperty('--mouse-y', \`\${y}px\`);
    });
  });
})();`);

fs.writeFileSync('script.js', js);

console.log('Update complete');
