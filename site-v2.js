// ── Nav ──────────────────────────────────────────────────────────────────────
const nav=document.querySelector('nav'),menu=document.querySelector('.menu');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.querySelectorAll('.marquee-label').forEach((label,index)=>{
  const conciseLabels=['01 / VISION + DEEP LEARNING','02 / GENERATIVE AI + AGENTS','03 / LANGUAGES + BACKEND','04 / CLOUD + DEVOPS'];
  if(conciseLabels[index])label.textContent=conciseLabels[index];
});

const identity=document.querySelector('.identity');
if(identity){
  identity.classList.add('identity-flip');
  identity.setAttribute('tabindex','0');
  identity.setAttribute('role','button');
  identity.setAttribute('aria-label','Flip contact card');
  identity.innerHTML='<div class="identity-face identity-front"><div class="id-head"><span>PERSONAL LICENSE OF CREATIVE PRACTICE</span><span>NO. SS2026</span></div><div class="id-card-main"><div class="id-portrait"><img class="ascii-magic" src="./ascii-magic-1.gif" alt="ASCII art animation"><span>AUTHORIZED<br>AI / ML ENGINEER</span></div><div class="identity-copy"><p class="identity-kicker">IDENTIFICATION / SHELSON SHELLY</p><h2>SHELSON<br><em>SHELLY</em></h2><div class="id-fields"><div><small>ROLE</small><strong>AI / ML ENGINEER</strong></div><div><small>LOCATION</small><strong>CHENNAI / INDIA</strong></div><div><small>SPECIALTY</small><strong>INTELLIGENT SYSTEMS + DATA</strong></div><div><small>STATUS</small><strong>OPEN TO GOOD WORK</strong></div></div><a class="email" href="mailto:shelson825@gmail.com">shelson825@gmail.com ↗</a><div class="socials"><a href="https://linkedin.com/in/shelsonshelly" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://github.com/shxlson" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.instagram.com/shxlson/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div></div></div><div class="barcode"></div><div class="id-foot"><span>VALID WORLDWIDE</span><span>ISSUED 2026 / DOES NOT EXPIRE</span></div><span class="flip-hint">FLIP CARD ↗</span></div><div class="identity-face identity-back"><div class="back-art"><img class="back-image" src="./images/43A328F7-0CAB-4333-8376-4458D0142FEE.jpeg" alt="Two hands reaching toward one another"></div><p class="back-caption">be human</p></div>';
  const flipIdentity=event=>{
    if(event.target.closest('a'))return;
    identity.classList.toggle('is-flipped');
  };
  identity.addEventListener('click',flipIdentity);
  identity.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();flipIdentity(event)}});
}

// ── Header hide on scroll-down / show on scroll-up ───────────────────────────
const header=document.querySelector('header');
let lastScrollY=0,ticking=false;
window.addEventListener('scroll',()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      const y=window.scrollY;
      if(y>80){                          // only kick in after passing hero top
        header.classList.toggle('header--hidden',y>lastScrollY);
      } else {
        header.classList.remove('header--hidden');
      }
      lastScrollY=y;
      ticking=false;
    });
    ticking=true;
  }
},{passive:true});

// ── Custom cursor (single listener — no duplicate, no offset drift) ───────────
const cursor=document.querySelector('.cursor');

window.addEventListener('pointermove',e=>{
  // Use exact pointer coords; CSS translate(-50%,-50%) centres the dot on the pointer.
  cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;
  const under=document.elementFromPoint(e.clientX,e.clientY);
  cursor.style.background=under&&under.closest('.experience,.red-art')?'#fff':'var(--r)';
},{passive:true});

document.querySelectorAll('a,button,.project-card,.marquee-strip,.marquee-content span,.company-mark,.cert-row').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('big'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('big'));
});

// ── Slideshow Controller ─────────────────────────────────────────────────────
function initSlideshows(){
  document.querySelectorAll('.project-slideshow[data-slideshow]').forEach(show=>{
    const cardSlides=show.querySelectorAll('.slides-container .slide');
    const cardDots=show.querySelectorAll('.slide-dots .dot');
    if(cardSlides.length<=1)return;
    let cur=0;
    function goTo(n){
      cardSlides[cur].classList.remove('active');
      if(cardDots[cur])cardDots[cur].classList.remove('active');
      cur=(n+cardSlides.length)%cardSlides.length;
      cardSlides[cur].classList.add('active');
      if(cardDots[cur])cardDots[cur].classList.add('active');
    }
    let timer=setInterval(()=>goTo(cur+1),3400);
    show._changeSlide=(dir)=>{
      clearInterval(timer);
      goTo(cur+dir);
      timer=setInterval(()=>goTo(cur+1),3400);
    };
  });
}
function changeSlide(btn,dir){
  const show=btn.closest('.project-slideshow');
  if(show&&show._changeSlide){
    show._changeSlide(dir);
  }
}
initSlideshows();

// ── Project modal ─────────────────────────────────────────────────────────────
const content={
  steel:{
    no:'01',
    brand:'<img src="./images/tata-steel.png" alt="Tata Steel" class="modal-brand-img">',
    title:'TMT STEEL ANALYZER',
    body:`
      <div class="modal-role">Tata Steel • Center of Excellence for Agentic Twins</div>
      <p class="modal-summary">Designed and engineered an industrial-grade, modular computer vision pipeline in Python for automated rib and ring quality testing of TMT steel rebar across 500+ test samples.</p>
      
      <div class="modal-media-gallery">
        <div class="gallery-item"><img src="./images/tmt-portal.jpg" alt="TMT Quality Inspection Portal Login"><label>SECURE QUALITY INSPECTION PORTAL</label></div>
        <div class="gallery-item"><img src="./images/tmt-dashboard.jpg" alt="TMT Rebar Dimensional Analysis Interface"><label>LIVE REBAR DIMENSIONAL &amp; RING ANALYSIS</label></div>
      </div>

      <div class="modal-metrics-grid">
        <div class="metric-card"><strong>96.4%</strong><span>Overall Accuracy</span></div>
        <div class="metric-card"><strong>0.118 mm</strong><span>MAE Diameter</span></div>
        <div class="metric-card"><strong>1.32 s</strong><span>Avg Latency</span></div>
        <div class="metric-card"><strong>96.6%</strong><span>F1 Score (P/R &gt;96%)</span></div>
      </div>

      <div class="modal-details-section">
        <h4>ENGINEERING &amp; ARCHITECTURAL HIGHLIGHTS</h4>
        <ul>
          <li><strong>6-Feature Geometry Engine:</strong> Extracted rib count, rib spacing, angle, height, length, and AR values across rib and ring tests.</li>
          <li><strong>Precision Rule-Based Decision Logic:</strong> Reduced Mean Absolute Error (MAE) to 0.118 mm for diameter calculations and 1.06° for transverse angles to standardize accept/reject decisions.</li>
          <li><strong>Industrial Image Processing:</strong> Optimized OpenCV routines under lighting variability, surface defects, and motion blur to ensure rock-solid production reliability.</li>
        </ul>
      </div>

      <div class="modal-stack">
        <small>TECHNOLOGIES</small>
        <span>Computer Vision</span><span>Python</span><span>OpenCV</span><span>Image Segmentation</span><span>Edge Inference</span><span>Quality Assurance</span>
      </div>
    `
  },
  deepfake:{
    no:'02',
    brand:'<img src="./images/srm.png" alt="SRM Institute of Science and Technology" class="modal-brand-img modal-srm">',
    title:'INTERPRETABLE DEEP-FAKE DETECTION',
    body:`
      <div class="modal-role">UROP — SRMIST KTR • Under Asst. Prof. Dr. Kiruthika M.</div>
      <p class="modal-summary">Designed an interpretable deep-fake detection framework achieving 93.2% classification accuracy on benchmark datasets, combining deep learning-based synthetic media detection with feature-level visual explanations (XAI).</p>
      
      <div class="modal-metrics-grid">
        <div class="metric-card"><strong>93.2%</strong><span>Detection Accuracy</span></div>
        <div class="metric-card"><strong>4.8%</strong><span>False-Positive Rate</span></div>
        <div class="metric-card"><strong>XAI</strong><span>Visual Explanations</span></div>
      </div>

      <div class="modal-details-section">
        <h4>ENGINEERING &amp; RESEARCH HIGHLIGHTS</h4>
        <ul>
          <li>Integrated CNN and feature-level explanations to interpret and localize media manipulation regions.</li>
          <li>Significantly reduced false alarms (4.8% FPR) and strengthened trustworthiness in media forensics.</li>
        </ul>
      </div>

      <div class="modal-stack">
        <small>TECHNOLOGIES</small>
        <span>Deep Learning</span><span>Explainable AI (XAI)</span><span>CNN</span><span>PyTorch</span><span>Media Forensics</span>
      </div>
    `
  },
  dimex:{
    no:'03',
    brand:`<div class="modal-brand-duo"><img src="./images/tpi-logo.png" alt="Tube Products of India" class="modal-brand-img modal-tpi"><img src="./images/murugappa.png" alt="Murugappa Group" class="modal-brand-img modal-muru"></div>`,
    title:'DIMEX — STEEL INTELLIGENCE PLATFORM',
    body:`
      <div class="modal-role">Murugappa Group • Tube Products of India (TPI)</div>
      <p class="modal-summary">A locally deployed, offline-capable enterprise AI platform that centralizes technical steel grade compositions, actual TDC &amp; MTC specifications, conversational AI retrieval, and interactive analytics.</p>
      
      <div class="modal-media-gallery modal-triple-media">
        <div class="gallery-item"><img src="./images/dimex-analytics.png" alt="DIMEX Analytics Dashboard &amp; Control Charts"><label>LIVE MTC VS TDC STATISTICAL CONTROL CHARTS</label></div>
        <div class="gallery-item"><img src="./images/dimex-database.png" alt="DIMEX Database TDC Range Manager"><label>TDC STANDARD RANGE MANAGER &amp; CHEMICAL INVENTORY</label></div>
        <div class="gallery-item"><img src="./images/dimex-login.png" alt="DIMEX Portal Login"><label>SECURE LOCAL ENTERPRISE AUTHENTICATION</label></div>
      </div>

      <div class="modal-metrics-grid">
        <div class="metric-card"><strong>100%</strong><span>Offline / Local</span></div>
        <div class="metric-card"><strong>75+</strong><span>Grades Indexed</span></div>
        <div class="metric-card"><strong>TDC &amp; MTC</strong><span>Actual Test Data</span></div>
        <div class="metric-card"><strong>Instant</strong><span>Conversational RAG</span></div>
      </div>

      <div class="modal-details-section">
        <h4>CORE SYSTEM WORKFLOW</h4>
        <p style="font-size:12px;margin:0 0 12px;font-family:var(--m);color:var(--r);font-weight:700">TDC / MTC / Steel Data → Structured Knowledge Base → Local Retrieval Engine → Conversational AI → Analysis &amp; Comparison → Interactive Dashboard</p>
        <ul>
          <li><strong>Offline Enterprise Data Privacy:</strong> Runs 100% locally within the organization's infrastructure with zero external cloud dependencies for sensitive metallurgy data.</li>
          <li><strong>Chemical &amp; Physical Intelligence:</strong> Instant retrieval and comparison of C, Mn, Si, Cr, Ni, Mo, S, P limits alongside tensile strength, yield strength, elongation, and hardness.</li>
          <li><strong>Conversational Engineering Assistant:</strong> Natural language query engine over structured database + technical documents, eliminating manual spreadsheet lookups.</li>
          <li><strong>Statistical Analytics &amp; Control Charts:</strong> Visualizes MTC observations against TDC standard tolerance bands (UCL/LCL), box plots, and historical query continuity.</li>
        </ul>
      </div>

      <div class="modal-stack">
        <small>TECHNOLOGIES</small>
        <span>Offline AI / RAG</span><span>Python</span><span>Conversational AI</span><span>Structured Knowledge Base</span><span>Statistical Analytics</span><span>Enterprise Data Privacy</span>
      </div>
    `
  },
  mrv:{
    no:'04',
    brand:'<img src="./images/mahindra.png" alt="Mahindra Research Valley" class="modal-brand-img">',
    title:'MRV SUSTAINABILITY MONITORING SYSTEM',
    body:`
      <div class="modal-role">Mahindra Research Valley • AI &amp; Computer Vision System</div>
      <p class="modal-summary">An AI-powered sustainability monitoring platform that uses existing CCTV infrastructure to track occupancy, intelligently control energy-consuming appliances, and quantify real-time energy and carbon savings.</p>
      
      <div class="modal-media-gallery modal-single-media">
        <div class="gallery-item"><img src="./images/mrv-dashboard.jpg" alt="MRV Smart Energy &amp; Occupancy Dashboard"><label>LIVE ZONE OCCUPANCY TRACKING &amp; APPLIANCE CONTROL DASHBOARD</label></div>
      </div>

      <div class="modal-metrics-grid">
        <div class="metric-card"><strong>93.1%</strong><span>Event Detection</span></div>
        <div class="metric-card"><strong>&lt;190 ms</strong><span>Edge Latency</span></div>
        <div class="metric-card"><strong>~30%</strong><span>Energy Saved</span></div>
        <div class="metric-card"><strong>5 Zones</strong><span>Automated Control</span></div>
      </div>

      <div class="modal-details-section">
        <h4>CORE SYSTEM ARCHITECTURE &amp; WORKFLOW</h4>
        <p style="font-size:12.5px;margin:0 0 12px;font-family:var(--m);color:var(--r);font-weight:700">CCTV Feed → Person Detection &amp; Tracking → Real-Time Headcount → Occupancy Analysis → Appliance Decision → ON/OFF Control → Energy Monitoring → Sustainability Dashboard</p>
        <ul>
          <li><strong>Real-time Anonymous Tracking:</strong> Processes continuous live CCTV streams to detect and track occupants without facial storage, maintaining accurate zone headcounts and entry/exit rates.</li>
          <li><strong>Intelligent Automated Appliance Control:</strong> Actuates electrical loads (ACs, lights, fans) based on real-time room occupancy instead of running continuously on static schedules.</li>
          <li><strong>Comprehensive Energy Analytics:</strong> Measures power consumption (kWh), peak demand, idle energy waste, and calculated CO₂ emissions avoided.</li>
        </ul>
      </div>

      <div class="modal-stack">
        <small>TECHNOLOGIES</small>
        <span>Computer Vision</span><span>Python</span><span>OpenCV</span><span>YOLO Inference</span><span>Edge Computing</span><span>IoT Load Control</span><span>Sustainability Analytics</span>
      </div>
    `
  }
};

const modal=document.querySelector('#modal');
const cursorHome=cursor.parentElement;   // remember original parent (body)
document.querySelectorAll('.project-card').forEach(card=>card.addEventListener('click',()=>{
  const d=content[card.dataset.project];
  if(!d)return;
  const brandEl=document.querySelector('#modalBrand');
  if(brandEl)brandEl.innerHTML=d.brand||'';
  document.querySelector('#modalNo').textContent=d.no;
  document.querySelector('#modalTitle').textContent=d.title;
  document.querySelector('#modalBody').innerHTML=d.body;
  modal.showModal();
  // Move cursor into the dialog so it joins the top layer and stays visible
  modal.append(cursor);
}));
document.querySelector('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.open)modal.close()});
// Return cursor to normal document flow when modal closes
modal.addEventListener('close',()=>{
  cursorHome.append(cursor);
  cursor.style.background='var(--r)';
});

const dimexExperience=document.querySelectorAll('.experience-list article')[2];
const dimexBullets=dimexExperience?.querySelector('.exp-bullets');
if(dimexBullets){
  dimexBullets.innerHTML='<li><strong>100% Offline &amp; Air-Gapped Architecture:</strong> Built enterprise-local conversational AI and retrieval system ensuring strict metallurgy IP protection with zero external cloud dependencies.</li><li><strong>75+ Steel Grades Indexed:</strong> Structured 12+ chemical and physical properties across the DIMEX knowledge base, turning fragmented TDC and MTC records into instant engineering comparisons.</li><li><strong>85% Reduction in Query Time:</strong> Replaced manual spreadsheet lookups with conversational retrieval and standardized grade-level search for plant metallurgists.</li><li><strong>Statistical Quality Control:</strong> Implemented interactive MTC vs TDC tolerance charts with Upper/Lower Control Limits (UCL/LCL) and distribution histograms, accelerating grade selection and exception review.</li>';
}

const experienceModal=document.createElement('dialog');
experienceModal.id='experience-modal';
experienceModal.innerHTML='<button class="close experience-close" aria-label="Close experience details">×</button><div class="experience-modal-inner"><div class="experience-modal-top"><span class="experience-modal-kicker">FIELD NOTE / <span id="experienceModalNo">01</span></span><span id="experienceModalMeta"></span></div><div class="experience-ticket-body"><div class="experience-modal-brand" id="experienceModalBrand"></div><div class="experience-modal-copy"><h2 id="experienceModalTitle"></h2><div class="experience-modal-role" id="experienceModalRole"></div><p class="experience-modal-lead" id="experienceModalLead"></p></div></div><div class="experience-modal-details" id="experienceModalDetails"></div></div>';
document.body.append(experienceModal);
const experienceModalNo=document.querySelector('#experienceModalNo');
const experienceModalMeta=document.querySelector('#experienceModalMeta');
const experienceModalTitle=document.querySelector('#experienceModalTitle');
const experienceModalBrand=document.querySelector('#experienceModalBrand');
const experienceModalRole=document.querySelector('#experienceModalRole');
const experienceModalLead=document.querySelector('#experienceModalLead');
const experienceModalDetails=document.querySelector('#experienceModalDetails');
document.querySelectorAll('.experience-list article').forEach((article,index)=>{
  const details=article.querySelector('.exp-bullets');
  const tags=article.querySelector('.exp-tags');
  const meta=article.querySelector('.exp-meta');
  if(!details||!tags||!experienceModal)return;
  if(index===0){
    const location=article.querySelector('.exp-meta span');
    if(location)location.textContent='CHENNAI, IN';
  }
  const openButton=document.createElement('button');
  openButton.className='exp-toggle';
  openButton.type='button';
  openButton.innerHTML='TAP ANYWHERE TO INSPECT <span>↗</span>';
  article.querySelector('.exp-lead')?.after(openButton);
  article.setAttribute('tabindex','0');
  article.setAttribute('role','button');
  const openExperience=event=>{
    if(event.target.closest('.exp-toggle'))return;
    experienceModalNo.textContent=article.querySelector('.exp-no')?.textContent||String(index+1).padStart(2,'0');
    experienceModalMeta.innerHTML=meta?.innerHTML||'';
    experienceModalBrand.innerHTML=article.querySelector('.company-mark')?.outerHTML||'';
    experienceModalTitle.textContent=article.querySelector('h3')?.textContent||'';
    experienceModalRole.textContent=article.querySelector('.exp-role-sub')?.textContent||'';
    experienceModalLead.innerHTML=article.querySelector('.exp-lead')?.innerHTML||'';
    experienceModalDetails.innerHTML=`${details.outerHTML}${tags.outerHTML}`;
    experienceModal.showModal();
    experienceModal.append(cursor);
    cursor.classList.add('modal-cursor');
  };
  article.addEventListener('click',openExperience);
  article.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openExperience(event)}});
  openButton.addEventListener('click',event=>{
    event.stopPropagation();
    openExperience(event);
  });
});
document.querySelector('.experience-close')?.addEventListener('click',()=>experienceModal?.close());
experienceModal?.addEventListener('click',event=>{if(event.target===experienceModal)experienceModal.close()});
experienceModal?.addEventListener('close',()=>{
  cursorHome.append(cursor);
  cursor.classList.remove('modal-cursor');
  cursor.style.background='var(--r)';
});

