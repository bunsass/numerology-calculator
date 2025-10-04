const CURRENT_YEAR = new Date().getFullYear();

// Normalize Vietnamese text
const normalizeName = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();

// Populate dropdowns
function populateDropdowns() {
  ['day','dailyDay','compatDay1','compatDay2'].forEach(id => {
    const sel = document.getElementById(id);
    for(let i=1; i<=31; i++) sel.innerHTML += `<option value="${i}">${i}</option>`;
  });
  ['month','dailyMonth','compatMonth1','compatMonth2'].forEach(id => {
    const sel = document.getElementById(id);
    for(let i=1; i<=12; i++) sel.innerHTML += `<option value="${i}">${i}</option>`;
  });
}

// Input restrictions
['year','dailyYear','compatYear1','compatYear2'].forEach(id => {
  document.getElementById(id).addEventListener('input', e => e.target.value = e.target.value.slice(0,4));
});
['fullName','compatName1','compatName2'].forEach(id => {
  document.getElementById(id).addEventListener('input', e => e.target.value = normalizeName(e.target.value));
});

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
  1:"Độc lập, lãnh đạo, sáng tạo. <strong>Cơ hội:</strong> Dẫn dắt dự án mới, khởi nghiệp. <strong>Thách thức:</strong> Cô lập, thiếu kiên nhẫn. <strong>Lời khuyên:</strong> Học hợp tác và lắng nghe người khác.",
  2:"Hợp tác, nhạy cảm, hòa hợp. <strong>Cơ hội:</strong> Xây dựng mối quan hệ, hòa giải. <strong>Thách thức:</strong> Phụ thuộc, né tránh xung đột. <strong>Lời khuyên:</strong> Đưa ra quyết định độc lập.",
  3:"Sáng tạo, vui vẻ, giao tiếp. <strong>Cơ hội:</strong> Nghệ thuật, viết lách, giải trí. <strong>Thách thức:</strong> Phân tán, thiếu sâu sắc. <strong>Lời khuyên:</strong> Tập trung vào mục tiêu dài hạn.",
  4:"Ổn định, thực tế, chăm chỉ. <strong>Cơ hội:</strong> Xây dựng nền tảng, quản lý. <strong>Thách thức:</strong> Cứng nhắc, kháng cự thay đổi. <strong>Lời khuyên:</strong> Linh hoạt hơn với ý tưởng mới.",
  5:"Tự do, phiêu lưu, linh hoạt. <strong>Cơ hội:</strong> Du lịch, trải nghiệm mới. <strong>Thách thức:</strong> Bất ổn, thiếu cam kết. <strong>Lời khuyên:</strong> Cân bằng tự do và trách nhiệm.",
  6:"Trách nhiệm, gia đình, yêu thương. <strong>Cơ hội:</strong> Hỗ trợ cộng đồng, chăm sóc. <strong>Thách thức:</strong> Kiệt sức, khó từ chối. <strong>Lời khuyên:</strong> Ưu tiên bản thân.",
  7:"Phân tích, tâm linh, nội tâm. <strong>Cơ hội:</strong> Nghiên cứu, thiền định. <strong>Thách thức:</strong> Cô lập, hoài nghi. <strong>Lời khuyên:</strong> Mở lòng với người khác.",
  8:"Quyền lực, thành công, tài chính. <strong>Cơ hội:</strong> Kinh doanh, lãnh đạo. <strong>Thách thức:</strong> Tham lam, mất cân bằng. <strong>Lời khuyên:</strong> Thực hành biết ơn.",
  9:"Nhân đạo, hoàn thành, cống hiến. <strong>Cơ hội:</strong> Từ thiện, giúp đỡ. <strong>Thách thức:</strong> Cảm xúc quá tải. <strong>Lời khuyên:</strong> Thực hành thiền.",
  11:"Trực giác, truyền cảm hứng, tâm linh. <strong>Cơ hội:</strong> Lãnh đạo tinh thần, sáng tạo. <strong>Thách thức:</strong> Nhạy cảm quá mức, lo lắng. <strong>Lời khuyên:</strong> Cân bằng năng lượng.",
  22:"Xây dựng, lý tưởng thực tế, master builder. <strong>Cơ hội:</strong> Dự án lớn, thay đổi thế giới. <strong>Thách thức:</strong> Áp lực, kiệt sức. <strong>Lời khuyên:</strong> Tập trung vào mục tiêu dài hạn.",
  33:"Thầy dạy, từ bi, hy sinh. <strong>Cơ hội:</strong> Hướng dẫn, chữa lành. <strong>Thách thức:</strong> Hy sinh quá mức. <strong>Lời khuyên:</strong> Chăm sóc bản thân."
};

const challengeMeanings = {
  0:"Không có thách thức cụ thể, tự do lựa chọn. <strong>Lời khuyên:</strong> Chọn đường đi khôn ngoan, tập trung vào con số chủ đạo.",
  1:"Học độc lập, tránh phụ thuộc. <strong>Lời khuyên:</strong> Phát triển tự tin và tự quyết.",
  2:"Xây dựng tự tin, tránh nhạy cảm quá mức. <strong>Lời khuyên:</strong> Học cách đối mặt với phê bình.",
  3:"Tập trung biểu đạt, tránh phân tán. <strong>Lời khuyên:</strong> Phát triển kỷ luật sáng tạo.",
  4:"Học tổ chức, tránh cứng nhắc. <strong>Lời khuyên:</strong> Linh hoạt với thay đổi.",
  5:"Thích nghi thay đổi, tránh vô trách nhiệm. <strong>Lời khuyên:</strong> Tìm cân bằng trong tự do.",
  6:"Chấp nhận trách nhiệm, tránh cầu toàn. <strong>Lời khuyên:</strong> Học tha thứ và buông xả.",
  7:"Mở lòng với người khác, tránh hoài nghi. <strong>Lời khuyên:</strong> Xây dựng niềm tin.",
  8:"Cân bằng vật chất và tinh thần, tránh tham lam. <strong>Lời khuyên:</strong> Tập trung vào giá trị thực."
};

const pinnacleAdvice = {
  1:"Hãy tận dụng giai đoạn này để khẳng định bản thân và dẫn dắt các dự án mới.",
  2:"Tập trung xây dựng các mối quan hệ và hợp tác, lắng nghe cảm xúc của bản thân.",
  3:"Khám phá sự sáng tạo, thể hiện bản thân qua nghệ thuật hoặc giao tiếp.",
  4:"Xây dựng nền tảng vững chắc, tập trung vào tổ chức và kỷ luật.",
  5:"Chấp nhận thay đổi và khám phá cơ hội mới, nhưng giữ sự cân bằng.",
  6:"Chăm sóc gia đình và cộng đồng, ưu tiên trách nhiệm và yêu thương.",
  7:"Suy ngẫm và tìm kiếm sự tĩnh lặng để phát triển nội tâm và trí tuệ.",
  8:"Tận dụng năng lượng để đạt thành công về tài chính và sự nghiệp, nhưng giữ cân bằng.",
  9:"Hướng tới các mục tiêu nhân đạo, giúp đỡ người khác và sống vì lý tưởng cao cả.",
  11:"Lắng nghe trực giác và truyền cảm hứng cho người khác qua sự sáng tạo.",
  22:"Tập trung vào các dự án lớn và xây dựng tương lai. Lập kế hoạch chi tiết và làm việc hướng tới mục tiêu lâu dài.",
  33:"Chia sẻ kiến thức và lòng từ bi, nhưng đừng quên chăm sóc bản thân."
};

const dailySuggestions = {
  1:{do:"Hôm nay là ngày để tỏa sáng và dẫn đầu! Hãy bắt đầu một dự án mới, đưa ra ý tưởng táo bạo hoặc thử sức với một thử thách cá nhân. Tự tin thể hiện bản thân và nắm bắt cơ hội.",avoid:"Tránh né tránh trách nhiệm hoặc phụ thuộc vào người khác để đưa ra quyết định. Đừng để sự thiếu kiên nhẫn làm hỏng cơ hội."},
  2:{do:"Tập trung vào các mối quan hệ và sự hợp tác. Đây là ngày lý tưởng để trò chuyện, hòa giải hoặc hỗ trợ bạn bè, gia đình. Hãy lắng nghe và kết nối cảm xúc.",avoid:"Tránh né tránh xung đột hoặc giữ im lặng khi cần bày tỏ ý kiến. Đừng để sự nhạy cảm quá mức làm bạn mất cân bằng."},
  3:{do:"Năng lượng sáng tạo đang dâng cao! Viết lách, vẽ tranh, hoặc tham gia hoạt động nghệ thuật. Giao tiếp vui vẻ và lan tỏa năng lượng tích cực đến mọi người.",avoid:"Tránh phân tán năng lượng vào quá nhiều việc hoặc thiếu tập trung. Đừng để những lời nói bộc phát gây hiểu lầm."},
  4:{do:"Hôm nay phù hợp để tổ chức, lập kế hoạch hoặc hoàn thành công việc. Xây dựng nền tảng vững chắc cho mục tiêu dài hạn và giữ kỷ luật trong công việc.",avoid:"Tránh cứng nhắc hoặc từ chối thay đổi. Đừng làm việc quá sức mà quên chăm sóc bản thân."},
  5:{do:"Khám phá và thay đổi! Hãy thử một hoạt động mới, đi đâu đó hoặc gặp gỡ người mới. Linh hoạt và cởi mở với những cơ hội bất ngờ.",avoid:"Tránh hành động bốc đồng hoặc bỏ qua trách nhiệm. Đừng để sự thiếu cam kết ảnh hưởng đến các mối quan hệ."},
  6:{do:"Dành thời gian cho gia đình, bạn bè hoặc cộng đồng. Hôm nay là ngày để chăm sóc, yêu thương và tạo ra sự hài hòa trong các mối quan hệ.",avoid:"Tránh ôm đồm quá nhiều trách nhiệm hoặc quên chăm sóc bản thân. Đừng để sự cầu toàn làm bạn căng thẳng."},
  7:{do:"Tìm kiếm sự tĩnh lặng và suy ngẫm. Thiền, đọc sách hoặc nghiên cứu một chủ đề bạn yêu thích. Kết nối với nội tâm sẽ mang lại sự rõ ràng.",avoid:"Tránh cô lập bản thân quá lâu hoặc nghi ngờ mọi thứ. Đừng từ chối sự hỗ trợ từ người khác."},
  8:{do:"Tập trung vào tài chính và mục tiêu sự nghiệp. Hôm nay là ngày tốt để lập kế hoạch kinh doanh, đàm phán hoặc đầu tư. Hãy giữ sự tự tin.",avoid:"Tránh tham lam hoặc chỉ tập trung vào vật chất. Đừng bỏ qua các mối quan hệ cá nhân vì công việc."},
  9:{do:"Lan tỏa lòng nhân ái và giúp đỡ người khác. Tham gia hoạt động từ thiện hoặc hỗ trợ ai đó đang cần. Hôm nay là ngày để sống vì mục đích cao cả.",avoid:"Tránh giữ lấy những cảm xúc tiêu cực hoặc quá khứ. Đừng để sự nhạy cảm làm bạn kiệt sức."},
  11:{do:"Lắng nghe trực giác của bạn. Đây là ngày để thiền định, tìm kiếm ý nghĩa tâm linh hoặc truyền cảm hứng cho người khác. Hãy tin vào linh cảm của mình.",avoid:"Tránh để sự nhạy cảm quá mức dẫn đến lo lắng. Đừng bỏ qua các chi tiết thực tế trong công việc."},
  22:{do:"Tập trung vào các dự án lớn và xây dựng tương lai. Lập kế hoạch chi tiết và làm việc hướng tới mục tiêu lâu dài. Hôm nay là ngày để biến ước mơ thành hiện thực.",avoid:"Tránh để áp lực làm bạn kiệt sức. Đừng bỏ qua các chi tiết nhỏ hoặc làm việc mà không có kế hoạch."},
  33:{do:"Hãy hướng dẫn và truyền cảm hứng cho người khác. Dành thời gian để chia sẻ kiến thức hoặc hỗ trợ ai đó. Hôm nay là ngày để thể hiện lòng từ bi.",avoid:"Tránh hy sinh quá mức mà quên chăm sóc bản thân. Đừng để cảm xúc chi phối các quyết định quan trọng."}
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
  return {firstPinnacle:p1,secondPinnacle:p2,thirdPinnacle:p3,fourthPinnacle:p4,firstPinnacleAge:`${a1} - ${a1+8}`,secondPinnacleAge:`${a1+9} - ${a1+17}`,thirdPinnacleAge:`${a1+18} - ${a1+26}`,fourthPinnacleAge:`${a1+27} trở đi`};
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
  
  const cm = {1:{1:90,2:70,3:80,4:60,5:75,6:65,7:70,8:85,9:80,11:90,22:70,33:80},2:{1:70,2:95,3:65,4:85,5:60,6:90,7:80,8:65,9:75,11:70,22:85,33:90},3:{1:80,2:65,3:90,4:60,5:85,6:75,7:70,8:65,9:90,11:80,22:60,33:85},4:{1:60,2:85,3:60,4:90,5:65,6:80,7:75,8:85,9:70,11:60,22:90,33:80},5:{1:75,2:60,3:85,4:65,5:90,6:70,7:80,8:65,9:85,11:75,22:65,33:70},6:{1:65,2:90,3:75,4:80,5:70,6:95,7:65,8:75,9:85,11:70,22:80,33:90},7:{1:70,2:80,3:70,4:75,5:80,6:65,7:90,8:60,9:75,11:85,22:70,33:80},8:{1:85,2:65,3:65,4:85,5:65,6:75,7:60,8:90,9:70,11:65,22:85,33:75},9:{1:80,2:75,3:90,4:70,5:85,6:85,7:75,8:70,9:95,11:80,22:70,33:90},11:{1:90,2:70,3:80,4:60,5:75,6:70,7:85,8:65,9:80,11:95,22:70,33:90},22:{1:70,2:85,3:60,4:90,5:65,6:80,7:70,8:85,9:70,11:70,22:95,33:80},33:{1:80,2:90,3:85,4:80,5:70,6:90,7:80,8:75,9:90,11:90,22:80,33:95}};
  
  const oc = Math.round((cm[lpn1][lpn2] + cm[en1][en2]) / 2);
  const desc = oc >= 90 ? "Mức độ tương hợp tuyệt vời! Hai bạn có sự kết nối mạnh mẽ về cả tinh thần và tính cách, dễ dàng hỗ trợ và thấu hiểu nhau." : oc >= 80 ? "Mức độ tương hợp cao! Hai bạn có nhiều điểm chung, nhưng cần chú ý giao tiếp để duy trì sự hài hòa." : oc >= 70 ? "Mức độ tương hợp tốt. Mối quan hệ có tiềm năng, nhưng cần nỗ lực để vượt qua một số khác biệt." : oc >= 60 ? "Mức độ tương hợp trung bình. Hai bạn có thể gặp một số thách thức, cần kiên nhẫn và thấu hiểu." : "Mức độ tương hợp thấp. Hai bạn cần làm việc nhiều để hiểu và hòa hợp với nhau.";
  
  return {lifePathNumber1:lpn1, expressionNumber1:en1, lifePathNumber2:lpn2, expressionNumber2:en2, overallCompat:oc, description:desc, lifePathCompat:cm[lpn1][lpn2], expressionCompat:cm[en1][en2]};
}

const isValidDate = (d, m, y) => {
  const date = new Date(y, m-1, d);
  return date.getDate() === d && date.getMonth() === m-1 && date.getFullYear() === y && y >= 1900 && y <= CURRENT_YEAR;
};

const toggleDetails = (div, btn, hideText, showText) => {
  div.classList.toggle('details-hidden');
  div.classList.toggle('details-shown');
  btn.textContent = div.classList.contains('details-shown') ? hideText : showText;
};

function calculateNumerology() {
  const name = document.getElementById('fullName').value.trim();
  const d = parseInt(document.getElementById('day').value);
  const m = parseInt(document.getElementById('month').value);
  const y = parseInt(document.getElementById('year').value);
  const sumDiv = document.getElementById('summary');
  
  if(!name || !/^[a-z\s]*$/.test(name)) {
    sumDiv.innerHTML = '<p class="text-red-500 font-medium">Họ tên chỉ được chứa chữ cái và khoảng trắng!</p>';
    return;
  }
  if(!isValidDate(d,m,y)) {
    sumDiv.innerHTML = '<p class="text-red-500 font-medium">Ngày sinh không hợp lệ!</p>';
    return;
  }
  
  // Save inputs
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
    
    sumDiv.innerHTML = `<div class="result-card"><h2>Kết Quả Tổng Quan</h2><p><strong>Họ và tên:</strong> ${name}</p><p><strong>Ngày sinh:</strong> ${d}/${m}/${y}</p><p><strong>Con số chủ đạo (Số đường đời):</strong> ${lpn}</p><p><strong>Con số linh hồn:</strong> ${sun}</p><p><strong>Con số nhân cách:</strong> ${pn}</p><p><strong>Con số tương tác:</strong> ${add.expressionNumber}</p><p><strong>Con số linh hồn ẩn:</strong> ${add.hiddenPassionNumber}</p><p><strong>Con số ngày sinh:</strong> ${add.birthDayNumber}</p><p><strong>Con số thách thức đỉnh cao 1:</strong> ${add.challenge1}</p><p><strong>Con số thách thức đỉnh cao 2:</strong> ${add.challenge2}</p><p><strong>Con số thách thức đỉnh cao 3:</strong> ${add.challenge3}</p><p><strong>Con số thách thức đỉnh cao 4:</strong> ${add.challenge4}</p><p><strong>Con số đỉnh cao 1 (Tuổi ${pin.firstPinnacleAge}):</strong> ${pin.firstPinnacle}</p><p><strong>Con số đỉnh cao 2 (Tuổi ${pin.secondPinnacleAge}):</strong> ${pin.secondPinnacle}</p><p><strong>Con số đỉnh cao 3 (Tuổi ${pin.thirdPinnacleAge}):</strong> ${pin.thirdPinnacle}</p><p><strong>Con số đỉnh cao 4 (Tuổi ${pin.fourthPinnacleAge}):</strong> ${pin.fourthPinnacle}</p></div>`;
    
    document.getElementById('details').innerHTML = `<div class="result-card"><h2>Chi Tiết Thần Số Học</h2><p><strong>Con số chủ đạo:</strong> ${lpn} - ${meanings[lpn]}</p><p><strong>Con số linh hồn:</strong> ${sun} - ${meanings[sun]}</p><p><strong>Con số nhân cách:</strong> ${pn} - ${meanings[pn]}</p><p><strong>Con số tương tác:</strong> ${add.expressionNumber} - ${meanings[add.expressionNumber]}</p><p><strong>Con số linh hồn ẩn:</strong> ${add.hiddenPassionNumber} - ${meanings[add.hiddenPassionNumber]}</p><p><strong>Con số ngày sinh:</strong> ${add.birthDayNumber} - ${meanings[add.birthDayNumber]}</p><p><strong>Con số thách thức 1:</strong> ${add.challenge1} - ${challengeMeanings[add.challenge1]}</p><p><strong>Con số thách thức 2:</strong> ${add.challenge2} - ${challengeMeanings[add.challenge2]}</p><p><strong>Con số thách thức 3:</strong> ${add.challenge3} - ${challengeMeanings[add.challenge3]}</p><p><strong>Con số thách thức 4:</strong> ${add.challenge4} - ${challengeMeanings[add.challenge4]}</p><p><strong>Con số đỉnh cao 1 (${pin.firstPinnacleAge}):</strong> ${pin.firstPinnacle} - ${meanings[pin.firstPinnacle]} <strong>Lời khuyên:</strong> ${pinnacleAdvice[pin.firstPinnacle]}</p><p><strong>Con số đỉnh cao 2 (${pin.secondPinnacleAge}):</strong> ${pin.secondPinnacle} - ${meanings[pin.secondPinnacle]} <strong>Lời khuyên:</strong> ${pinnacleAdvice[pin.secondPinnacle]}</p><p><strong>Con số đỉnh cao 3 (${pin.thirdPinnacleAge}):</strong> ${pin.thirdPinnacle} - ${meanings[pin.thirdPinnacle]} <strong>Lời khuyên:</strong> ${pinnacleAdvice[pin.thirdPinnacle]}</p><p><strong>Con số đỉnh cao 4 (${pin.fourthPinnacleAge}):</strong> ${pin.fourthPinnacle} - ${meanings[pin.fourthPinnacle]} <strong>Lời khuyên:</strong> ${pinnacleAdvice[pin.fourthPinnacle]}</p></div>`;
    
    document.getElementById('calculationDetails').innerHTML = `<div class="result-card"><h2>Cách Tính Chi Tiết</h2><p><strong>Con số chủ đạo:</strong> ${d}→${String(d).split('').join('+')} + ${m}→${String(m).split('').join('+')} + ${y}→${String(y).split('').join('+')} = ${sumDigits(d)+sumDigits(m)+sumDigits(y)} → ${lpn}</p><p><strong>Con số linh hồn:</strong> ${suSteps.join(', ')} = ${suSum} → ${sun}</p><p><strong>Con số nhân cách:</strong> ${pSteps.join(', ')} = ${pSum} → ${pn}</p><p><strong>Con số tương tác:</strong> Tổng tất cả chữ cái = ${add.expressionNumber}</p><p><strong>Con số ngày sinh:</strong> ${d} → ${add.birthDayNumber}</p><p><strong>Con số thách thức 1:</strong> |${d}-${m}| = ${add.challenge1}</p><p><strong>Con số thách thức 2:</strong> |${d}-${ys}| = ${add.challenge2}</p><p><strong>Con số thách thức 3:</strong> |${add.challenge1}-${add.challenge2}| = ${add.challenge3}</p><p><strong>Con số thách thức 4:</strong> |${m}-${ys}| = ${add.challenge4}</p><p><strong>Con số đỉnh cao 1:</strong> ${d}+${m} = ${d+m} → ${pin.firstPinnacle} (${pin.firstPinnacleAge})</p><p><strong>Con số đỉnh cao 2:</strong> ${d}+${ys} = ${d+ys} → ${pin.secondPinnacle} (${pin.secondPinnacleAge})</p><p><strong>Con số đỉnh cao 3:</strong> ${pin.firstPinnacle}+${pin.secondPinnacle} → ${pin.thirdPinnacle} (${pin.thirdPinnacleAge})</p><p><strong>Con số đỉnh cao 4:</strong> ${m}+${ys} = ${m+ys} → ${pin.fourthPinnacle} (${pin.fourthPinnacleAge})</p></div>`;
    
    document.getElementById('meanings').innerHTML = '<div class="result-card"><h2>Ý Nghĩa Các Con Số</h2><ul class="list-disc pl-5 space-y-2"><li><strong>Con số chủ đạo:</strong> Con đường sống và mục đích chính.</li><li><strong>Con số linh hồn:</strong> Mong muốn nội tâm và động lực sâu xa.</li><li><strong>Con số nhân cách:</strong> Cách thể hiện bản thân ra bên ngoài.</li><li><strong>Con số tương tác:</strong> Cách tương tác và thể hiện tài năng.</li><li><strong>Con số linh hồn ẩn:</strong> Đam mê tiềm ẩn hoặc phẩm chất nổi bật.</li><li><strong>Con số ngày sinh:</strong> Đặc điểm và năng lượng ngày sinh.</li><li><strong>Con số đỉnh cao:</strong> Giai đoạn quan trọng trong cuộc đời.</li><li><strong>Con số thách thức:</strong> Những thử thách cần vượt qua.</li></ul></div>';
    
    ['showMoreBtn','showCalcBtn','showMeaningsBtn'].forEach(id => document.getElementById(id).classList.remove('hidden'));
    ['details','calculationDetails','meanings'].forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove('details-shown');
      el.classList.add('details-hidden');
    });
    
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
    fDiv.innerHTML = '<p class="text-red-500 font-medium">Ngày sinh không hợp lệ!</p>';
    return;
  }
  
  saveData('dailyInputs', {d, m, y});
  
  document.getElementById('dailyCalculateBtn').disabled = true;
  document.getElementById('loadingOverlay').classList.add('active');
  
  setTimeout(() => {
    const f = calculateDailyNumber(d,m,y);
    const now = new Date();
    const cy = now.getFullYear(), cm = now.getMonth()+1, cd = now.getDate();
    const s = dailySuggestions[f.personalDay] || {do:"Hôm nay là một ngày bình thường, hãy làm những gì bạn cảm thấy phù hợp.",avoid:"Tránh hành động vội vàng."};
    
    fDiv.innerHTML = `<div class="result-card"><h2>Dự Báo Hàng Ngày - ${now.toLocaleDateString('vi-VN')}</h2><p><strong>Năm cá nhân:</strong> ${f.personalYear} - ${meanings[f.personalYear]}</p><p><strong>Tháng cá nhân:</strong> ${f.personalMonth} - ${meanings[f.personalMonth]}</p><p><strong>Ngày cá nhân:</strong> ${f.personalDay} - ${meanings[f.personalDay]}</p><h3 class="font-semibold mt-4">Gợi ý cho hôm nay:</h3><p>${s.do}</p><h3 class="font-semibold mt-4">Những việc nên tránh:</h3><p>${s.avoid}</p></div>`;
    
    document.getElementById('dailyCalculationDetails').innerHTML = `<div class="result-card"><h2>Cách Tính</h2><p><strong>Năm cá nhân:</strong> ${d}+${m}+${cy} → ${f.personalYear}</p><p><strong>Tháng cá nhân:</strong> ${f.personalYear}+${cm} → ${f.personalMonth}</p><p><strong>Ngày cá nhân:</strong> ${f.personalMonth}+${cd} → ${f.personalDay}</p></div>`;
    
    document.getElementById('dailyShowCalcBtn').classList.remove('hidden');
    document.getElementById('dailyCalculationDetails').classList.add('details-hidden');
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
    cDiv.innerHTML = '<p class="text-red-500 font-medium">Họ tên chỉ được chứa chữ cái và khoảng trắng!</p>';
    return;
  }
  if(!isValidDate(d1,m1,y1) || !isValidDate(d2,m2,y2)) {
    cDiv.innerHTML = '<p class="text-red-500 font-medium">Ngày sinh không hợp lệ!</p>';
    return;
  }
  
  saveData('compatInputs', {n1, d1, m1, y1, n2, d2, m2, y2});
  
  document.getElementById('compatCalculateBtn').disabled = true;
  document.getElementById('loadingOverlay').classList.add('active');
  
  setTimeout(() => {
    const c = calculateCompatibility(n1,d1,m1,y1,n2,d2,m2,y2);
    
    cDiv.innerHTML = `<div class="result-card"><h2>Kết Quả Độ Tương Hợp</h2><p><strong>Người thứ nhất:</strong> ${n1} (${d1}/${m1}/${y1})</p><p><strong>Con số chủ đạo:</strong> ${c.lifePathNumber1} - ${meanings[c.lifePathNumber1]}</p><p><strong>Con số tương tác:</strong> ${c.expressionNumber1} - ${meanings[c.expressionNumber1]}</p><p><strong>Người thứ hai:</strong> ${n2} (${d2}/${m2}/${y2})</p><p><strong>Con số chủ đạo:</strong> ${c.lifePathNumber2} - ${meanings[c.lifePathNumber2]}</p><p><strong>Con số tương tác:</strong> ${c.expressionNumber2} - ${meanings[c.expressionNumber2]}</p><h3 class="font-semibold mt-4">Mức độ tương hợp:</h3><p><strong>${c.overallCompat}%</strong> - ${c.description}</p></div>`;
    
    document.getElementById('compatCalculationDetails').innerHTML = `<div class="result-card"><h2>Cách Tính</h2><p><strong>Con số chủ đạo 1:</strong> ${d1}+${m1}+${y1} → ${c.lifePathNumber1}</p><p><strong>Con số tương tác 1:</strong> Tổng chữ cái "${n1}" → ${c.expressionNumber1}</p><p><strong>Con số chủ đạo 2:</strong> ${d2}+${m2}+${y2} → ${c.lifePathNumber2}</p><p><strong>Con số tương tác 2:</strong> Tổng chữ cái "${n2}" → ${c.expressionNumber2}</p><p><strong>Độ tương hợp:</strong> (${c.lifePathCompat}+${c.expressionCompat})/2 = ${c.overallCompat}%</p></div>`;
    
    document.getElementById('compatShowCalcBtn').classList.remove('hidden');
    document.getElementById('compatCalculationDetails').classList.add('details-hidden');
    document.getElementById('compatCalculateBtn').disabled = false;
    document.getElementById('loadingOverlay').classList.remove('active');
  }, 500);
}

// Event handlers
document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  
  // Load saved data
  const mainData = loadData('mainInputs');
  if(mainData) {
    document.getElementById('fullName').value = mainData.name || '';
    document.getElementById('day').value = mainData.d || '';
    document.getElementById('month').value = mainData.m || '';
    document.getElementById('year').value = mainData.y || '';
  }
  
  const dailyData = loadData('dailyInputs');
  if(dailyData) {
    document.getElementById('dailyDay').value = dailyData.d || '';
    document.getElementById('dailyMonth').value = dailyData.m || '';
    document.getElementById('dailyYear').value = dailyData.y || '';
  }
  
  const compatData = loadData('compatInputs');
  if(compatData) {
    document.getElementById('compatName1').value = compatData.n1 || '';
    document.getElementById('compatDay1').value = compatData.d1 || '';
    document.getElementById('compatMonth1').value = compatData.m1 || '';
    document.getElementById('compatYear1').value = compatData.y1 || '';
    document.getElementById('compatName2').value = compatData.n2 || '';
    document.getElementById('compatDay2').value = compatData.d2 || '';
    document.getElementById('compatMonth2').value = compatData.m2 || '';
    document.getElementById('compatYear2').value = compatData.y2 || '';
  }
  
  if(localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('themeIcon').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
  }
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  document.getElementById('themeIcon').innerHTML = isDark ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
  localStorage.theme = isDark ? 'dark' : 'light';
});

const menu = document.getElementById('menuDropdown');
document.getElementById('menuToggle').addEventListener('click', () => menu.classList.toggle('active'));
document.addEventListener('click', e => {
  if(!e.target.closest('#menuToggle') && !e.target.closest('#menuDropdown')) menu.classList.remove('active');
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(`${btn.dataset.tab}Tab`).classList.add('active');
    menu.classList.remove('active');
  });
});

document.getElementById('showMoreBtn').addEventListener('click', () => toggleDetails(document.getElementById('details'), document.getElementById('showMoreBtn'), 'Ẩn Chi Tiết', 'Xem Thêm'));
document.getElementById('showCalcBtn').addEventListener('click', () => toggleDetails(document.getElementById('calculationDetails'), document.getElementById('showCalcBtn'), 'Ẩn Cách Tính', 'Xem Cách Tính'));
document.getElementById('showMeaningsBtn').addEventListener('click', () => toggleDetails(document.getElementById('meanings'), document.getElementById('showMeaningsBtn'), 'Ẩn Ý Nghĩa', 'Xem Ý Nghĩa Các Con Số'));
document.getElementById('dailyShowCalcBtn').addEventListener('click', () => toggleDetails(document.getElementById('dailyCalculationDetails'), document.getElementById('dailyShowCalcBtn'), 'Ẩn Cách Tính', 'Xem Cách Tính'));
document.getElementById('compatShowCalcBtn').addEventListener('click', () => toggleDetails(document.getElementById('compatCalculationDetails'), document.getElementById('compatShowCalcBtn'), 'Ẩn Cách Tính', 'Xem Cách Tính'));

const clearFields = (ids, ...resultIds) => {
  ids.forEach(id => document.getElementById(id).value = '');
  resultIds.forEach(id => {
    const el = document.getElementById(id);
    if(el.classList) el.classList.add('hidden');
    else el.innerHTML = '';
  });
};

document.getElementById('clearBtn').addEventListener('click', () => clearFields(['fullName','day','month','year'], 'summary','details','calculationDetails','meanings','showMoreBtn','showCalcBtn','showMeaningsBtn'));
document.getElementById('dailyClearBtn').addEventListener('click', () => clearFields(['dailyDay','dailyMonth','dailyYear'], 'dailyForecast','dailyCalculationDetails','dailyShowCalcBtn'));
document.getElementById('compatClearBtn').addEventListener('click', () => clearFields(['compatName1','compatDay1','compatMonth1','compatYear1','compatName2','compatDay2','compatMonth2','compatYear2'], 'compatForecast','compatCalculationDetails','compatShowCalcBtn'));

const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

document.getElementById('calculateBtn').addEventListener('click', debounce(calculateNumerology, 500));
document.getElementById('dailyCalculateBtn').addEventListener('click', debounce(calculateDailyForecast, 500));
document.getElementById('compatCalculateBtn').addEventListener('click', debounce(calculateCompatibilityForecast, 500));
['mainTab','dailyTab','compatTab'].forEach((id,i) => {
  document.getElementById(id).addEventListener('keydown', e => {
    if(e.key === 'Enter') [calculateNumerology, calculateDailyForecast, calculateCompatibilityForecast][i]();
  });
});
