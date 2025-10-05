const CURRENT_YEAR = new Date().getFullYear();
// Multilingual translations
const translations = {
  vi: {
    mainTitle: '✨ Khám Phá Bản Thân Với Thần Số Học',
    labelFullName: 'Họ và Tên',
    labelBirthDate: 'Ngày Sinh',
    labelPerson1: 'Họ và Tên Người Thứ Nhất',
    labelBirthDate1: 'Ngày Sinh Người Thứ Nhất',
    labelPerson2: 'Họ và Tên Người Thứ Hai',
    labelBirthDate2: 'Ngày Sinh Người Thứ Hai',
    placeholderName: 'Nhập họ và tên',
    placeholderYear: 'Năm',
    selectDay: 'Ngày',
    selectMonth: 'Tháng',
    btnCalculate: 'Tính Toán ✨',
    btnClear: 'Xóa 🗑️',
    btnShowDetails: 'Xem Chi Tiết',
    btnShowCalc: 'Xem Cách Tính',
    btnShowMeanings: 'Xem Ý Nghĩa Các Con Số',
    btnDailyCalculate: 'Tính Dự Báo',
    btnCompatCalculate: 'Tính Độ Tương Hợp',
    btnDownloadReport: 'Tải Báo Cáo 📥',
    btnNameSuggestCalculate: 'Gợi Ý Tên',
    tabOverview: '📊 Tổng Quan',
    tabDaily: '📅 Dự Báo Hàng Ngày',
    tabCompat: '💕 Độ Tương Hợp',
    tabNameSuggest: '📝 Gợi Ý Tên',
    tooltipCalculate: 'Tính toán các chỉ số thần số học',
    tooltipClear: 'Xóa tất cả dữ liệu đã nhập',
    btnHideDetails: 'Ẩn Chi Tiết',
    btnHideCalc: 'Ẩn Cách Tính',
    btnHideMeanings: 'Ẩn Ý Nghĩa',  // ← ADD COMMA HERE
    tooltipLangToggle: 'Chuyển đổi giữa Tiếng Việt và Tiếng Anh',
    tooltipThemeToggle: 'Chuyển đổi chế độ Sáng/Tối',
    tooltipMenuToggle: 'Mở menu điều hướng',
    tooltipTabMain: 'Tính toán các chỉ số thần số học cốt lõi',
    tooltipTabDaily: 'Nhận dự báo thần số học hàng ngày',
    tooltipTabCompat: 'Kiểm tra độ tương hợp giữa hai người',
    tooltipTabNameSuggest: 'Nhận gợi ý tên dựa trên thần số học',
    tooltipCalculate: 'Tính toán tất cả các chỉ số thần số học',
    tooltipClear: 'Xóa tất cả dữ liệu đã nhập và kết quả',
    tooltipDownload: 'Tải báo cáo thần số học hoàn chỉnh dạng PDF',
    tooltipShowDetails: 'Xem ý nghĩa chi tiết cho từng con số',
    tooltipShowCalc: 'Xem quy trình tính toán từng bước',
    tooltipShowMeanings: 'Tìm hiểu ý nghĩa từng con số đại diện',
    tooltipDailyCalculate: 'Tính toán ngày, tháng và năm cá nhân của bạn',
    tooltipDailyShowCalc: 'Xem cách tính toán các con số hàng ngày',
    tooltipCompatCalculate: 'Tính điểm tương hợp giữa hai người',
    tooltipCompatShowCalc: 'Xem cách tính toán độ tương hợp từng bước',
    tooltipNameSuggestCalculate: 'Nhận gợi ý tên phù hợp với ngày sinh'
  },
  en: {
    mainTitle: '✨ Discover Yourself with Numerology',
    labelFullName: 'Full Name',
    labelBirthDate: 'Birth Date',
    labelPerson1: 'First Person\'s Full Name',
    labelBirthDate1: 'First Person\'s Birth Date',
    labelPerson2: 'Second Person\'s Full Name',
    labelBirthDate2: 'Second Person\'s Birth Date',
    placeholderName: 'Enter full name',
    placeholderYear: 'Year',
    selectDay: 'Day',
    selectMonth: 'Month',
    btnCalculate: 'Calculate ✨',
    btnClear: 'Clear 🗑️',
    btnShowDetails: 'View Details',
    btnShowCalc: 'View Calculation',
    btnShowMeanings: 'View Number Meanings',
    btnDailyCalculate: 'Calculate Forecast',
    btnCompatCalculate: 'Calculate Compatibility',
    btnDownloadReport: 'Download Report 📥',
    btnNameSuggestCalculate: 'Suggest Names',
    tabOverview: '📊 Overview',
    tabDaily: '📅 Daily Forecast',
    tabCompat: '💕 Compatibility',
    tabNameSuggest: '📝 Name Suggestion',
    tooltipCalculate: 'Calculate numerology numbers',
    tooltipClear: 'Clear all entered data',
    btnHideDetails: 'Hide Details',
    btnHideCalc: 'Hide Calculation',
    btnHideMeanings: 'Hide Meanings',  // ← ADD COMMA HERE
    tooltipLangToggle: 'Switch between Vietnamese and English',
    tooltipThemeToggle: 'Toggle between Light and Dark mode',
    tooltipMenuToggle: 'Open navigation menu',
    tooltipTabMain: 'Calculate your core numerology numbers',
    tooltipTabDaily: 'Get your daily numerology forecast',
    tooltipTabCompat: 'Check compatibility between two people',
    tooltipTabNameSuggest: 'Get name suggestions based on numerology',
    tooltipCalculate: 'Calculate all your numerology numbers',
    tooltipClear: 'Clear all input fields and results',
    tooltipDownload: 'Download your complete numerology report as PDF',
    tooltipShowDetails: 'View detailed meanings for each number',
    tooltipShowCalc: 'See step-by-step calculation process',
    tooltipShowMeanings: 'Learn what each numerology number represents',
    tooltipDailyCalculate: 'Calculate your personal day, month, and year numbers',
    tooltipDailyShowCalc: 'See how your daily numbers are calculated',
    tooltipCompatCalculate: 'Calculate compatibility score between two people',
    tooltipCompatShowCalc: 'See how compatibility is calculated step-by-step',
    tooltipNameSuggestCalculate: 'Get name suggestions that match your birth numbers'
  }
};

// English meanings for numbers
const meaningsEn = {
  1: "Independence, leadership, creativity. <strong>Opportunity:</strong> Leading new projects, entrepreneurship. <strong>Challenge:</strong> Isolation, impatience. <strong>Advice:</strong> Learn to collaborate and listen to others.",
  2: "Cooperation, sensitivity, harmony. <strong>Opportunity:</strong> Building relationships, mediation. <strong>Challenge:</strong> Dependency, conflict avoidance. <strong>Advice:</strong> Make independent decisions.",
  3: "Creativity, joy, communication. <strong>Opportunity:</strong> Art, writing, entertainment. <strong>Challenge:</strong> Scattered focus, lack of depth. <strong>Advice:</strong> Focus on long-term goals.",
  4: "Stability, practicality, hard work. <strong>Opportunity:</strong> Building foundations, management. <strong>Challenge:</strong> Rigidity, resistance to change. <strong>Advice:</strong> Be open to new ideas.",
  5: "Freedom, adventure, flexibility. <strong>Opportunity:</strong> Travel, new experiences. <strong>Challenge:</strong> Instability, lack of commitment. <strong>Advice:</strong> Balance freedom and responsibility.",
  6: "Responsibility, family, love. <strong>Opportunity:</strong> Supporting community, caregiving. <strong>Challenge:</strong> Burnout, difficulty saying no. <strong>Advice:</strong> Prioritize self-care.",
  7: "Analysis, spirituality, introspection. <strong>Opportunity:</strong> Research, meditation. <strong>Challenge:</strong> Isolation, skepticism. <strong>Advice:</strong> Open up to others.",
  8: "Power, success, finance. <strong>Opportunity:</strong> Business, leadership. <strong>Challenge:</strong> Greed, imbalance. <strong>Advice:</strong> Practice gratitude.",
  9: "Humanitarianism, completion, service. <strong>Opportunity:</strong> Charity, helping others. <strong>Challenge:</strong> Emotional overload. <strong>Advice:</strong> Practice meditation.",
  11: "Intuition, inspiration, spirituality. <strong>Opportunity:</strong> Spiritual leadership, creativity. <strong>Challenge:</strong> Oversensitivity, anxiety. <strong>Advice:</strong> Balance your energy.",
  22: "Master builder, practical idealism. <strong>Opportunity:</strong> Large projects, world-changing goals. <strong>Challenge:</strong> Pressure, burnout. <strong>Advice:</strong> Focus on long-term goals.",
  33: "Master teacher, compassion, sacrifice. <strong>Opportunity:</strong> Guiding, healing. <strong>Challenge:</strong> Over-sacrifice. <strong>Advice:</strong> Take care of yourself."
};

const challengeMeaningsEn = {
  0: "No specific challenge, free to choose. <strong>Advice:</strong> Choose your path wisely, focus on your Life Path number.",
  1: "Learn independence, avoid dependency. <strong>Advice:</strong> Build confidence and self-reliance.",
  2: "Build confidence, avoid oversensitivity. <strong>Advice:</strong> Learn to handle criticism.",
  3: "Focus on expression, avoid scattering energy. <strong>Advice:</strong> Develop creative discipline.",
  4: "Learn organization, avoid rigidity. <strong>Advice:</strong> Be flexible with changes.",
  5: "Adapt to change, avoid irresponsibility. <strong>Advice:</strong> Find balance in freedom.",
  6: "Accept responsibility, avoid perfectionism. <strong>Advice:</strong> Learn to forgive and let go.",
  7: "Open up to others, avoid skepticism. <strong>Advice:</strong> Build trust.",
  8: "Balance material and spiritual, avoid greed. <strong>Advice:</strong> Focus on true values."
};

const pinnacleAdviceEn = {
  1: "Seize this period to assert yourself and lead new projects.",
  2: "Focus on building relationships and collaboration, listen to your emotions.",
  3: "Explore your creativity, express yourself through art or communication.",
  4: "Build a solid foundation, focus on organization and discipline.",
  5: "Embrace change and explore new opportunities, but maintain balance.",
  6: "Care for family and community, prioritize responsibility and love.",
  7: "Reflect and seek solitude to develop inner wisdom and clarity.",
  8: "Leverage energy for financial and career success, but maintain balance.",
  9: "Pursue humanitarian goals, help others, and live for a higher purpose.",
  11: "Listen to your intuition and inspire others through creativity.",
  22: "Focus on large projects and building the future. Plan carefully and work toward long-term goals.",
  33: "Share knowledge and compassion, but don't neglect self-care."
};
// ASCII-safe Vietnamese meanings for PDF (without diacritics)
const meaningsViPDF = {
  1: "Doc lap, lanh dao, sang tao. Co hoi: Dan dat du an moi, khoi nghiep. Thach thuc: Co lap, thieu kien nhan. Loi khuyen: Hoc hop tac va lang nghe nguoi khac.",
  2: "Hop tac, nhay cam, hoa hop. Co hoi: Xay dung moi quan he, hoa giai. Thach thuc: Phu thuoc, ne tranh xung dot. Loi khuyen: Dua ra quyet dinh doc lap.",
  3: "Sang tao, vui ve, giao tiep. Co hoi: Nghe thuat, viet lach, giai tri. Thach thuc: Phan tan, thieu sau sac. Loi khuyen: Tap trung vao muc tieu dai han.",
  4: "On dinh, thuc te, cham chi. Co hoi: Xay dung nen tang, quan ly. Thach thuc: Cung nhac, khang cu thay doi. Loi khuyen: Linh hoat hon voi y tuong moi.",
  5: "Tu do, phieu luu, linh hoat. Co hoi: Du lich, trai nghiem moi. Thach thuc: Bat on, thieu cam ket. Loi khuyen: Can bang tu do va trach nhiem.",
  6: "Trach nhiem, gia dinh, yeu thuong. Co hoi: Ho tro cong dong, cham soc. Thach thuc: Kiet suc, kho tu choi. Loi khuyen: Uu tien ban than.",
  7: "Phan tich, tam linh, noi tam. Co hoi: Nghien cuu, thien dinh. Thach thuc: Co lap, hoai nghi. Loi khuyen: Mo long voi nguoi khac.",
  8: "Quyen luc, thanh cong, tai chinh. Co hoi: Kinh doanh, lanh dao. Thach thuc: Tham lam, mat can bang. Loi khuyen: Thuc hanh biet on.",
  9: "Nhan dao, hoan thanh, cong hien. Co hoi: Tu thien, giup do. Thach thuc: Cam xuc qua tai. Loi khuyen: Thuc hanh thien.",
  11: "Truc giac, truyen cam hung, tam linh. Co hoi: Lanh dao tinh than, sang tao. Thach thuc: Nhay cam qua muc, lo lang. Loi khuyen: Can bang nang luong.",
  22: "Xay dung, ly tuong thuc te, master builder. Co hoi: Du an lon, thay doi the gioi. Thach thuc: Ap luc, kiet suc. Loi khuyen: Tap trung vao muc tieu dai han.",
  33: "Thay day, tu bi, hy sinh. Co hoi: Huong dan, chua lanh. Thach thuc: Hy sinh qua muc. Loi khuyen: Cham soc ban than."
};

const challengeMeaningsViPDF = {
  0: "Khong co thach thuc cu the, tu do lua chon. Loi khuyen: Chon duong di khon ngoan, tap trung vao con so chu dao.",
  1: "Hoc doc lap, tranh phu thuoc. Loi khuyen: Phat trien tu tin va tu quyet.",
  2: "Xay dung tu tin, tranh nhay cam qua muc. Loi khuyen: Hoc cach doi mat voi phe binh.",
  3: "Tap trung bieu dat, tranh phan tan. Loi khuyen: Phat trien ky luat sang tao.",
  4: "Hoc to chuc, tranh cung nhac. Loi khuyen: Linh hoat voi thay doi.",
  5: "Thich nghi thay doi, tranh vo trach nhiem. Loi khuyen: Tim can bang trong tu do.",
  6: "Chap nhan trach nhiem, tranh cau toan. Loi khuyen: Hoc tha thu va buong xa.",
  7: "Mo long voi nguoi khac, tranh hoai nghi. Loi khuyen: Xay dung niem tin.",
  8: "Can bang vat chat va tinh than, tranh tham lam. Loi khuyen: Tap trung vao gia tri thuc."
};

const pinnacleAdviceViPDF = {
  1: "Hay tan dung giai doan nay de khang dinh ban than va dan dat cac du an moi.",
  2: "Tap trung xay dung cac moi quan he va hop tac, lang nghe cam xuc cua ban than.",
  3: "Kham pha su sang tao, the hien ban than qua nghe thuat hoac giao tiep.",
  4: "Xay dung nen tang vung chac, tap trung vao to chuc va ky luat.",
  5: "Chap nhan thay doi va kham pha co hoi moi, nhung giu su can bang.",
  6: "Cham soc gia dinh va cong dong, uu tien trach nhiem va yeu thuong.",
  7: "Suy ngam va tim kiem su tinh lang de phat trien noi tam va tri tue.",
  8: "Tan dung nang luong de dat thanh cong ve tai chinh va su nghiep, nhung giu can bang.",
  9: "Huong toi cac muc tieu nhan dao, giup do nguoi khac va song vi ly tuong cao ca.",
  11: "Lang nghe truc giac va truyen cam hung cho nguoi khac qua su sang tao.",
  22: "Tap trung vao cac du an lon va xay dung tuong lai. Lap ke hoach chi tiet va lam viec huong toi muc tieu lau dai.",
  33: "Chia se kien thuc va long tu bi, nhung dung quen cham soc ban than."
};

let currentLang = 'vi';
function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[currentLang][key] || el.textContent;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = translations[currentLang][key] || el.placeholder;
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = translations[currentLang][key] || el.title;
  });
  
  // Update tooltips dynamically
  document.getElementById('langToggle').setAttribute('data-tooltip-text', translations[currentLang].tooltipLangToggle);
  document.getElementById('themeToggle').setAttribute('data-tooltip-text', translations[currentLang].tooltipThemeToggle);
  document.getElementById('menuToggle').setAttribute('data-tooltip-text', translations[currentLang].tooltipMenuToggle);
  
  document.querySelector('[data-tab="main"]').setAttribute('data-tooltip-text', translations[currentLang].tooltipTabMain);
  document.querySelector('[data-tab="daily"]').setAttribute('data-tooltip-text', translations[currentLang].tooltipTabDaily);
  document.querySelector('[data-tab="compat"]').setAttribute('data-tooltip-text', translations[currentLang].tooltipTabCompat);
  document.querySelector('[data-tab="nameSuggest"]').setAttribute('data-tooltip-text', translations[currentLang].tooltipTabNameSuggest);
  
  document.getElementById('calculateBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipCalculate);
  document.getElementById('clearBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipClear);
  document.getElementById('dailyCalculateBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipDailyCalculate);
  document.getElementById('dailyClearBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipClear);
  document.getElementById('compatCalculateBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipCompatCalculate);
  document.getElementById('compatClearBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipClear);
  document.getElementById('nameSuggestCalculateBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipNameSuggestCalculate);
  document.getElementById('nameSuggestClearBtn').setAttribute('data-tooltip-text', translations[currentLang].tooltipClear);
  
  // Update result buttons if they exist
  const downloadBtn = document.getElementById('downloadReportBtn');
  if(downloadBtn) downloadBtn.setAttribute('data-tooltip-text', translations[currentLang].tooltipDownload);
  
  const showMoreBtn = document.getElementById('showMoreBtn');
  if(showMoreBtn) showMoreBtn.setAttribute('data-tooltip-text', translations[currentLang].tooltipShowDetails);
  
  const showCalcBtn = document.getElementById('showCalcBtn');
  if(showCalcBtn) showCalcBtn.setAttribute('data-tooltip-text', translations[currentLang].tooltipShowCalc);
  
  const showMeaningsBtn = document.getElementById('showMeaningsBtn');
  if(showMeaningsBtn) showMeaningsBtn.setAttribute('data-tooltip-text', translations[currentLang].tooltipShowMeanings);
  
  const dailyShowCalcBtn = document.getElementById('dailyShowCalcBtn');
  if(dailyShowCalcBtn) dailyShowCalcBtn.setAttribute('data-tooltip-text', translations[currentLang].tooltipDailyShowCalc);
  
  const compatShowCalcBtn = document.getElementById('compatShowCalcBtn');
  if(compatShowCalcBtn) compatShowCalcBtn.setAttribute('data-tooltip-text', translations[currentLang].tooltipCompatShowCalc);
  
  // Re-run calculations to update displayed results with new language
  if(document.getElementById('summary').innerHTML) calculateNumerology();
  if(document.getElementById('dailyForecast').innerHTML) calculateDailyForecast();
  if(document.getElementById('compatForecast').innerHTML) calculateCompatibilityForecast();
  if(document.getElementById('nameSuggestResult').innerHTML) calculateNameSuggestions();
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

const meanings = {
  1: "Độc lập, lãnh đạo, sáng tạo. <strong>Cơ hội:</strong> Dẫn dắt dự án mới, khởi nghiệp. <strong>Thách thức:</strong> Cô lập, thiếu kiên nhẫn. <strong>Lời khuyên:</strong> Học hợp tác và lắng nghe người khác.",
  2: "Hợp tác, nhạy cảm, hòa hợp. <strong>Cơ hội:</strong> Xây dựng mối quan hệ, hòa giải. <strong>Thách thức:</strong> Phụ thuộc, né tránh xung đột. <strong>Lời khuyên:</strong> Đưa ra quyết định độc lập.",
  3: "Sáng tạo, vui vẻ, giao tiếp. <strong>Cơ hội:</strong> Nghệ thuật, viết lách, giải trí. <strong>Thách thức:</strong> Phân tán, thiếu sâu sắc. <strong>Lời khuyên:</strong> Tập trung vào mục tiêu dài hạn.",
  4: "Ổn định, thực tế, chăm chỉ. <strong>Cơ hội:</strong> Xây dựng nền tảng, quản lý. <strong>Thách thức:</strong> Cứng nhắc, kháng cự thay đổi. <strong>Lời khuyên:</strong> Linh hoạt hơn với ý tưởng mới.",
  5: "Tự do, phiêu lưu, linh hoạt. <strong>Cơ hội:</strong> Du lịch, trải nghiệm mới. <strong>Thách thức:</strong> Bất ổn, thiếu cam kết. <strong>Lời khuyên:</strong> Cân bằng tự do và trách nhiệm.",
  6: "Trách nhiệm, gia đình, yêu thương. <strong>Cơ hội:</strong> Hỗ trợ cộng đồng, chăm sóc. <strong>Thách thức:</strong> Kiệt sức, khó từ chối. <strong>Lời khuyên:</strong> Ưu tiên bản thân.",
  7: "Phân tích, tâm linh, nội tâm. <strong>Cơ hội:</strong> Nghiên cứu, thiền định. <strong>Thách thức:</strong> Cô lập, hoài nghi. <strong>Lời khuyên:</strong> Mở lòng với người khác.",
  8: "Quyền lực, thành công, tài chính. <strong>Cơ hội:</strong> Kinh doanh, lãnh đạo. <strong>Thách thức:</strong> Tham lam, mất cân bằng. <strong>Lời khuyên:</strong> Thực hành biết ơn.",
  9: "Nhân đạo, hoàn thành, cống hiến. <strong>Cơ hội:</strong> Từ thiện, giúp đỡ. <strong>Thách thức:</strong> Cảm xúc quá tải. <strong>Lời khuyên:</strong> Thực hành thiền.",
  11: "Trực giác, truyền cảm hứng, tâm linh. <strong>Cơ hội:</strong> Lãnh đạo tinh thần, sáng tạo. <strong>Thách thức:</strong> Nhạy cảm quá mức, lo lắng. <strong>Lời khuyên:</strong> Cân bằng năng lượng.",
  22: "Xây dựng, lý tưởng thực tế, master builder. <strong>Cơ hội:</strong> Dự án lớn, thay đổi thế giới. <strong>Thách thức:</strong> Áp lực, kiệt sức. <strong>Lời khuyên:</strong> Tập trung vào mục tiêu dài hạn.",
  33: "Thầy dạy, từ bi, hy sinh. <strong>Cơ hội:</strong> Hướng dẫn, chữa lành. <strong>Thách thức:</strong> Hy sinh quá mức. <strong>Lời khuyên:</strong> Chăm sóc bản thân."
};

const challengeMeanings = {
  0: "Không có thách thức cụ thể, tự do lựa chọn. <strong>Lời khuyên:</strong> Chọn đường đi khôn ngoan, tập trung vào con số chủ đạo.",
  1: "Học độc lập, tránh phụ thuộc. <strong>Lời khuyên:</strong> Phát triển tự tin và tự quyết.",
  2: "Xây dựng tự tin, tránh nhạy cảm quá mức. <strong>Lời khuyên:</strong> Học cách đối mặt với phê bình.",
  3: "Tập trung biểu đạt, tránh phân tán. <strong>Lời khuyên:</strong> Phát triển kỷ luật sáng tạo.",
  4: "Học tổ chức, tránh cứng nhắc. <strong>Lời khuyên:</strong> Linh hoạt với thay đổi.",
  5: "Thích nghi thay đổi, tránh vô trách nhiệm. <strong>Lời khuyên:</strong> Tìm cân bằng trong tự do.",
  6: "Chấp nhận trách nhiệm, tránh cầu toàn. <strong>Lời khuyên:</strong> Học tha thứ và buông xả.",
  7: "Mở lòng với người khác, tránh hoài nghi. <strong>Lời khuyên:</strong> Xây dựng niềm tin.",
  8: "Cân bằng vật chất và tinh thần, tránh tham lam. <strong>Lời khuyên:</strong> Tập trung vào giá trị thực."
};

const pinnacleAdvice = {
  1: "Hãy tận dụng giai đoạn này để khẳng định bản thân và dẫn dắt các dự án mới.",
  2: "Tập trung xây dựng các mối quan hệ và hợp tác, lắng nghe cảm xúc của bản thân.",
  3: "Khám phá sự sáng tạo, thể hiện bản thân qua nghệ thuật hoặc giao tiếp.",
  4: "Xây dựng nền tảng vững chắc, tập trung vào tổ chức và kỷ luật.",
  5: "Chấp nhận thay đổi và khám phá cơ hội mới, nhưng giữ sự cân bằng.",
  6: "Chăm sóc gia đình và cộng đồng, ưu tiên trách nhiệm và yêu thương.",
  7: "Suy ngẫm và tìm kiếm sự tĩnh lặng để phát triển nội tâm và trí tuệ.",
  8: "Tận dụng năng lượng để đạt thành công về tài chính và sự nghiệp, nhưng giữ cân bằng.",
  9: "Hướng tới các mục tiêu nhân đạo, giúp đỡ người khác và sống vì lý tưởng cao cả.",
  11: "Lắng nghe trực giác và truyền cảm hứng cho người khác qua sự sáng tạo.",
  22: "Tập trung vào các dự án lớn và xây dựng tương lai. Lập kế hoạch chi tiết và làm việc hướng tới mục tiêu lâu dài.",
  33: "Chia sẻ kiến thức và lòng từ bi, nhưng đừng quên chăm sóc bản thân."
};

const dailySuggestions = {
  1: { do: "Hôm nay là ngày để tỏa sáng và dẫn đầu! Hãy bắt đầu một dự án mới, đưa ra ý tưởng táo bạo hoặc thử sức với một thử thách cá nhân. Tự tin thể hiện bản thân và nắm bắt cơ hội.", avoid: "Tránh né tránh trách nhiệm hoặc phụ thuộc vào người khác để đưa ra quyết định. Đừng để sự thiếu kiên nhẫn làm hỏng cơ hội." },
  2: { do: "Tập trung vào các mối quan hệ và sự hợp tác. Đây là ngày lý tưởng để trò chuyện, hòa giải hoặc hỗ trợ bạn bè, gia đình. Hãy lắng nghe và kết nối cảm xúc.", avoid: "Tránh né tránh xung đột hoặc giữ im lặng khi cần bày tỏ ý kiến. Đừng để sự nhạy cảm quá mức làm bạn mất cân bằng." },
  3: { do: "Năng lượng sáng tạo đang dâng cao! Viết lách, vẽ tranh, hoặc tham gia hoạt động nghệ thuật. Giao tiếp vui vẻ và lan tỏa năng lượng tích cực đến mọi người.", avoid: "Tránh phân tán năng lượng vào quá nhiều việc hoặc thiếu tập trung. Đừng để những lời nói bộc phát gây hiểu lầm." },
  4: { do: "Hôm nay phù hợp để tổ chức, lập kế hoạch hoặc hoàn thành công việc. Xây dựng nền tảng vững chắc cho mục tiêu dài hạn và giữ kỷ luật trong công việc.", avoid: "Tránh cứng nhắc hoặc từ chối thay đổi. Đừng làm việc quá sức mà quên chăm sóc bản thân." },
  5: { do: "Khám phá và thay đổi! Hãy thử một hoạt động mới, đi đâu đó hoặc gặp gỡ người mới. Linh hoạt và cởi mở với những cơ hội bất ngờ.", avoid: "Tránh hành động bốc đồng hoặc bỏ qua trách nhiệm. Đừng để sự thiếu cam kết ảnh hưởng đến các mối quan hệ." },
  6: { do: "Dành thời gian cho gia đình, bạn bè hoặc cộng đồng. Hôm nay là ngày để chăm sóc, yêu thương và tạo ra sự hài hòa trong các mối quan hệ.", avoid: "Tránh ôm đồm quá nhiều trách nhiệm hoặc quên chăm sóc bản thân. Đừng để sự cầu toàn làm bạn căng thẳng." },
  7: { do: "Tìm kiếm sự tĩnh lặng và suy ngẫm. Thiền, đọc sách hoặc nghiên cứu một chủ đề bạn yêu thích. Kết nối với nội tâm sẽ mang lại sự rõ ràng.", avoid: "Tránh cô lập bản thân quá lâu hoặc nghi ngờ mọi thứ. Đừng từ chối sự hỗ trợ từ người khác." },
  8: { do: "Tập trung vào tài chính và mục tiêu sự nghiệp. Hôm nay là ngày tốt để lập kế hoạch kinh doanh, đàm phán hoặc đầu tư. Hãy giữ sự tự tin.", avoid: "Tránh tham lam hoặc chỉ tập trung vào vật chất. Đừng bỏ qua các mối quan hệ cá nhân vì công việc." },
  9: { do: "Lan tỏa lòng nhân ái và giúp đỡ người khác. Tham gia hoạt động từ thiện hoặc hỗ trợ ai đó đang cần. Hôm nay là ngày để sống vì mục đích cao cả.", avoid: "Tránh giữ lấy những cảm xúc tiêu cực hoặc quá khứ. Đừng để sự nhạy cảm làm bạn kiệt sức." },
  11: { do: "Lắng nghe trực giác của bạn. Đây là ngày để thiền định, tìm kiếm ý nghĩa tâm linh hoặc truyền cảm hứng cho người khác. Hãy tin vào linh cảm của mình.", avoid: "Tránh để sự nhạy cảm quá mức dẫn đến lo lắng. Đừng bỏ qua các chi tiết thực tế trong công việc." },
  22: { do: "Tập trung vào các dự án lớn và xây dựng tương lai. Lập kế hoạch chi tiết và làm việc hướng tới mục tiêu lâu dài. Hôm nay là ngày để biến ước mơ thành hiện thực.", avoid: "Tránh để áp lực làm bạn kiệt sức. Đừng bỏ qua các chi tiết nhỏ hoặc làm việc mà không có kế hoạch." },
  33: { do: "Hãy hướng dẫn và truyền cảm hứng cho người khác. Dành thời gian để chia sẻ kiến thức hoặc hỗ trợ ai đó. Hôm nay là ngày để thể hiện lòng từ bi.", avoid: "Tránh hy sinh quá mức mà quên chăm sóc bản thân. Đừng để cảm xúc chi phối các quyết định quan trọng." }
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
  const a1 = 36 - lpn;
  return {firstPinnacle:p1,secondPinnacle:p2,thirdPinnacle:p3,fourthPinnacle:p4,firstPinnacleAge:`${a1} - ${a1+8}`,secondPinnacleAge:`${a1+9} - ${a1+17}`,thirdPinnacleAge:`${a1+18} - ${a1+26}`,fourthPinnacleAge:currentLang === 'vi' ? `${a1+27} trở đi` : `${a1+27} onwards`};
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
  btn.textContent = translations[currentLang][div.classList.contains('details-shown') ? hideText : showText] || btn.textContent;
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
    sumDiv.innerHTML = `<p class="text-red-500 font-medium">${translations[currentLang].tabOverview ? 'Họ tên chỉ được chứa chữ cái và khoảng trắng!' : 'Name can only contain letters and spaces!'}</p>`;
    return;
  }
  if(!isValidDate(d,m,y)) {
    sumDiv.innerHTML = `<p class="text-red-500 font-medium">${translations[currentLang].tabOverview ? 'Ngày sinh không hợp lệ!' : 'Invalid birth date!'}</p>`;
    return;
  }

  saveData('mainInputs', {name, d, m, y});

  document.getElementById('calculateBtn').disabled = true;
  document.getElementById('loadingOverlay').classList.add('active');

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
    const ys = sumDigits(y);

    const labels = currentLang === 'vi' ? {
      lifePath: 'Con số chủ đạo (Life Path)',
      soulUrge: 'Con số linh hồn (Soul Urge)',
      personality: 'Con số nhân cách (Personality)',
      expression: 'Con số tương tác (Expression)',
      hiddenPassion: 'Con số linh hồn ẩn (Hidden Passion)',
      birthDay: 'Con số ngày sinh (Birth Day)',
      challenge1: 'Con số thách thức đỉnh cao 1 (Challenge 1)',
      challenge2: 'Con số thách thức đỉnh cao 2 (Challenge 2)',
      challenge3: 'Con số thách thức đỉnh cao 3 (Challenge 3)',
      challenge4: 'Con số thách thức đỉnh cao 4 (Challenge 4)',
      pinnacle1: `Con số đỉnh cao 1 (Pinnacle 1, Age ${pin.firstPinnacleAge})`,
      pinnacle2: `Con số đỉnh cao 2 (Pinnacle 2, Age ${pin.secondPinnacleAge})`,
      pinnacle3: `Con số đỉnh cao 3 (Pinnacle 3, Age ${pin.thirdPinnacleAge})`,
      pinnacle4: `Con số đỉnh cao 4 (Pinnacle 4, Age ${pin.fourthPinnacleAge})`,
      advice: 'Lời khuyên'
    } : {
      lifePath: 'Life Path Number',
      soulUrge: 'Soul Urge Number',
      personality: 'Personality Number',
      expression: 'Expression Number',
      hiddenPassion: 'Hidden Passion Number',
      birthDay: 'Birth Day Number',
      challenge1: 'Challenge 1',
      challenge2: 'Challenge 2',
      challenge3: 'Challenge 3',
      challenge4: 'Challenge 4',
      pinnacle1: `Pinnacle 1 (Age ${pin.firstPinnacleAge})`,
      pinnacle2: `Pinnacle 2 (Age ${pin.secondPinnacleAge})`,
      pinnacle3: `Pinnacle 3 (Age ${pin.thirdPinnacleAge})`,
      pinnacle4: `Pinnacle 4 (Age ${pin.fourthPinnacleAge})`,
      advice: 'Advice'
    };

    const meaningSet = currentLang === 'vi' ? meanings : meaningsEn;
    const challengeMeaningSet = currentLang === 'vi' ? challengeMeanings : challengeMeaningsEn;
    const pinnacleAdviceSet = currentLang === 'vi' ? pinnacleAdvice : pinnacleAdviceEn;

    sumDiv.innerHTML = `<div class="result-card"><h2>${translations[currentLang].tabOverview}</h2>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Con đường sống và mục đích chính' : 'Life path and core purpose'}">${labels.lifePath}:</strong> ${lpn}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Mong muốn nội tâm và động lực sâu xa' : 'Inner desires and motivation'}">${labels.soulUrge}:</strong> ${sun}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Cách thể hiện bản thân ra bên ngoài' : 'How you present yourself externally'}">${labels.personality}:</strong> ${pn}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Cách tương tác và thể hiện tài năng' : 'How you interact and express talents'}">${labels.expression}:</strong> ${add.expressionNumber}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Đam mê tiềm ẩn hoặc phẩm chất nổi bật' : 'Hidden passion or prominent trait'}">${labels.hiddenPassion}:</strong> ${add.hiddenPassionNumber}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Đặc điểm và năng lượng ngày sinh' : 'Traits and energy of birth day'}">${labels.birthDay}:</strong> ${add.birthDayNumber}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Thử thách cần vượt qua trong giai đoạn đầu' : 'Challenge to overcome in first phase'}">${labels.challenge1}:</strong> ${add.challenge1}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Thử thách cần vượt qua trong giai đoạn thứ hai' : 'Challenge to overcome in second phase'}">${labels.challenge2}:</strong> ${add.challenge2}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Thử thách cần vượt qua trong giai đoạn thứ ba' : 'Challenge to overcome in third phase'}">${labels.challenge3}:</strong> ${add.challenge3}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Thử thách cần vượt qua trong giai đoạn cuối' : 'Challenge to overcome in final phase'}">${labels.challenge4}:</strong> ${add.challenge4}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Giai đoạn quan trọng đầu tiên' : 'First significant life phase'}">${labels.pinnacle1}:</strong> ${pin.firstPinnacle}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Giai đoạn quan trọng thứ hai' : 'Second significant life phase'}">${labels.pinnacle2}:</strong> ${pin.secondPinnacle}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Giai đoạn quan trọng thứ ba' : 'Third significant life phase'}">${labels.pinnacle3}:</strong> ${pin.thirdPinnacle}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Giai đoạn quan trọng cuối cùng' : 'Final significant life phase'}">${labels.pinnacle4}:</strong> ${pin.fourthPinnacle}</p></div>`;

    document.getElementById('details').innerHTML = `<div class="result-card"><h2>${translations[currentLang].btnShowDetails}</h2>
      <p><strong>${labels.lifePath}:</strong> ${lpn} - ${meaningSet[lpn]}</p>
      <p><strong>${labels.soulUrge}:</strong> ${sun} - ${meaningSet[sun]}</p>
      <p><strong>${labels.personality}:</strong> ${pn} - ${meaningSet[pn]}</p>
      <p><strong>${labels.expression}:</strong> ${add.expressionNumber} - ${meaningSet[add.expressionNumber]}</p>
      <p><strong>${labels.hiddenPassion}:</strong> ${add.hiddenPassionNumber} - ${meaningSet[add.hiddenPassionNumber]}</p>
      <p><strong>${labels.birthDay}:</strong> ${add.birthDayNumber} - ${meaningSet[add.birthDayNumber]}</p>
      <p><strong>${labels.challenge1}:</strong> ${add.challenge1} - ${challengeMeaningSet[add.challenge1]}</p>
      <p><strong>${labels.challenge2}:</strong> ${add.challenge2} - ${challengeMeaningSet[add.challenge2]}</p>
      <p><strong>${labels.challenge3}:</strong> ${add.challenge3} - ${challengeMeaningSet[add.challenge3]}</p>
      <p><strong>${labels.challenge4}:</strong> ${add.challenge4} - ${challengeMeaningSet[add.challenge4]}</p>
      <p><strong>${labels.pinnacle1}:</strong> ${pin.firstPinnacle} - ${meaningSet[pin.firstPinnacle]} <strong>${labels.advice}:</strong> ${pinnacleAdviceSet[pin.firstPinnacle]}</p>
      <p><strong>${labels.pinnacle2}:</strong> ${pin.secondPinnacle} - ${meaningSet[pin.secondPinnacle]} <strong>${labels.advice}:</strong> ${pinnacleAdviceSet[pin.secondPinnacle]}</p>
      <p><strong>${labels.pinnacle3}:</strong> ${pin.thirdPinnacle} - ${meaningSet[pin.thirdPinnacle]} <strong>${labels.advice}:</strong> ${pinnacleAdviceSet[pin.thirdPinnacle]}</p>
      <p><strong>${labels.pinnacle4}:</strong> ${pin.fourthPinnacle} - ${meaningSet[pin.fourthPinnacle]} <strong>${labels.advice}:</strong> ${pinnacleAdviceSet[pin.fourthPinnacle]}</p>
      <canvas id="pinnacleChart"></canvas></div>`;

    document.getElementById('calculationDetails').innerHTML = `<div class="result-card"><h2>${translations[currentLang].btnShowCalc}</h2>
      <p><strong>${labels.lifePath}:</strong> ${d}→${String(d).split('').join('+')} + ${m}→${String(m).split('').join('+')} + ${y}→${String(y).split('').join('+')} = ${sumDigits(d)+sumDigits(m)+sumDigits(y)} → ${lpn}</p>
      <p><strong>${labels.soulUrge}:</strong> ${suSteps.join(', ')} = ${suSum} → ${sun}</p>
      <p><strong>${labels.personality}:</strong> ${pSteps.join(', ')} = ${pSum} → ${pn}</p>
      <p><strong>${labels.expression}:</strong> ${translations[currentLang].tabOverview ? 'Tổng tất cả chữ cái' : 'Sum of all letters'} = ${add.expressionNumber}</p>
      <p><strong>${labels.birthDay}:</strong> ${d} → ${add.birthDayNumber}</p>
      <p><strong>${labels.challenge1}:</strong> |${d}-${m}| = ${add.challenge1}</p>
      <p><strong>${labels.challenge2}:</strong> |${d}-${ys}| = ${add.challenge2}</p>
      <p><strong>${labels.challenge3}:</strong> |${add.challenge1}-${add.challenge2}| = ${add.challenge3}</p>
      <p><strong>${labels.challenge4}:</strong> |${m}-${ys}| = ${add.challenge4}</p>
      <p><strong>${labels.pinnacle1}:</strong> ${d}+${m} = ${d+m} → ${pin.firstPinnacle} (${pin.firstPinnacleAge})</p>
      <p><strong>${labels.pinnacle2}:</strong> ${d}+${ys} = ${d+ys} → ${pin.secondPinnacle} (${pin.secondPinnacleAge})</p>
      <p><strong>${labels.pinnacle3}:</strong> ${pin.firstPinnacle}+${pin.secondPinnacle} → ${pin.thirdPinnacle} (${pin.thirdPinnacleAge})</p>
      <p><strong>${labels.pinnacle4}:</strong> ${m}+${ys} = ${m+ys} → ${pin.fourthPinnacle} (${pin.fourthPinnacleAge})</p></div>`;

    document.getElementById('meanings').innerHTML = `<div class="result-card"><h2>${translations[currentLang].btnShowMeanings}</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>${labels.lifePath}:</strong> ${translations[currentLang].tabOverview ? 'Con đường sống và mục đích chính.' : 'Life path and core purpose.'}</li>
        <li><strong>${labels.soulUrge}:</strong> ${translations[currentLang].tabOverview ? 'Mong muốn nội tâm và động lực sâu xa.' : 'Inner desires and motivation.'}</li>
        <li><strong>${labels.personality}:</strong> ${translations[currentLang].tabOverview ? 'Cách thể hiện bản thân ra bên ngoài.' : 'How you present yourself externally.'}</li>
        <li><strong>${labels.expression}:</strong> ${translations[currentLang].tabOverview ? 'Cách tương tác và thể hiện tài năng.' : 'How you interact and express talents.'}</li>
        <li><strong>${labels.hiddenPassion}:</strong> ${translations[currentLang].tabOverview ? 'Đam mê tiềm ẩn hoặc phẩm chất nổi bật.' : 'Hidden passion or prominent trait.'}</li>
        <li><strong>${labels.birthDay}:</strong> ${translations[currentLang].tabOverview ? 'Đặc điểm và năng lượng ngày sinh.' : 'Traits and energy of birth day.'}</li>
        <li><strong>${translations[currentLang].tabOverview ? 'Con số đỉnh cao' : 'Pinnacle Numbers'}:</strong> ${translations[currentLang].tabOverview ? 'Giai đoạn quan trọng trong cuộc đời.' : 'Significant life phases.'}</li>
        <li><strong>${translations[currentLang].tabOverview ? 'Con số thách thức' : 'Challenge Numbers'}:</strong> ${translations[currentLang].tabOverview ? 'Những thử thách cần vượt qua.' : 'Challenges to overcome.'}</li>
      </ul></div>`;

    new Chart(document.getElementById('pinnacleChart'), {
      type: 'line',
      data: {
        labels: [`${pin.firstPinnacleAge}`, `${pin.secondPinnacleAge}`, `${pin.thirdPinnacleAge}`, `${pin.fourthPinnacleAge}`],
        datasets: [{
          label: translations[currentLang].tabOverview ? 'Con số đỉnh cao' : 'Pinnacle Numbers',
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
          y: { beginAtZero: true, title: { display: true, text: translations[currentLang].tabOverview ? 'Giá Trị Thần Số Học' : 'Numerology Value' } },
          x: { title: { display: true, text: translations[currentLang].tabOverview ? 'Các Giai Đoạn Đỉnh Cao' : 'Life Peaks' } }
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
    // PDF Download Handler
    // PDF Download Handler (inside calculateNumerology function)
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
  
  // Select correct meaning sets for PDF
  const pdfMeaningSet = currentLang === 'vi' ? meaningsViPDF : meaningsEn;
  const pdfChallengeMeaningSet = currentLang === 'vi' ? challengeMeaningsViPDF : challengeMeaningsEn;
  const pdfPinnacleAdviceSet = currentLang === 'vi' ? pinnacleAdviceViPDF : pinnacleAdviceEn;
  
  // ASCII-safe labels for Vietnamese PDF
  const pdfLabels = currentLang === 'vi' ? {
    lifePath: 'Con so chu dao (Life Path)',
    soulUrge: 'Con so linh hon (Soul Urge)',
    personality: 'Con so nhan cach (Personality)',
    expression: 'Con so tuong tac (Expression)',
    hiddenPassion: 'Con so linh hon an (Hidden Passion)',
    birthDay: 'Con so ngay sinh (Birth Day)',
    challenge1: 'Con so thach thuc dinh cao 1 (Challenge 1)',
    challenge2: 'Con so thach thuc dinh cao 2 (Challenge 2)',
    challenge3: 'Con so thach thuc dinh cao 3 (Challenge 3)',
    challenge4: 'Con so thach thuc dinh cao 4 (Challenge 4)',
    pinnacle1: `Con so dinh cao 1 (Pinnacle 1, Age ${pin.firstPinnacleAge})`,
    pinnacle2: `Con so dinh cao 2 (Pinnacle 2, Age ${pin.secondPinnacleAge})`,
    pinnacle3: `Con so dinh cao 3 (Pinnacle 3, Age ${pin.thirdPinnacleAge})`,
    pinnacle4: `Con so dinh cao 4 (Pinnacle 4, Age ${pin.fourthPinnacleAge})`,
    advice: 'Loi khuyen',
    fullName: 'Ho va Ten',
    birthDate: 'Ngay Sinh'
  } : labels;
  
  // Title
  addText(currentLang === 'vi' ? 'BAO CAO THAN SO HOC' : 'NUMEROLOGY REPORT', 18);
  yPos += 3;
  
  // Basic info
  addText(`${pdfLabels.fullName}: ${name}`, 12);
  addText(`${pdfLabels.birthDate}: ${d}/${m}/${y}`, 12);
  yPos += 3;
  
  // Numbers with meanings
  addText(`${pdfLabels.lifePath}: ${lpn}`, 11);
  addText(stripHtml(pdfMeaningSet[lpn]));
  yPos += 2;
  
  addText(`${pdfLabels.soulUrge}: ${sun}`, 11);
  addText(stripHtml(pdfMeaningSet[sun]));
  yPos += 2;
  
  addText(`${pdfLabels.personality}: ${pn}`, 11);
  addText(stripHtml(pdfMeaningSet[pn]));
  yPos += 2;
  
  addText(`${pdfLabels.expression}: ${add.expressionNumber}`, 11);
  addText(stripHtml(pdfMeaningSet[add.expressionNumber]));
  yPos += 2;
  
  addText(`${pdfLabels.hiddenPassion}: ${add.hiddenPassionNumber}`, 11);
  addText(stripHtml(pdfMeaningSet[add.hiddenPassionNumber]));
  yPos += 2;
  
  addText(`${pdfLabels.birthDay}: ${add.birthDayNumber}`, 11);
  addText(stripHtml(pdfMeaningSet[add.birthDayNumber]));
  yPos += 2;
  
  addText(`${pdfLabels.challenge1}: ${add.challenge1}`, 11);
  addText(stripHtml(pdfChallengeMeaningSet[add.challenge1]));
  yPos += 2;
  
  addText(`${pdfLabels.challenge2}: ${add.challenge2}`, 11);
  addText(stripHtml(pdfChallengeMeaningSet[add.challenge2]));
  yPos += 2;
  
  addText(`${pdfLabels.challenge3}: ${add.challenge3}`, 11);
  addText(stripHtml(pdfChallengeMeaningSet[add.challenge3]));
  yPos += 2;
  
  addText(`${pdfLabels.challenge4}: ${add.challenge4}`, 11);
  addText(stripHtml(pdfChallengeMeaningSet[add.challenge4]));
  yPos += 2;
  
  addText(`${pdfLabels.pinnacle1}: ${pin.firstPinnacle}`, 11);
  addText(stripHtml(pdfMeaningSet[pin.firstPinnacle]));
  addText(stripHtml(pdfPinnacleAdviceSet[pin.firstPinnacle]));
  yPos += 2;
  
  addText(`${pdfLabels.pinnacle2}: ${pin.secondPinnacle}`, 11);
  addText(stripHtml(pdfMeaningSet[pin.secondPinnacle]));
  addText(stripHtml(pdfPinnacleAdviceSet[pin.secondPinnacle]));
  yPos += 2;
  
  addText(`${pdfLabels.pinnacle3}: ${pin.thirdPinnacle}`, 11);
  addText(stripHtml(pdfMeaningSet[pin.thirdPinnacle]));
  addText(stripHtml(pdfPinnacleAdviceSet[pin.thirdPinnacle]));
  yPos += 2;
  
  addText(`${pdfLabels.pinnacle4}: ${pin.fourthPinnacle}`, 11);
  addText(stripHtml(pdfMeaningSet[pin.fourthPinnacle]));
  addText(stripHtml(pdfPinnacleAdviceSet[pin.fourthPinnacle]));
  
  doc.save('numerology-report.pdf');
};

    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: "power2.out" });

    document.getElementById('calculateBtn').disabled = false;
    document.getElementById('loadingOverlay').classList.remove('active');
  }, 500);
}

function calculateDailyForecast() {
  const d = parseInt(document.getElementById('dailyDay').value);
  const m = parseInt(document.getElementById('dailyMonth').value);
  const y = parseInt(document.getElementById('dailyYear').value);
  const fDiv = document.getElementById('dailyForecast');

  if(!isValidDate(d,m,y)) {
    fDiv.innerHTML = `<p class="text-red-500 font-medium">${translations[currentLang].tabOverview ? 'Ngày sinh không hợp lệ!' : 'Invalid birth date!'}</p>`;
    return;
  }

  saveData('dailyInputs', {d, m, y});

  document.getElementById('dailyCalculateBtn').disabled = true;
  document.getElementById('loadingOverlay').classList.add('active');

  setTimeout(() => {
    const f = calculateDailyNumber(d,m,y);
    const now = new Date();
    const cy = now.getFullYear(), cm = now.getMonth()+1, cd = now.getDate();
    const s = dailySuggestions[f.personalDay] || {do: translations[currentLang].tabOverview ? 'Hôm nay là một ngày bình thường, hãy làm những gì bạn cảm thấy phù hợp.' : 'Today is a normal day, do what feels right.', avoid: translations[currentLang].tabOverview ? 'Tránh hành động vội vàng.' : 'Avoid rash actions.'};

    fDiv.innerHTML = `<div class="result-card"><h2>${translations[currentLang].tabDaily} - ${now.toLocaleDateString(currentLang)}</h2>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Năng lượng chính của năm' : 'Main energy of the year'}">${translations[currentLang].tabOverview ? 'Năm cá nhân' : 'Personal Year'}:</strong> ${f.personalYear} - ${currentLang === 'vi' ? meanings[f.personalYear] : meaningsEn[f.personalYear]}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Năng lượng của tháng hiện tại' : 'Energy of the current month'}">${translations[currentLang].tabOverview ? 'Tháng cá nhân' : 'Personal Month'}:</strong> ${f.personalMonth} - ${currentLang === 'vi' ? meanings[f.personalMonth] : meaningsEn[f.personalMonth]}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Năng lượng của ngày hôm nay' : 'Energy of today'}">${translations[currentLang].tabOverview ? 'Ngày cá nhân' : 'Personal Day'}:</strong> ${f.personalDay} - ${currentLang === 'vi' ? meanings[f.personalDay] : meaningsEn[f.personalDay]}</p>
      <h3 class="font-semibold mt-4">${translations[currentLang].tabOverview ? 'Gợi ý cho hôm nay' : 'Suggestions for Today'}:</h3><p>${s.do}</p>
      <h3 class="font-semibold mt-4">${translations[currentLang].tabOverview ? 'Những việc nên tránh' : 'Things to Avoid'}:</h3><p>${s.avoid}</p></div>`;

    document.getElementById('dailyCalculationDetails').innerHTML = `<div class="result-card"><h2>${translations[currentLang].btnShowCalc}</h2>
      <p><strong>${translations[currentLang].tabOverview ? 'Năm cá nhân' : 'Personal Year'}:</strong> ${d}+${m}+${cy} → ${f.personalYear}</p>
      <p><strong>${translations[currentLang].tabOverview ? 'Tháng cá nhân' : 'Personal Month'}:</strong> ${f.personalYear}+${cm} → ${f.personalMonth}</p>
      <p><strong>${translations[currentLang].tabOverview ? 'Ngày cá nhân' : 'Personal Day'}:</strong> ${f.personalMonth}+${cd} → ${f.personalDay}</p></div>`;

    document.getElementById('dailyShowCalcBtn').classList.remove('hidden');
    document.getElementById('dailyCalculationDetails').classList.add('details-hidden');
    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: "power2.out" });
    document.getElementById('dailyCalculateBtn').disabled = false;
    document.getElementById('loadingOverlay').classList.remove('active');
  }, 500);
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
    cDiv.innerHTML = `<p class="text-red-500 font-medium">${translations[currentLang].tabOverview ? 'Họ tên chỉ được chứa chữ cái và khoảng trắng!' : 'Names can only contain letters and spaces!'}</p>`;
    return;
  }
  if(!isValidDate(d1,m1,y1) || !isValidDate(d2,m2,y2)) {
    cDiv.innerHTML = `<p class="text-red-500 font-medium">${translations[currentLang].tabOverview ? 'Ngày sinh không hợp lệ!' : 'Invalid birth date!'}</p>`;
    return;
  }

  saveData('compatInputs', {n1, d1, m1, y1, n2, d2, m2, y2});

  document.getElementById('compatCalculateBtn').disabled = true;
  document.getElementById('loadingOverlay').classList.add('active');

  setTimeout(() => {
    const c = calculateCompatibility(n1,d1,m1,y1,n2,d2,m2,y2);

    cDiv.innerHTML = `<div class="result-card"><h2>${translations[currentLang].tabCompat}</h2>
      <p><strong>${translations[currentLang].labelPerson1}:</strong> ${n1} (${d1}/${m1}/${y1})</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Con đường sống và mục đích chính' : 'Life path and core purpose'}">${translations[currentLang].tabOverview ? 'Con số chủ đạo' : 'Life Path Number'}:</strong> ${c.lifePathNumber1} - ${currentLang === 'vi' ? meanings[c.lifePathNumber1] : meaningsEn[c.lifePathNumber1]}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Cách tương tác và thể hiện tài năng' : 'How you interact and express talents'}">${translations[currentLang].tabOverview ? 'Con số tương tác' : 'Expression Number'}:</strong> ${c.expressionNumber1} - ${currentLang === 'vi' ? meanings[c.expressionNumber1] : meaningsEn[c.expressionNumber1]}</p>
      <p><strong>${translations[currentLang].labelPerson2}:</strong> ${n2} (${d2}/${m2}/${y2})</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Con đường sống và mục đích chính' : 'Life path and core purpose'}">${translations[currentLang].tabOverview ? 'Con số chủ đạo' : 'Life Path Number'}:</strong> ${c.lifePathNumber2} - ${currentLang === 'vi' ? meanings[c.lifePathNumber2] : meaningsEn[c.lifePathNumber2]}</p>
      <p><strong data-tooltip="${translations[currentLang].tabOverview ? 'Cách tương tác và thể hiện tài năng' : 'How you interact and express talents'}">${translations[currentLang].tabOverview ? 'Con số tương tác' : 'Expression Number'}:</strong> ${c.expressionNumber2} - ${currentLang === 'vi' ? meanings[c.expressionNumber2] : meaningsEn[c.expressionNumber2]}</p>
      <h3 class="font-semibold mt-4">${translations[currentLang].tabCompat ? 'Mức độ tương hợp' : 'Compatibility Level'}:</h3>
      <p><strong>${c.overallCompat}%</strong> - ${c.description}</p></div>`;

    document.getElementById('compatCalculationDetails').innerHTML = `<div class="result-card"><h2>${translations[currentLang].btnShowCalc}</h2>
      <p><strong>${translations[currentLang].tabOverview ? 'Con số chủ đạo 1' : 'Life Path Number 1'}:</strong> ${d1}+${m1}+${y1} → ${c.lifePathNumber1}</p>
      <p><strong>${translations[currentLang].tabOverview ? 'Con số tương tác 1' : 'Expression Number 1'}:</strong> ${translations[currentLang].tabOverview ? 'Tổng chữ cái' : 'Sum of letters'} → ${c.expressionNumber1}</p>
      <p><strong>${translations[currentLang].tabOverview ? 'Con số chủ đạo 2' : 'Life Path Number 2'}:</strong> ${d2}+${m2}+${y2} → ${c.lifePathNumber2}</p>
      <p><strong>${translations[currentLang].tabOverview ? 'Con số tương tác 2' : 'Expression Number 2'}:</strong> ${translations[currentLang].tabOverview ? 'Tổng chữ cái' : 'Sum of letters'} → ${c.expressionNumber2}</p>
      <p><strong>${translations[currentLang].tabCompat ? 'Tương hợp con số chủ đạo' : 'Life Path Compatibility'}:</strong> ${c.lifePathCompat}%</p>
      <p><strong>${translations[currentLang].tabCompat ? 'Tương hợp con số tương tác' : 'Expression Compatibility'}:</strong> ${c.expressionCompat}%</p>
      <p><strong>${translations[currentLang].tabCompat ? 'Tương hợp tổng thể' : 'Overall Compatibility'}:</strong> (${c.lifePathCompat}+${c.expressionCompat})/2 = ${c.overallCompat}%</p></div>`;

    document.getElementById('compatShowCalcBtn').classList.remove('hidden');
    document.getElementById('compatCalculationDetails').classList.add('details-hidden');
    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: "power2.out" });
    document.getElementById('compatCalculateBtn').disabled = false;
    document.getElementById('loadingOverlay').classList.remove('active');
  }, 500);
}

function calculateNameSuggestions() {
  const d = parseInt(document.getElementById('nameSuggestDay').value);
  const m = parseInt(document.getElementById('nameSuggestMonth').value);
  const y = parseInt(document.getElementById('nameSuggestYear').value);
  const resultDiv = document.getElementById('nameSuggestResult');

  if(!isValidDate(d,m,y)) {
    resultDiv.innerHTML = `<p class="text-red-500 font-medium">${translations[currentLang].tabOverview ? 'Ngày sinh không hợp lệ!' : 'Invalid birth date!'}</p>`;
    return;
  }

  saveData('nameSuggestInputs', {d, m, y});

  document.getElementById('nameSuggestCalculateBtn').disabled = true;
  document.getElementById('loadingOverlay').classList.add('active');

  setTimeout(() => {
    const lpn = reduceToSingleDigit(sumDigits(d) + sumDigits(m) + sumDigits(y), true);
    // Mixed English and Vietnamese name suggestions
    const suggestedNames = [
      'Anh', 'Minh', 'Ngoc', 'Hieu', 'Linh',
      'Emma', 'Liam', 'Sophia', 'Noah', 'Olivia'
    ].map(name => ({
      name,
      expressionNumber: reduceToSingleDigit(name.split('').reduce((s, l) => s + getLetterValue(l), 0), true)
    }));
    resultDiv.innerHTML = `<div class="result-card"><h2>${translations[currentLang].tabNameSuggest}</h2>
      <p><strong>${translations[currentLang].labelBirthDate}:</strong> ${d}/${m}/${y}</p>
      <p><strong>${translations[currentLang].tabOverview ? 'Con số chủ đạo' : 'Life Path Number'}:</strong> ${lpn}</p>
      <h3 class="font-semibold mt-4">${translations[currentLang].tabOverview ? 'Tên gợi ý' : 'Suggested Names'}:</h3>
      <ul class="list-disc pl-5 space-y-2">${suggestedNames.map(n => `<li>${n.name} (${translations[currentLang].tabOverview ? 'Con số tương tác' : 'Expression Number'}: ${n.expressionNumber} - ${currentLang === 'vi' ? meanings[n.expressionNumber] : meaningsEn[n.expressionNumber]})</li>`).join('')}</ul>
      <p class="mt-4">${translations[currentLang].tabOverview ? 'Lưu ý: Những tên này được gợi ý để bổ sung năng lượng cho con số chủ đạo của bạn.' : 'Note: These names are suggested to complement your Life Path Number.'}</p></div>`;

    gsap.from(".result-card", { duration: 0.5, y: 20, opacity: 0, ease: "power2.out" });
    document.getElementById('nameSuggestCalculateBtn').disabled = false;
    document.getElementById('loadingOverlay').classList.remove('active');
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  updateTranslations();

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
  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    updateTranslations();
    localStorage.setItem('language', currentLang);
  });
  if(localStorage.getItem('language')) {
    currentLang = localStorage.getItem('language');
    updateTranslations();
  }

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
