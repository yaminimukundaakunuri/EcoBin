/**
 * EcoBin - Smart Waste Management & Circular Economy
 * Core Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursorGlow();
  initHeaderScroll();
  initHotspots();
  initLiveBinSimulator();
  initCityFleetCanvas();
  initRoiCalculator();
  initAiScannerDemo();
  initTechTabs();
  initFaqAccordion();
  initModals();
  initNewsletter();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('ecobin_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ecobin_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Cyber Emerald Dark' : 'Crisp Eco Light'} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (theme === 'light') {
    // Show Moon icon
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  } else {
    // Show Sun icon
    icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  }
}

/* ==========================================================================
   2. Interactive Cursor Glow
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   3. Sticky Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(7, 12, 9, 0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(52, 211, 153, 0.2)';
      }
    });
  }
}

/* ==========================================================================
   4. Audio Synthesizer (Zero-dependency Web Audio API)
   ========================================================================== */
class EcoSoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playScan() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) { /* ignore audio permission issues */ }
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.08));
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + (idx * 0.08));
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (idx * 0.08) + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + (idx * 0.08));
        osc.stop(this.ctx.currentTime + (idx * 0.08) + 0.25);
      });
    } catch (e) { }
  }
}

const ecoSound = new EcoSoundFX();

/* ==========================================================================
   5. Hero Image Hotspots
   ========================================================================== */
function initHotspots() {
  const hotspotData = {
    camera: {
      title: "EcoVision™ Multi-Spectral AI Camera",
      desc: "Deep learning computer vision identifies 1,200+ packaging types in 280ms with 99.2% accuracy before chute unlocks."
    },
    solar: {
      title: "Monocrystalline Solar Harvesting Top",
      desc: "Generates 85W peak power with 120-hour battery reserve for 100% off-grid operation anywhere in the city."
    },
    chute: {
      title: "Contactless Magnetic Dynamic Chutes",
      desc: "Four segregated internal chambers (Metal/Plastic, Glass, Compost, E-Waste) with auto-sanitizing UV-C light."
    },
    compactor: {
      title: "Self-Compacting Hydraulic Ram",
      desc: "5:1 compaction ratio compresses trash automatically, multiplying bin capacity 5x and cutting pickups by 70%."
    }
  };

  const markers = document.querySelectorAll('.hotspot-marker');
  const tooltip = document.getElementById('hotspotTooltip');
  const tooltipTitle = document.getElementById('hotspotTooltipTitle');
  const tooltipDesc = document.getElementById('hotspotTooltipDesc');
  const tooltipClose = document.getElementById('hotspotTooltipClose');

  markers.forEach(marker => {
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = marker.dataset.hotspot;
      if (hotspotData[type] && tooltip && tooltipTitle && tooltipDesc) {
        tooltipTitle.textContent = hotspotData[type].title;
        tooltipDesc.textContent = hotspotData[type].desc;
        tooltip.style.display = 'flex';
        ecoSound.playScan();
      }
    });
  });

  if (tooltipClose && tooltip) {
    tooltipClose.addEventListener('click', () => {
      tooltip.style.display = 'none';
    });
  }
}

/* ==========================================================================
   6. Interactive Live Bin Simulator
   ========================================================================== */
function initLiveBinSimulator() {
  const wasteDatabase = {
    can: {
      name: "Aluminum Soda Can",
      emoji: "🥤",
      stream: "metal",
      streamName: "Recyclable Metals",
      slotIndex: 0,
      confidence: 99.4,
      material: "ALU-41 (Recyclable Aluminum)",
      carbonSaved: 48,
      ecoPoints: 25,
      guidance: "Infinite recyclability! Remelting saves 95% energy vs raw bauxite."
    },
    glass: {
      name: "Glass Bottle",
      emoji: "🍾",
      stream: "glass",
      streamName: "Recyclable Glass",
      slotIndex: 1,
      confidence: 98.6,
      material: "GL-70 (Clear Soda-Lime Glass)",
      carbonSaved: 65,
      ecoPoints: 30,
      guidance: "100% recyclable with zero degradation. Chute directs to cushioned bin."
    },
    organic: {
      name: "Fruit Peel & Coffee Waste",
      emoji: "🍌",
      stream: "organic",
      streamName: "Organic Compost",
      slotIndex: 2,
      confidence: 99.1,
      material: "Bio-Carbon Biomass (100% Compostable)",
      carbonSaved: 85,
      ecoPoints: 35,
      guidance: "Diverted from methane landfill into municipal microbial compost fertilizer."
    },
    ewaste: {
      name: "Lithium Device / Phone",
      emoji: "📱",
      stream: "ewaste",
      streamName: "E-Waste & Hazards",
      slotIndex: 3,
      confidence: 97.8,
      material: "Li-Ion & Precious Rare Earth Metals",
      carbonSaved: 220,
      ecoPoints: 100,
      guidance: "Extracted for Cobalt/Lithium recovery. Flame-suppression safe chamber."
    },
    box: {
      name: "Corrugated Cardboard",
      emoji: "📦",
      stream: "metal", // mapped to dry recyclables slot
      streamName: "Paper & Cardboard",
      slotIndex: 0,
      confidence: 98.9,
      material: "PAP-20 (Cellulose Fiber)",
      carbonSaved: 55,
      ecoPoints: 20,
      guidance: "Flattened automatically by hydraulic roller. Ready for fiber pulp reprocessing."
    },
    plastic: {
      name: "Takeout PP Container",
      emoji: "🥡",
      stream: "metal", // recyclable stream
      streamName: "Clean Polymers",
      slotIndex: 0,
      confidence: 96.4,
      material: "PP-05 (Polypropylene)",
      carbonSaved: 40,
      ecoPoints: 20,
      guidance: "Optical sensor confirms clean food-grade polypropylene for circular flake."
    }
  };

  const buttons = document.querySelectorAll('.waste-select-btn');
  const stage = document.getElementById('simScannerStage');
  const emptyState = document.getElementById('scannerEmptyState');
  const activeDisplay = document.getElementById('scannedItemDisplay');
  const itemIcon = document.getElementById('scannedItemIcon');
  const itemName = document.getElementById('scannedItemName');
  const aiReadout = document.getElementById('aiReadoutPill');
  const slotCards = document.querySelectorAll('.bin-slot-card');

  const totalPointsEl = document.getElementById('simTotalPoints');
  const totalCarbonEl = document.getElementById('simTotalCarbon');
  const totalDepositsEl = document.getElementById('simTotalDeposits');
  const terminalLog = document.getElementById('simTerminalLog');

  let sessionPoints = 145;
  let sessionCarbon = 380;
  let sessionDeposits = 6;

  // Compartment fill states (in %)
  const fillPercentages = [34, 48, 62, 18];

  function logTerminal(message, type = 'info') {
    if (!terminalLog) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.innerHTML = `<span class="timestamp">[${timeStr}]</span> ${message}`;
    terminalLog.prepend(line);
    // keep max 20 lines
    while (terminalLog.children.length > 20) {
      terminalLog.removeChild(terminalLog.lastChild);
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const wasteKey = btn.dataset.waste;
      const data = wasteDatabase[wasteKey];
      if (!data) return;

      // Trigger Scanning animation
      stage?.classList.add('scanning');
      ecoSound.playScan();

      if (emptyState) emptyState.style.display = 'none';
      if (activeDisplay) activeDisplay.style.display = 'flex';
      if (itemIcon) itemIcon.textContent = data.emoji;
      if (itemName) itemName.textContent = data.name;
      if (aiReadout) {
        aiReadout.innerHTML = `🔍 AI Scanning: <strong>Analyzing spectral refraction...</strong>`;
      }

      logTerminal(`Intake sensor triggered: Item placed on loading aperture...`, 'info');

      // AI Resolution after 800ms
      setTimeout(() => {
        stage?.classList.remove('scanning');
        ecoSound.playSuccess();

        if (aiReadout) {
          aiReadout.innerHTML = `✅ Identified: <strong>${data.material}</strong> (${data.confidence}% Conf.)`;
        }

        // Open target slot lid
        slotCards.forEach((slot, idx) => {
          if (idx === data.slotIndex) {
            slot.classList.add('active-lid');
            // update fill level
            fillPercentages[idx] = Math.min(98, fillPercentages[idx] + 7);
            const fillBar = slot.querySelector('.fill-bar');
            const fillText = slot.querySelector('.slot-fill-text');
            if (fillBar) fillBar.style.width = `${fillPercentages[idx]}%`;
            if (fillText) fillText.textContent = `${fillPercentages[idx]}% Full`;

            setTimeout(() => {
              slot.classList.remove('active-lid');
            }, 2400);
          }
        });

        // Update rewards
        sessionPoints += data.ecoPoints;
        sessionCarbon += data.carbonSaved;
        sessionDeposits += 1;

        if (totalPointsEl) totalPointsEl.textContent = sessionPoints;
        if (totalCarbonEl) totalCarbonEl.textContent = `${(sessionCarbon / 1000).toFixed(2)}kg`;
        if (totalDepositsEl) totalDepositsEl.textContent = sessionDeposits;

        logTerminal(`AI Routed to Slot #${data.slotIndex + 1} (${data.streamName}). Compactor scheduled.`, 'success');
        logTerminal(`GreenPoints awarded: +${data.ecoPoints} pts | CO₂ offset: -${data.carbonSaved}g`, 'success');

        showToast(`🎉 Sorted into ${data.streamName}! +${data.ecoPoints} GreenPoints earned.`);
      }, 950);
    });
  });
}

/* ==========================================================================
   7. Smart City Fleet Route Telemetry Canvas
   ========================================================================== */
function initCityFleetCanvas() {
  const canvas = document.getElementById('cityMapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Responsive canvas sizing
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Nodes (Smart Bins across city map)
  const nodes = [
    { id: 'BIN-101', name: 'Civic Plaza North', x: 0.18, y: 0.25, fill: 42, stream: 'Multi' },
    { id: 'BIN-102', name: 'Harbor Walkway', x: 0.32, y: 0.18, fill: 88, stream: 'Solar Hub' },
    { id: 'BIN-103', name: 'Tech Innovation Park', x: 0.48, y: 0.35, fill: 94, stream: 'Quad' },
    { id: 'BIN-104', name: 'Central Metro Terminal', x: 0.65, y: 0.22, fill: 82, stream: 'High Capacity' },
    { id: 'BIN-105', name: 'University Campus East', x: 0.82, y: 0.32, fill: 61, stream: 'Multi' },
    { id: 'BIN-106', name: 'Botanical Gardens', x: 0.24, y: 0.68, fill: 35, stream: 'Compost Focus' },
    { id: 'BIN-107', name: 'Downtown Retail Square', x: 0.42, y: 0.62, fill: 91, stream: 'Quad' },
    { id: 'BIN-108', name: 'Financial District Plaza', x: 0.58, y: 0.75, fill: 89, stream: 'Solar Hub' },
    { id: 'BIN-109', name: 'Arts & Culture Center', x: 0.78, y: 0.65, fill: 50, stream: 'Multi' },
    { id: 'BIN-110', name: 'Harbor Wharf Pier 4', x: 0.88, y: 0.82, fill: 30, stream: 'Solar Hub' },
  ];

  // Collection Truck state
  const truck = {
    x: 0.1,
    y: 0.85,
    targetIndex: 0,
    active: false,
    path: [],
    speed: 0.006,
    progress: 0
  };

  let animationFrameId;

  function drawMap() {
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    ctx.clearRect(0, 0, w, h);

    // Draw Cyber Grid Lines
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.06)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw Connecting Roads / Streets
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.12)';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    nodes.forEach((n, i) => {
      const next = nodes[(i + 1) % nodes.length];
      ctx.moveTo(n.x * w, n.y * h);
      ctx.lineTo(next.x * w, next.y * h);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Dynamic Active Truck Route Path if dispatch is active
    if (truck.path.length > 1) {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.85)';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(truck.path[0].x * w, truck.path[0].y * h);
      for (let i = 1; i < truck.path.length; i++) {
        ctx.lineTo(truck.path[i].x * w, truck.path[i].y * h);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Bins / Nodes
    nodes.forEach(node => {
      const nx = node.x * w;
      const ny = node.y * h;

      // Color coding based on fill %
      let color = '#10b981'; // Green (<50%)
      if (node.fill >= 80) color = '#f43f5e'; // Red Critical
      else if (node.fill >= 50) color = '#f59e0b'; // Yellow Warning

      // Outer glow pulse for critical bins
      if (node.fill >= 80) {
        ctx.beginPath();
        ctx.arc(nx, ny, 16 + Math.sin(Date.now() / 200) * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 63, 94, 0.22)';
        ctx.fill();
      }

      // Base circle
      ctx.beginPath();
      ctx.arc(nx, ny, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // White inner dot
      ctx.beginPath();
      ctx.arc(nx, ny, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Label text
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`${node.id} (${node.fill}%)`, nx + 12, ny + 4);
    });

    // Draw Truck if active
    if (truck.active) {
      const tx = truck.x * w;
      const ty = truck.y * h;

      // Truck marker
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(tx, ty, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "Outfit", sans-serif';
      ctx.fillText('⚡ TRUCK #04', tx - 24, ty - 14);

      // Move truck along path
      if (truck.path.length > 0) {
        const target = truck.path[truck.targetIndex];
        const dx = target.x - truck.x;
        const dy = target.y - truck.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.015) {
          // Arrived at node -> empty it!
          target.fill = 12;
          ecoSound.playSuccess();
          truck.targetIndex++;
          if (truck.targetIndex >= truck.path.length) {
            truck.active = false;
            truck.path = [];
            showToast('✅ Dynamic dispatch complete! All critical bins collected.');
          }
        } else {
          truck.x += (dx / dist) * truck.speed;
          truck.y += (dy / dist) * truck.speed;
        }
      }
    }

    animationFrameId = requestAnimationFrame(drawMap);
  }

  drawMap();

  // Button to trigger autonomous truck dispatch
  const dispatchBtn = document.getElementById('dispatchTruckBtn');
  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', () => {
      // Find all critical or warning bins (fill >= 75%)
      const criticalNodes = nodes.filter(n => n.fill >= 75);
      if (criticalNodes.length === 0) {
        showToast('ℹ️ All bins currently within normal fill thresholds.');
        return;
      }

      truck.active = true;
      truck.targetIndex = 0;
      truck.path = [{ x: truck.x, y: truck.y }, ...criticalNodes];
      ecoSound.playScan();
      showToast(`🚚 Autonomous e-Truck dispatched to empty ${criticalNodes.length} high-fill bins!`);
    });
  }

  // Button to simulate city waste event (rush hour)
  const rushHourBtn = document.getElementById('rushHourSimBtn');
  if (rushHourBtn) {
    rushHourBtn.addEventListener('click', () => {
      nodes.forEach(n => {
        n.fill = Math.min(99, n.fill + Math.floor(Math.random() * 25) + 15);
      });
      showToast('⚡ Rush hour event simulated! Bins filled across commercial district.');
    });
  }
}

/* ==========================================================================
   8. Interactive ROI & ESG Calculator
   ========================================================================== */
function initRoiCalculator() {
  const binSlider = document.getElementById('sliderBinCount');
  const spendSlider = document.getElementById('sliderCurrentSpend');
  const diversionSlider = document.getElementById('sliderDiversionRate');

  const binValueText = document.getElementById('calcBinValue');
  const spendValueText = document.getElementById('calcSpendValue');
  const diversionValueText = document.getElementById('calcDiversionValue');

  const resAnnualSavings = document.getElementById('resAnnualSavings');
  const resCo2Diverted = document.getElementById('resCo2Diverted');
  const resTripsSaved = document.getElementById('resTripsSaved');
  const resPayback = document.getElementById('resPayback');

  function updateCalculations() {
    const bins = parseInt(binSlider?.value || 30, 10);
    const spend = parseInt(spendSlider?.value || 12000, 10);
    const diversion = parseInt(diversionSlider?.value || 35, 10);

    if (binValueText) binValueText.textContent = `${bins} Bins`;
    if (spendValueText) spendValueText.textContent = `$${spend.toLocaleString()}/mo`;
    if (diversionValueText) diversionValueText.textContent = `${diversion}%`;

    // Mathematical models:
    // EcoBin smart compaction reduces collection pickups by 65-72%
    // AI optical sorting increases recyclables capture, reducing landfill tip fees
    const annualSpend = spend * 12;
    const efficiencyFactor = 0.58; // 58% typical reduction in hauling + tip fees
    const annualSavings = Math.round(annualSpend * efficiencyFactor);

    // Trips saved: Traditional bin = 3 pickups/wk = 156 trips/yr. Compactor = 1 pickup/wk = 52 trips/yr.
    const tripsSaved = Math.round(bins * 104);

    // CO2: ~2.4 metric tons diverted per smart solar bin/yr
    const co2Diverted = Math.round(bins * 2.45);

    // Payback: Hardware capital outlay vs annual cash flow
    const estimatedCapex = bins * 2400; // estimated per bin amortized
    const paybackMonths = Math.max(4, Math.round((estimatedCapex / (annualSavings / 12))));

    if (resAnnualSavings) resAnnualSavings.textContent = `$${annualSavings.toLocaleString()}`;
    if (resCo2Diverted) resCo2Diverted.textContent = `${co2Diverted} MT`;
    if (resTripsSaved) resTripsSaved.textContent = `${tripsSaved.toLocaleString()}`;
    if (resPayback) resPayback.textContent = `${paybackMonths} Mo.`;
  }

  [binSlider, spendSlider, diversionSlider].forEach(slider => {
    slider?.addEventListener('input', updateCalculations);
  });

  updateCalculations();

  // ESG Summary Report Button
  const genReportBtn = document.getElementById('generateEsgReportBtn');
  if (genReportBtn) {
    genReportBtn.addEventListener('click', () => {
      openEsgReportModal();
    });
  }
}

/* ==========================================================================
   9. AI Vision Material Scanner Interactive Demo
   ========================================================================== */
function initAiScannerDemo() {
  const sampleItems = {
    pet: {
      tag: "PET-01 (Polyethylene Terephthalate)",
      conf: "99.4%",
      grade: "A+ Highest Recyclability",
      stream: "Clear Beverage Bottle Flake",
      chuteAction: "Accept Chute #1 (Plastics/Metals)",
      co2: "48g CO₂e avoided",
      tip: "Remove cap if different resin; rinse residue if containing sugars."
    },
    banana: {
      tag: "Organic Food Waste (Biomass)",
      conf: "99.1%",
      grade: "100% Bio-Compostable",
      stream: "Microbial Digestion Stream",
      chuteAction: "Accept Chute #3 (Organics)",
      co2: "85g CO₂e avoided",
      tip: "Converts into enriched topsoil and bio-gas in 45 days."
    },
    battery: {
      tag: "Li-Ion Hazardous E-Waste",
      conf: "97.8%",
      grade: "Class 9 Hazard / High Value",
      stream: "Hydrometallurgical Recovery",
      chuteAction: "Accept Chute #4 (Inert E-Safe Chute)",
      co2: "220g CO₂e avoided",
      tip: "Fire-suppression chamber prevents thermal runaway. High nickel/cobalt recovery."
    },
    styro: {
      tag: "PS-06 (Expanded Polystyrene)",
      conf: "96.5%",
      grade: "Residual Non-Recyclable",
      stream: "Waste-to-Energy or Controlled Landfill",
      chuteAction: "Accept Chute #2 (Residual Stream)",
      co2: "0g (Residual)",
      tip: "Most municipal curbside centers reject styrofoam; EcoBin densifies it to save bulk."
    }
  };

  const buttons = document.querySelectorAll('.sample-pick-btn');
  const hudTag = document.getElementById('hudBoxTag');
  const resConf = document.getElementById('aiClassConf');
  const resMaterial = document.getElementById('aiClassMaterial');
  const resGrade = document.getElementById('aiClassGrade');
  const resAction = document.getElementById('aiClassAction');
  const resTip = document.getElementById('aiClassTip');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sampleKey = btn.dataset.sample;
      const data = sampleItems[sampleKey];
      if (!data) return;

      ecoSound.playScan();

      if (hudTag) hudTag.textContent = data.tag;
      if (resConf) resConf.textContent = data.conf;
      if (resMaterial) resMaterial.textContent = data.tag;
      if (resGrade) resGrade.textContent = data.grade;
      if (resAction) resAction.textContent = data.chuteAction;
      if (resTip) resTip.textContent = data.tip;

      showToast(`AI Scanner analyzed: ${data.tag}`);
    });
  });
}

/* ==========================================================================
   10. Technology Feature Showcase Tabs
   ========================================================================== */
function initTechTabs() {
  const tabButtons = document.querySelectorAll('.tech-tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   11. FAQ Accordion & Instant Search Filter
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  const searchInput = document.getElementById('faqSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent?.toLowerCase() || '';
        item.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }
}

/* ==========================================================================
   12. Modals (Pilot Booking & ESG Summary)
   ========================================================================== */
function initModals() {
  // Pilot Request Modal
  const pilotModal = document.getElementById('pilotModal');
  const pilotBtns = document.querySelectorAll('[data-open-modal="pilotModal"]');
  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

  pilotBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (pilotModal) pilotModal.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  });

  // Pilot Form Submission
  const pilotForm = document.getElementById('pilotBookingForm');
  if (pilotForm) {
    pilotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const org = document.getElementById('pilotOrg')?.value || 'Your Venture';
      pilotModal?.classList.remove('active');
      pilotForm.reset();
      showToast(`🚀 Pilot request received for ${org}! An EcoBin engineer will contact you in 24h.`);
    });
  }
}

function openEsgReportModal() {
  const modal = document.getElementById('esgReportModal');
  if (!modal) return;

  const binSlider = document.getElementById('sliderBinCount');
  const spendSlider = document.getElementById('sliderCurrentSpend');
  const bins = binSlider ? binSlider.value : '30';
  const spend = spendSlider ? spendSlider.value : '12000';

  const previewEl = document.getElementById('esgModalContent');
  if (previewEl) {
    previewEl.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid var(--border-medium); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h4 style="color: var(--accent-mint); margin-bottom: 6px;">EcoBin™ ESG Impact Certificate & Pro-Forma</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Executive Model prepared for <strong>${bins} Connected Smart Stations</strong></p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
        <div style="background: var(--bg-tertiary); padding: 14px; border-radius: 8px;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Annual Cost Avoidance</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-mint);">$${(spend * 12 * 0.58).toLocaleString()}</div>
        </div>
        <div style="background: var(--bg-tertiary); padding: 14px; border-radius: 8px;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">GHG Emissions Avoided</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-mint);">${Math.round(bins * 2.45)} MT CO₂e</div>
        </div>
        <div style="background: var(--bg-tertiary); padding: 14px; border-radius: 8px;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Hauling Trips Reduced</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-mint);">${(bins * 104).toLocaleString()} Pickups</div>
        </div>
        <div style="background: var(--bg-tertiary); padding: 14px; border-radius: 8px;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Recycling Diversion Gain</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-mint);">+48% to 92%</div>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
        This document complies with ISO 14001, Scope 1 & Scope 3 carbon reduction reporting guidelines, and municipal circular zero-waste targets.
      </p>
      <button class="btn btn-primary btn-glow" style="width: 100%;" onclick="window.print(); showToast('🖨️ Opening print dialog...');">
        Print / Save Official ESG PDF Report
      </button>
    `;
  }

  modal.classList.add('active');
}

/* ==========================================================================
   13. Newsletter & Toast Notification System
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`🌱 Thank you! "${input.value}" is subscribed to EcoBin Circular Dispatches.`);
        input.value = '';
      }
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
