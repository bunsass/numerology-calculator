// Ensure GSAP is included via CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
// Ensure Chart.js is included for pinnacle chart: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// Ensure jsPDF is included for PDF download: <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

const CURRENT_YEAR = new Date().getFullYear();

// Global translation object - loaded from JSON
let translations = {};
let currentLang = 'vi';

// Load translations from JSON files
async function loadTranslations(lang) {
  try {
    const response = await fetch(`./i18n/${lang}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    translations = await response.json();
    currentLang = lang;
    updateTranslations();
    
    // Re-run calculations if results exist
    if(document.getElementById('summary').innerHTML) calculateNumerology();
    if(document.getElementById('dailyForecast').innerHTML) calculateDailyForecast();
    if(document.getElementById('compatForecast').innerHTML) calculateCompatibilityForecast();
    if(document.getElementById('nameSuggestResult').innerHTML) calculateNameSuggestions();
  } catch (error) {
    console.error('Failed to load translations:', error);
    alert(`Failed to load language file: ${lang}.json`);
  }
}

// Update UI with current translations
function updateTranslations() {
  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations.ui && translations.ui[key]) {
      el.textContent = translations.ui[key];
    }
  });
  
  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations.ui && translations.ui[key]) {
      el.placeholder = translations.ui[key];
    }
  });
  
  // Update tooltips
  const tooltipMap = {
    'langToggle': 'tooltipLangToggle',
    'themeToggle': 'tooltipThemeToggle',
    'menuToggle': 'tooltipMenuToggle',
    'calculateBtn': 'tooltipCalculate',
    'clearBtn': 'tooltipClear',
    'dailyCalculateBtn': 'tooltipDailyCalculate',
    'dailyClearBtn': 'tooltipClear',
    'compatCalculateBtn': 'tooltipCompatCalculate',
    'compatClearBtn': 'tooltipClear',
    'nameSuggestCalculateBtn': 'tooltipNameSuggestCalculate',
    'nameSuggestClearBtn': 'tooltipClear'
  };
  
  Object.keys(tooltipMap).forEach(id => {
    const el = document.getElementById(id);
    if (el && translations.ui && translations.ui[tooltipMap[id]]) {
      el.setAttribute('data-tooltip-text', translations.ui[tooltipMap[id]]);
    }
  });
  
  // Update tab tooltips
  const tabs = {
    'main': 'tooltipTabMain',
    'daily': 'tooltipTabDaily',
    'compat': 'tooltipTabCompat',
    'nameSuggest': 'tooltipTabNameSuggest'
  };
  
  Object.keys(tabs).forEach(tab => {
    const el = document.querySelector(`[data-tab="${tab}"]`);
    if (el && translations.ui && translations.ui[tabs[tab]]) {
      el.setAttribute('data-tooltip-text', translations.ui[tabs[tab]]);
    }
  });
  
  // Update result button tooltips if they exist
  const resultBtns = {
    'downloadReportBtn': 'tooltipDownload',
    'showMoreBtn': 'tooltipShowDetails',
    'showCalcBtn': 'tooltipShowCalc',
    'showMeaningsBtn': 'tooltipShowMeanings',
    'dailyShowCalcBtn': 'tooltipDailyShowCalc',
    'compatShowCalcBtn': 'tooltipCompatShowCalc'
  };
  
  Object.keys(resultBtns).forEach(id => {
    const el = document.getElementById(id);
    if (el && translations.ui && translations.ui[resultBtns[id]]) {
      el.setAttribute('data-tooltip-text', translations.ui[resultBtns[id]]);
    }
  });
}

// Helper function to get translated text with placeholder replacement
function t(key, replacements = {}) {
  let text = translations.ui && translations.ui[key] ? translations.ui[key] : key;
  Object.keys(replacements).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  });
  return text;
}

// Normalize Vietnamese text
const normalizeName = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();

// Populate dropdowns
function populateDropdowns() {
  ['day','dailyDay','compatDay1','compatDay2','nameSuggestDay'].forEach(id => {
    const sel = document.getElementById(id);
    for(let i=1; i<=31; i++) sel.innerHTML += `<option value="${i}">${i}</option>`;
  });
  ['month','dailyMonth','compatMonth1','compatMonth2','nameSuggestMonth'].forEach(id => {
    const sel = document.getElementById(id);
    for(let i=1; i<=12; i++) sel.innerHTML += `<option value="${i}">${i}</option>`;
  });
}

// Input restrictions
['year','dailyYear','compatYear1','compatYear2','nameSuggestYear'].forEach(id => {
  document.getElementById(id).addEventListener('input', e => e.target.value = e.target.value.slice(0,4));
});
['fullName','compatName1','compatName2'].forEach(id => {
  document.getElementById(id).addEventListener('input', e => e.target.value = normalizeName(e.target.value));
});

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const reduceToSingleDigit = (num, allowMaster = false) => {
  if(allowMaster && [11,22,33].includes(num)) return num;
  while(num > 9) num = String(num).split('').reduce((s,d) => s + +d, 0);
  return num;
};

const getLetterValue = l => ({'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,'g':7,'h':8,'i':9,'j':1,'k':2,'l':3,'m':4,'n':5,'o':6,'p':7,'q':8,'r':9,'s':1,'t':2,'u':3,'v':4,'w':5,'x':6,'y':7,'z':8}[l.toLowerCase()] || 0);

const isVowel = (l, prev, next) => {
  l = l.toLowerCase();
  if(['a','e','i','o','u'].includes(l)) return true;
  if(l === 'y') return !prev || !next || !['a','e','i','o','u'].includes(prev?.toLowerCase()) && !['a','e','i','o','u'].includes(next?.toLowerCase());
  return false;
};

const sumDigits = str => String(str).split('').reduce((s,d) => s + +d, 0);

// LocalStorage functions
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadData = key => {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
};

function calculatePinnacleNumbers(d, m, y, lpn) {
  const p1 = reduceToSingleDigit(d + m, true);
  const ys = sumDigits(y);
  const p2 = reduceToSingleDigit(d + ys, true);
  const p3 = reduceToSingleDigit(p1 + p2, true);
  const p4 = reduceToSingleDigit(m + ys, true);
  const a1 = 36 - lpn - 9;
  return {
    firstPinnacle: p1,
    secondPinnacle: p2,
    thirdPinnacle: p3,
    fourthPinnacle: p4,
    firstPinnacleAge: `${a1} - ${a1 + 9}`,
    secondPinnacleAge: `${a1 + 9} - ${a1 + 18}`,
    thirdPinnacleAge: `${a1 + 18} - ${a1 + 27}`,
    fourthPinnacleAge: currentLang === 'vi' ? `${a1 + 27} trở đi` : `${a1 + 27} onwards`
  };
}

function calculateAdditionalNumbers(name, d, m, y) {
  let eSum = 0;
  const hp = {};
  name.split('').forEach(l => {
    if(/[a-z]/.test(l)) {
      const v = getLetterValue(l);
      eSum += v;
      hp[v] = (hp[v] || 0) + 1;
    }
  });
  const hpn = Object.keys(hp).reduce((a,b) => hp[a] > hp[b] ? a : b, 0);
  const ys = reduceToSingleDigit(y);
  return {
    expressionNumber: reduceToSingleDigit(eSum, true),
    hiddenPassionNumber: +hpn,
    birthDayNumber: reduceToSingleDigit(d),
    challenge1: reduceToSingleDigit(Math.abs(d - m)),
    challenge2: reduceToSingleDigit(Math.abs(d - ys)),
    challenge3: reduceToSingleDigit(Math.abs(reduceToSingleDigit(Math.abs(d - m)) - reduceToSingleDigit(Math.abs(d - ys)))),
    challenge4: reduceToSingleDigit(Math.abs(m - ys))
  };
}

function calculateDailyNumber(d, m, y) {
  const cy = new Date().getFullYear(), cm = new Date().getMonth()+1, cd = new Date().getDate();
  const py = reduceToSingleDigit(d + m + cy, true);
  const pm = reduceToSingleDigit(py + cm);
  return {personalYear:py, personalMonth:pm, personalDay:reduceToSingleDigit(pm + cd)};
}

function calculateCompatibility(n1, d1, m1, y1, n2, d2, m2, y2) {
  const lpn1 = reduceToSingleDigit(sumDigits(d1) + sumDigits(m1) + sumDigits(y1), true);
  const lpn2 = reduceToSingleDigit(sumDigits(d2) + sumDigits(m2) + sumDigits(y2), true);
  const en1 = reduceToSingleDigit(n1.split('').reduce((s,l) => /[a-z]/.test(l) ? s + getLetterValue(l) : s, 0), true);
  const en2 = reduceToSingleDigit(n2.split('').reduce((s,l) => /[a-z]/.test(l) ? s + getLetterValue(l) : s, 0), true);

  const cm = {
    1:{1:90,2:70,3:80,4:60,5:75,6:65,7:70,8:85,9:80,11:90,22:70,33:80},
    2:{1:70,2:95,3:65,4:85,5:60,6:90,7:80,8:65,9:75,11:70,22:85,33:90},
    3:{1:80,2:65,3:90,4:60,5:85,6:75,7:70,8:65,9:90,11:80,22:60,33:85},
    4:{1:60,2:85,3:60,4:90,5:65,6:80,7:75,8:85,9:70,11:60,22:90,33:80},
    5:{1:75,2:60,3:85,4:65,5:90,6:70,7:80,8:65,9:85,11:75,22:65,33:70},
    6:{1:65,2:90,3:75,4:80,5:70,6:95,7:65,8:75,9:85,11:70,22:80,33:90},
    7:{1:70,2:80,3:70,4:75,5:80,6:65,7:90,8:60,9:75,11:85,22:70,33:80},
    8:{1:85,2:65,3:65,4:85,5:65,6:75,7:60,8:90,9:70,11:65,22:85,33:75},
    9:{1:80,2:75,3:90,4:70,5:85,6:85,7:75,8:70,9:95,11:80,22:70,33:90},
    11:{1:90,2:70,3:80,4:60,5:75,6:70,7:85,8:65,9:80,11:95,22:70,33:90},
    22:{1:70,2:85,3:60,4:90,5:65,6:80,7:70,8:85,9:70,11:70,22:95,33:80},
    33:{1:80,2:90,3:85,4:80,5:70,6:90,7:80,8:75,9:90,11:90,22:80,33:95}
  };

  const oc = Math.round((cm[lpn1][lpn2] + cm[en1][en2]) / 2);
  const desc = oc >= 90 ? (currentLang === 'vi' ? "Mức độ tương hợp tuyệt vời! Hai bạn có sự kết nối mạnh mẽ về cả tinh thần và tính cách, dễ dàng hỗ trợ và thấu hiểu nhau." : "Excellent compatibility! You share a strong connection in both spirit and personality, easily supporting and understanding each other.") :
               oc >= 80 ? (currentLang === 'vi' ? "Mức độ tương hợp cao! Hai bạn có nhiều điểm chung, nhưng cần chú ý giao tiếp để duy trì sự hài hòa." : "High compatibility! You have much in common, but need to focus on communication to maintain harmony.") :
               oc >= 70 ? (currentLang === 'vi' ? "Mức độ tương hợp tốt. Mối quan hệ có tiềm năng, nhưng cần nỗ lực để vượt qua một số khác biệt." : "Good compatibility. The relationship has potential, but requires effort to overcome some differences.") :
               oc >= 60 ? (currentLang === 'vi' ? "Mức độ tương hợp trung bình. Hai bạn có thể gặp một số thách thức, cần kiên nhẫn và thấu hiểu." : "Moderate compatibility. You may face some challenges, requiring patience and understanding.") :
               (currentLang === 'vi' ? "Mức độ tương hợp thấp. Hai bạn cần làm việc nhiều để hiểu và hòa hợp với nhau." : "Low compatibility. You need to work hard to understand and harmonize with each other.");

  return {lifePathNumber1:lpn1, expressionNumber1:en1, lifePathNumber2:lpn2, expressionNumber2:en2, overallCompat:oc, description:desc, lifePathCompat:cm[lpn1][lpn2], expressionCompat:cm[en1][en2]};
}

const isValidDate = (d, m, y) => {
  const date = new Date(y, m-1, d);
  return date.getDate() === d && date.getMonth() === m-1 && date.getFullYear() === y && y >= 1900 && y <= CURRENT_YEAR;
};

const toggleDetails = (div, btn, hideText, showText) => {
  div.classList.toggle('details-hidden');
  div.classList.toggle('details-shown');
  btn.textContent = t(div.classList.contains('details-shown') ? hideText : showText);
};

function clearFields(inputIds, resultId) {
  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if(el.tagName === 'INPUT') el.value = '';
    else if(el.tagName === 'SELECT') el.selectedIndex = 0;
  });
  document.getElementById(resultId).innerHTML = '';
  ['showMoreBtn','showCalcBtn','showMeaningsBtn','downloadReportBtn','dailyShowCalcBtn','compatShowCalcBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.classList.add('hidden');
  });
  ['details','calculationDetails','meanings','dailyCalculationDetails','compatCalculationDetails'].forEach(id => {
    const el = document.getElementById(id);
    if(el) {
      el.classList.remove('details-shown');
      el.classList.add('details-hidden');
    }
  });
}

function calculateNumerology() {
  const name = document.getElementById('fullName').value.trim();
  const d = parseInt(document.getElementById('day').value);
  const m = parseInt(document.getElementById('month').value);
  const y = parseInt(document.getElementById('year').value);
  const sumDiv = document.getElementById('summary');

  if(!name || !/^[a-z\s]*$/.test(name)) {
    sumDiv.innerHTML = `<p class="text-red-500 font-medium">${t('errorInvalidName')}</p>`;
    return;
  }
  if(!isValidDate(d,m,y)) {
    sumDiv.innerHTML = `<p class="text-red-500 font-medium">${t('errorInvalidDate')}</p>`;
    return;
  }

  saveData('mainInputs', {name, d, m, y});

  document.getElementById('calculateBtn').disabled = true;

  setTimeout(() => {

    const lpn = reduceToSingleDigit(sumDigits(d) + sumDigits(m) + sumDigits(y), true);
    let suSum = 0, pSum = 0;
    const suSteps = [], pSteps = [];
    name.split('').forEach((l,i) => {
      if(/[a-z]/.test(l)) {
        const v = getLetterValue(l);
        if(isVowel(l, name[i-1], name[i+1])) {
          suSum += v;
          suSteps.push(`${l.toUpperCase()}=${v}`);
        } else {
          pSum += v;
          pSteps.push(`${l.toUpperCase()}=${v}`);
        }
      }
    });
    const sun = reduceToSingleDigit(suSum, true);
    const pn = reduceToSingleDigit(pSum, true);
    const add = calculateAdditionalNumbers(name, d, m, y);
    const pin = calculatePinnacleNumbers(d, m, y, lpn);

    sumDiv.innerHTML = `<div class="result-card"><h2>${t('tabOverview')}</h2>
      <p><strong>${t('lifePath')}:</strong> ${lpn}</p>
      <p><strong>${t('soulUrge')}:</strong> ${sun}</p>
      <p><strong>${t('personality')}:</strong> ${pn}</p>
      <p><strong>${t('expression')}:</strong> ${add.expressionNumber}</p>
      <p><strong>${t('hiddenPassion')}:</strong> ${add.hiddenPassionNumber}</p>
      <p><strong>${t('birthDay')}:</strong> ${add.birthDayNumber}</p>
      <p><strong>${t('challenge1')}:</strong> ${add.challenge1}</p>
      <p><strong>${t('challenge2')}:</strong> ${add.challenge2}</p>
      <p><strong>${t('challenge3')}:</strong> ${add.challenge3}</p>
      <p><strong>${t('challenge4')}:</strong> ${add.challenge4}</p>
      <p><strong>${t('pinnacle1', {age: pin.firstPinnacleAge})}:</strong> ${pin.firstPinnacle}</p>
      <p><strong>${t('pinnacle2', {age: pin.secondPinnacleAge})}:</strong> ${pin.secondPinnacle}</p>
      <p><strong>${t('pinnacle3', {age: pin.thirdPinnacleAge})}:</strong> ${pin.thirdPinnacle}</p>
      <p><strong>${t('pinnacle4', {age: pin.fourthPinnacleAge})}:</strong> ${pin.fourthPinnacle}</p></div>`;

    document.getElementById('details').innerHTML = `<div class="result-card"><h2>${t('btnShowDetails')}</h2>
      <p><strong>${t('lifePath')}:</strong> ${lpn} - ${translations.meanings[lpn]}</p>
      <p><strong>${t('soulUrge')}:</strong> ${sun} - ${translations.meanings[sun]}</p>
      <p><strong>${t('personality')}:</strong> ${pn} - ${translations.meanings[pn]}</p>
      <p><strong>${t('expression')}:</strong> ${add.expressionNumber} - ${translations.meanings[add.expressionNumber]}</p>
      <p><strong>${t('hiddenPassion')}:</strong> ${add.hiddenPassionNumber} - ${translations.meanings[add.hiddenPassionNumber]}</p>
      <p><strong>${t('birthDay')}:</strong> ${add.birthDayNumber} - ${translations.meanings[add.birthDayNumber]}</p>
      <p><strong>${t('challenge1')}:</strong> ${add.challenge1} - ${translations.challengeMeanings[add.challenge1]}</p>
      <p><strong>${t('challenge2')}:</strong> ${add.challenge2} - ${translations.challengeMeanings[add.challenge2]}</p>
      <p><strong>${t('challenge3')}:</strong> ${add.challenge3} - ${translations.challengeMeanings[add.challenge3]}</p>
      <p><strong>${t('challenge4')}:</strong> ${add.challenge4} - ${translations.challengeMeanings[add.challenge4]}</p>
      <p><strong>${t('pinnacle1', {age: pin.firstPinnacleAge})}:</strong> ${pin.firstPinnacle} - ${translations.meanings[pin.firstPinnacle]} <strong>${t('advice')}:</strong> ${translations.pinnacleAdvice[pin.firstPinnacle]}</p>
      <p><strong>${t('pinnacle2', {age: pin.secondPinnacleAge})}:</strong> ${pin.secondPinnacle} - ${translations.meanings[pin.secondPinnacle]} <strong>${t('advice')}:</strong> ${translations.pinnacleAdvice[pin.secondPinnacle]}</p>
      <p><strong>${t('pinnacle3', {age: pin.thirdPinnacleAge})}:</strong> ${pin.thirdPinnacle} - ${translations.meanings[pin.thirdPinnacle]} <strong>${t('advice')}:</strong> ${translations.pinnacleAdvice[pin.thirdPinnacle]}</p>
      <p><strong>${t('pinnacle4', {age: pin.fourthPinnacleAge})}:</strong> ${pin.fourthPinnacle} - ${translations.meanings[pin.fourthPinnacle]} <strong>${t('advice')}:</strong> ${translations.pinnacleAdvice[pin.fourthPinnacle]}</p>
      <canvas id="pinnacleChart"></canvas></div>`;

    document.getElementById('calculationDetails').innerHTML = `<div class="result-card"><h2>${t('btnShowCalc')}</h2>
      <p><strong>${t('lifePath')}:</strong> ${d}→${String(d).split('').join('+')} + ${m}→${String(m).split('').join('+')} + ${y}→${String(y).split('').join('+')} = ${sumDigits(d)+sumDigits(m)+sumDigits(y)} → ${lpn}</p>
      <p><strong>${t('soulUrge')}:</strong> ${suSteps.join(', ')} = ${suSum} → ${sun}</p>
      <p><strong>${t('personality')}:</strong> ${pSteps.join(', ')} = ${pSum} → ${pn}</p>
      <p><strong>${t('expression')}:</strong> ${currentLang === 'vi' ? 'Tổng tất cả chữ cái' : 'Sum of all letters'} = ${add.expressionNumber}</p>
      <p><strong>${t('birthDay')}:</strong> ${d} → ${add.birthDayNumber}</p>
      <p><strong>${t('challenge1')}:</strong> |${d}-${m}| = ${add.challenge1}</p>
      <p><strong>${t('challenge2')}:</strong> |${d}-${sumDigits(y)}| = ${add.challenge2}</p>
      <p><strong>${t('challenge3')}:</strong> |${add.challenge1}-${add.challenge2}| = ${add.challenge3}</p>
      <p><strong>${t('challenge4')}:</strong> |${m}-${sumDigits(y)}| = ${add.challenge4}</p>
      <p><strong>${t('pinnacle1', {age: pin.firstPinnacleAge})}:</strong> ${d}+${m} = ${d+m} → ${pin.firstPinnacle}</p>
      <p><strong>${t('pinnacle2', {age: pin.secondPinnacleAge})}:</strong> ${d}+${sumDigits(y)} = ${d+sumDigits(y)} → ${pin.secondPinnacle}</p>
      <p><strong>${t('pinnacle3', {age: pin.thirdPinnacleAge})}:</strong> ${pin.firstPinnacle}+${pin.secondPinnacle} → ${pin.thirdPinnacle}</p>
      <p><strong>${t('pinnacle4', {age: pin.fourthPinnacleAge})}:</strong> ${m}+${sumDigits(y)} = ${m+sumDigits(y)} → ${pin.fourthPinnacle}</p></div>`;

    document.getElementById('meanings').innerHTML = `<div class="result-card"><h2>${t('btnShowMeanings')}</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>${t('lifePath')}:</strong> ${currentLang === 'vi' ? 'Con đường sống và mục đích chính.' : 'Life path and core purpose.'}</li>
        <li><strong>${t('soulUrge')}:</strong> ${currentLang === 'vi' ? 'Mong muốn nội tâm và động lực sâu xa.' : 'Inner desires and motivation.'}</li>
        <li><strong>${t('personality')}:</strong> ${currentLang === 'vi' ? 'Cách thể hiện bản thân ra bên ngoài.' : 'How you present yourself externally.'}</li>
        <li><strong>${t('expression')}:</strong> ${currentLang === 'vi' ? 'Cách tương tác và thể hiện tài năng.' : 'How you interact and express talents.'}</li>
        <li><strong>${t('hiddenPassion')}:</strong> ${currentLang === 'vi' ? 'Đam mê tiềm ẩn hoặc phẩm chất nổi bật.' : 'Hidden passion or prominent trait.'}</li>
        <li><strong>${t('birthDay')}:</strong> ${currentLang === 'vi' ? 'Đặc điểm và năng lượng ngày sinh.' : 'Traits and energy of birth day.'}</li>
        <li><strong>${currentLang === 'vi' ? 'Con số đỉnh cao' : 'Pinnacle Numbers'}:</strong> ${currentLang === 'vi' ? 'Giai đoạn quan trọng trong cuộc đời.' : 'Significant life phases.'}</li>
        <li><strong>${currentLang === 'vi' ? 'Con số thách thức' : 'Challenge Numbers'}:</strong> ${currentLang === 'vi' ? 'Những thử thách cần vượt qua.' : 'Challenges to overcome.'}</li>
      </ul></div>`;

    new Chart(document.getElementById('pinnacleChart'), {
      type: 'line',
      data: {
        labels: [`${pin.firstPinnacleAge}`, `${pin.secondPinnacleAge}`, `${pin.thirdPinnacleAge}`, `${pin.fourthPinnacleAge}`],
        datasets: [{
          label: currentLang === 'vi' ? 'Con số đỉnh cao' : 'Pinnacle Numbers',
          data: [pin.firstPinnacle, pin.secondPinnacle, pin.thirdPinnacle, pin.fourthPinnacle],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: currentLang === 'vi' ? 'Giá Trị Thần Số Học' : 'Numerology Value' } },
          x: { title: { display: true, text: currentLang === 'vi' ? 'Các Giai Đoạn Đỉnh Cao' : 'Life Peaks' } }
        }
      }
    });

    ['showMoreBtn','showCalcBtn','showMeaningsBtn','downloadReportBtn'].forEach(id => document.getElementById(id).classList.remove('hidden'));
    ['details','calculationDetails','meanings'].forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove('details-shown');
      el.classList.add('details-hidden');
    });

    // PDF Download Handler
    document.getElementById('downloadReportBtn').onclick = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      const stripHtml = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
      };
      
      let yPos = 15;
      const lineHeight = 7;
      const pageHeight = 280;
      const maxWidth = 180;
      
      const addText = (text, fontSize = 10) => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
          if (yPos > pageHeight) {
            doc.addPage();
            yPos = 15;
          }
          doc.text(line, 10, yPos);
          yPos += lineHeight;
        });
      };
      
      addText(currentLang === 'vi' ? 'BAO CAO THAN SO HOC' : 'NUMEROLOGY REPORT', 18);
      yPos += 3;
      
      addText(`${t('labelFullName')}: ${name}`, 12);
      addText(`${t('labelBirthDate')}: ${d}/${m}/${y}`, 12);
      yPos += 3;
      
      addText(`${t('lifePath')}: ${lpn}`, 11);
      addText(stripHtml(translations.meaningsPDF[lpn]));
      yPos += 2;
      
      addText(`${t('soulUrge')}: ${sun}`, 11);
      addText(stripHtml(translations.meaningsPDF[sun]));
      yPos += 2;
      
      addText(`${t('personality')}: ${pn}`, 11);
      addText(stripHtml(translations.meaningsPDF[pn]));
      yPos += 2;
      
      addText(`${t('expression')}: ${add.expressionNumber}`, 11);
      addText(stripHtml(translations.meaningsPDF[add.expressionNumber]));
      yPos += 2;
      
      addText(`${t('hiddenPassion')}: ${add.hiddenPassionNumber}`, 11);
      addText(stripHtml(translations.meaningsPDF[add.hiddenPassionNumber]));
      yPos += 2;
      
      addText(`${t('birthDay')}: ${add.birthDayNumber}`, 11);
      addText(stripHtml(translations.meaningsPDF[add.birthDayNumber]));
      yPos += 2;
      
      addText(`${t('challenge1')}: ${add.challenge1}`, 11);
      addText(stripHtml(translations.challengeMeaningsPDF[add.challenge1]));
      yPos += 2;
      
      addText(`${t('challenge2')}: ${add.challenge2}`, 11);
      addText(stripHtml(translations.challengeMeaningsPDF[add.challenge2]));
      yPos += 2;
      
      addText(`${t('challenge3')}: ${add.challenge3}`, 11);
      addText(stripHtml(translations.challengeMeaningsPDF[add.challenge3]));
      yPos += 2;
      
      addText(`${t('challenge4')}: ${add.challenge4}`, 11);
      addText(stripHtml(translations.challengeMeaningsPDF[add.challenge4]));
      yPos += 2;
      
      addText(`${t('pinnacle1', {age: pin.firstPinnacleAge})}: ${pin.firstPinnacle}`, 11);
      addText(stripHtml(translations.meaningsPDF[pin.firstPinnacle]));
      addText(stripHtml(translations.pinnacleAdvicePDF[pin.firstPinnacle]));
      yPos += 2;
      
      addText(`${t('pinnacle2', {age: pin.secondPinnacleAge})}: ${pin.secondPinnacle}`, 11);
      addText(stripHtml(translations.meaningsPDF[pin.secondPinnacle]));
      addText(stripHtml(translations.pinnacleAdvicePDF[pin.secondPinnacle]));
      yPos += 2;
      
      addText(`${t('pinnacle3', {age: pin.thirdPinnacleAge})}: ${pin.thirdPinnacle}`, 11);
      addText(stripHtml(translations.meaningsPDF[pin.thirdPinnacle]));
      addText(stripHtml(translations.pinnacleAdvicePDF[pin.thirdPinnacle]));
      yPos += 2;
      
      addText(`${t('pinnacle4', {age: pin.fourthPinnacleAge})}: ${pin.fourthPinnacle}`, 11);
      addText(stripHtml(translations.meaningsPDF[pin.fourthPinnacle]));
      addText(stripHtml(translations.pinnacleAdvicePDF[pin.fourthPinnacle]));
      
      doc.save('numerology-report.pdf');
    };

    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: "power2.out" });

    document.getElementById('calculateBtn').disabled = false;
  }, 300);
}

function calculateDailyForecast() {
  const d = parseInt(document.getElementById('dailyDay').value);
  const m = parseInt(document.getElementById('dailyMonth').value);
  const y = parseInt(document.getElementById('dailyYear').value);
  const fDiv = document.getElementById('dailyForecast');

  if(!isValidDate(d,m,y)) {
    fDiv.innerHTML = `<p class="text-red-500 font-medium">${t('errorInvalidDate')}</p>`;
    return;
  }

  saveData('dailyInputs', {d, m, y});

  document.getElementById('dailyCalculateBtn').disabled = true;

  setTimeout(() => {
    const f = calculateDailyNumber(d,m,y);
    const now = new Date();
    const cy = now.getFullYear(), cm = now.getMonth()+1, cd = now.getDate();
    const s = translations.dailySuggestions[f.personalDay] || {do: currentLang === 'vi' ? 'Hôm nay là một ngày bình thường, hãy làm những gì bạn cảm thấy phù hợp.' : 'Today is a normal day, do what feels right.', avoid: currentLang === 'vi' ? 'Tránh hành động vội vàng.' : 'Avoid rash actions.'};

    fDiv.innerHTML = `<div class="result-card"><h2>${t('tabDaily')} - ${now.toLocaleDateString(currentLang)}</h2>
      <p><strong>${t('personalYear')}:</strong> ${f.personalYear} - ${translations.meanings[f.personalYear]}</p>
      <p><strong>${t('personalMonth')}:</strong> ${f.personalMonth} - ${translations.meanings[f.personalMonth]}</p>
      <p><strong>${t('personalDay')}:</strong> ${f.personalDay} - ${translations.meanings[f.personalDay]}</p>
      <h3 class="font-semibold mt-4">${t('suggestionsToday')}:</h3><p>${s.do}</p>
      <h3 class="font-semibold mt-4">${t('thingsToAvoid')}:</h3><p>${s.avoid}</p></div>`;

    document.getElementById('dailyCalculationDetails').innerHTML = `<div class="result-card"><h2>${t('btnShowCalc')}</h2>
      <p><strong>${t('personalYear')}:</strong> ${d}+${m}+${cy} → ${f.personalYear}</p>
      <p><strong>${t('personalMonth')}:</strong> ${f.personalYear}+${cm} → ${f.personalMonth}</p>
      <p><strong>${t('personalDay')}:</strong> ${f.personalMonth}+${cd} → ${f.personalDay}</p></div>`;

    document.getElementById('dailyShowCalcBtn').classList.remove('hidden');
    document.getElementById('dailyCalculationDetails').classList.add('details-hidden');
    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: "power2.out" });
    document.getElementById('dailyCalculateBtn').disabled = false;
  }, 300);
}

function calculateCompatibilityForecast() {
  const n1 = document.getElementById('compatName1').value.trim();
  const d1 = parseInt(document.getElementById('compatDay1').value);
  const m1 = parseInt(document.getElementById('compatMonth1').value);
  const y1 = parseInt(document.getElementById('compatYear1').value);
  const n2 = document.getElementById('compatName2').value.trim();
  const d2 = parseInt(document.getElementById('compatDay2').value);
  const m2 = parseInt(document.getElementById('compatMonth2').value);
  const y2 = parseInt(document.getElementById('compatYear2').value);
  const cDiv = document.getElementById('compatForecast');

  if(!n1 || !/^[a-z\s]*$/.test(n1) || !n2 || !/^[a-z\s]*$/.test(n2)) {
    cDiv.innerHTML = `<p class="text-red-500 font-medium">${t('errorInvalidName')}</p>`;
    return;
  }
  if(!isValidDate(d1,m1,y1) || !isValidDate(d2,m2,y2)) {
    cDiv.innerHTML = `<p class="text-red-500 font-medium">${t('errorInvalidDate')}</p>`;
    return;
  }

  saveData('compatInputs', {n1, d1, m1, y1, n2, d2, m2, y2});

  document.getElementById('compatCalculateBtn').disabled = true;
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('active');

  addParticles(overlay);

  setTimeout(() => {
    const c = calculateCompatibility(n1,d1,m1,y1,n2,d2,m2,y2);

    cDiv.innerHTML = `<div class="result-card"><h2>${t('tabCompat')}</h2>
      <p><strong>${t('labelPerson1')}:</strong> ${n1} (${d1}/${m1}/${y1})</p>
      <p><strong>${t('lifePath')}:</strong> ${c.lifePathNumber1} - ${translations.meanings[c.lifePathNumber1]}</p>
      <p><strong>${t('expression')}:</strong> ${c.expressionNumber1} - ${translations.meanings[c.expressionNumber1]}</p>
      <p><strong>${t('labelPerson2')}:</strong> ${n2} (${d2}/${m2}/${y2})</p>
      <p><strong>${t('lifePath')}:</strong> ${c.lifePathNumber2} - ${translations.meanings[c.lifePathNumber2]}</p>
      <p><strong>${t('expression')}:</strong> ${c.expressionNumber2} - ${translations.meanings[c.expressionNumber2]}</p>
      <h3 class="font-semibold mt-4">${t('compatibilityLevel')}:</h3>
      <p><strong>${c.overallCompat}%</strong> - ${c.description}</p></div>`;

    document.getElementById('compatCalculationDetails').innerHTML = `<div class="result-card"><h2>${t('btnShowCalc')}</h2>
      <p><strong>${t('lifePath')} 1:</strong> ${d1}+${m1}+${y1} → ${c.lifePathNumber1}</p>
      <p><strong>${t('expression')} 1:</strong> ${currentLang === 'vi' ? 'Tổng chữ cái' : 'Sum of letters'} → ${c.expressionNumber1}</p>
      <p><strong>${t('lifePath')} 2:</strong> ${d2}+${m2}+${y2} → ${c.lifePathNumber2}</p>
      <p><strong>${t('expression')} 2:</strong> ${currentLang === 'vi' ? 'Tổng chữ cái' : 'Sum of letters'} → ${c.expressionNumber2}</p>
      <p><strong>${currentLang === 'vi' ? 'Tương hợp con số chủ đạo' : 'Life Path Compatibility'}:</strong> ${c.lifePathCompat}%</p>
      <p><strong>${currentLang === 'vi' ? 'Tương hợp con số tương tác' : 'Expression Compatibility'}:</strong> ${c.expressionCompat}%</p>
      <p><strong>${currentLang === 'vi' ? 'Tương hợp tổng thể' : 'Overall Compatibility'}:</strong> (${c.lifePathCompat}+${c.expressionCompat})/2 = ${c.overallCompat}%</p></div>`;

    document.getElementById('compatShowCalcBtn').classList.remove('hidden');
    document.getElementById('compatCalculationDetails').classList.add('details-hidden');
    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: "power2.out" });
    overlay.querySelectorAll('.particle').forEach((p) => p.remove());
    overlay.classList.remove('active');
    document.getElementById('compatCalculateBtn').disabled = false;
  }, 500);
}

function calculateNameSuggestions() {
  const d = parseInt(document.getElementById('nameSuggestDay').value);
  const m = parseInt(document.getElementById('nameSuggestMonth').value);
  const y = parseInt(document.getElementById('nameSuggestYear').value);
  const resultDiv = document.getElementById('nameSuggestResult');

  if(!isValidDate(d,m,y)) {
    resultDiv.innerHTML = `<p class="text-red-500 font-medium">${t('errorInvalidDate')}</p>`;
    return;
  }

  saveData('nameSuggestInputs', {d, m, y});

  document.getElementById('nameSuggestCalculateBtn').disabled = true;
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('active');

  addParticles(overlay);

  setTimeout(() => {
    const lpn = reduceToSingleDigit(sumDigits(d) + sumDigits(m) + sumDigits(y), true);
    const suggestedNames = [
      'Anh', 'Minh', 'Ngoc', 'Hieu', 'Linh',
      'Emma', 'Liam', 'Sophia', 'Noah', 'Olivia'
    ].map(name => ({
      name,
      expressionNumber: reduceToSingleDigit(name.split('').reduce((s, l) => s + getLetterValue(l), 0), true)
    }));
    resultDiv.innerHTML = `<div class="result-card"><h2>${t('tabNameSuggest')}</h2>
      <p><strong>${t('labelBirthDate')}:</strong> ${d}/${m}/${y}</p>
      <p><strong>${t('lifePath')}:</strong> ${lpn}</p>
      <h3 class="font-semibold mt-4">${t('suggestedNames')}:</h3>
      <ul class="list-disc pl-5 space-y-2">${suggestedNames.map(n => `<li>${n.name} (${t('expression')}: ${n.expressionNumber} - ${translations.meanings[n.expressionNumber]})</li>`).join('')}</ul>
      <p class="mt-4">${t('noteNames')}</p></div>`;

    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, ease: "power2.out" });
    overlay.querySelectorAll('.particle').forEach((p) => p.remove());
    overlay.classList.remove('active');
    document.getElementById('nameSuggestCalculateBtn').disabled = false;
  }, 500);
}

document.addEventListener('DOMContentLoaded', async () => {
  populateDropdowns();

  // Load translations first
  const savedLang = localStorage.getItem('language') || 'vi';
  await loadTranslations(savedLang);

  // Load saved data
  const mainInputs = loadData('mainInputs');
  if(mainInputs) {
    document.getElementById('fullName').value = mainInputs.name;
    document.getElementById('day').value = mainInputs.d;
    document.getElementById('month').value = mainInputs.m;
    document.getElementById('year').value = mainInputs.y;
  }

  const dailyInputs = loadData('dailyInputs');
  if(dailyInputs) {
    document.getElementById('dailyDay').value = dailyInputs.d;
    document.getElementById('dailyMonth').value = dailyInputs.m;
    document.getElementById('dailyYear').value = dailyInputs.y;
  }

  const compatInputs = loadData('compatInputs');
  if(compatInputs) {
    document.getElementById('compatName1').value = compatInputs.n1;
    document.getElementById('compatDay1').value = compatInputs.d1;
    document.getElementById('compatMonth1').value = compatInputs.m1;
    document.getElementById('compatYear1').value = compatInputs.y1;
    document.getElementById('compatName2').value = compatInputs.n2;
    document.getElementById('compatDay2').value = compatInputs.d2;
    document.getElementById('compatMonth2').value = compatInputs.m2;
    document.getElementById('compatYear2').value = compatInputs.y2;
  }

  const nameSuggestInputs = loadData('nameSuggestInputs');
  if(nameSuggestInputs) {
    document.getElementById('nameSuggestDay').value = nameSuggestInputs.d;
    document.getElementById('nameSuggestMonth').value = nameSuggestInputs.m;
    document.getElementById('nameSuggestYear').value = nameSuggestInputs.y;
  }

  // Set input containers to final position without animation, even when empty
  ['fullName', 'compatName1', 'compatName2'].forEach(id => {
    const container = document.querySelector(`.input-container input#${id}`).parentElement;
    if (container && !sessionStorage.getItem(`input${id}Positioned`)) {
      gsap.set(container, { y: 0, opacity: 1, boxShadow: '0 4px 6px rgba(102, 126, 234, 0.1)' });
      sessionStorage.setItem(`input${id}Positioned`, 'true');
    }
  });

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('themeIcon').innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isDark ? 'M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z' : 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'}"></path>`;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  if(localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('themeIcon').innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"></path>`;
  }

  // Language toggle
  document.getElementById('langToggle').addEventListener('click', async () => {
    const newLang = currentLang === 'vi' ? 'en' : 'vi';
    await loadTranslations(newLang);
    localStorage.setItem('language', newLang);
  });

  // Menu toggle
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('menuDropdown').classList.toggle('active');
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
      document.getElementById('menuDropdown').classList.remove('active');
    });
  });

  // Calculate buttons
  document.getElementById('calculateBtn').addEventListener('click', debounce(calculateNumerology, 500));
  document.getElementById('dailyCalculateBtn').addEventListener('click', debounce(calculateDailyForecast, 500));
  document.getElementById('compatCalculateBtn').addEventListener('click', debounce(calculateCompatibilityForecast, 500));
  document.getElementById('nameSuggestCalculateBtn').addEventListener('click', debounce(calculateNameSuggestions, 500));

  // Clear buttons
  document.getElementById('clearBtn').addEventListener('click', () => clearFields(['fullName','day','month','year'], 'summary'));
  document.getElementById('dailyClearBtn').addEventListener('click', () => clearFields(['dailyDay','dailyMonth','dailyYear'], 'dailyForecast'));
  document.getElementById('compatClearBtn').addEventListener('click', () => clearFields(['compatName1','compatDay1','compatMonth1','compatYear1','compatName2','compatDay2','compatMonth2','compatYear2'], 'compatForecast'));
  document.getElementById('nameSuggestClearBtn').addEventListener('click', () => clearFields(['nameSuggestDay','nameSuggestMonth','nameSuggestYear'], 'nameSuggestResult'));

  // Toggle details
  document.getElementById('showMoreBtn').addEventListener('click', () => toggleDetails(document.getElementById('details'), document.getElementById('showMoreBtn'), 'btnHideDetails', 'btnShowDetails'));
  document.getElementById('showCalcBtn').addEventListener('click', () => toggleDetails(document.getElementById('calculationDetails'), document.getElementById('showCalcBtn'), 'btnHideCalc', 'btnShowCalc'));
  document.getElementById('showMeaningsBtn').addEventListener('click', () => toggleDetails(document.getElementById('meanings'), document.getElementById('showMeaningsBtn'), 'btnHideMeanings', 'btnShowMeanings'));
  document.getElementById('dailyShowCalcBtn').addEventListener('click', () => toggleDetails(document.getElementById('dailyCalculationDetails'), document.getElementById('dailyShowCalcBtn'), 'btnHideCalc', 'btnShowCalc'));
  document.getElementById('compatShowCalcBtn').addEventListener('click', () => toggleDetails(document.getElementById('compatCalculationDetails'), document.getElementById('compatShowCalcBtn'), 'btnHideCalc', 'btnShowCalc'));

  // Enter key triggers
  document.getElementById('mainTab').addEventListener('keydown', e => {
    if(e.key === 'Enter') calculateNumerology();
  });
  document.getElementById('dailyTab').addEventListener('keydown', e => {
    if(e.key === 'Enter') calculateDailyForecast();
  });
  document.getElementById('compatTab').addEventListener('keydown', e => {
    if(e.key === 'Enter') calculateCompatibilityForecast();
  });
  document.getElementById('nameSuggestTab').addEventListener('keydown', e => {
    if(e.key === 'Enter') calculateNameSuggestions();
  });
});
