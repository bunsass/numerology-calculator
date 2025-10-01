const CURRENT_YEAR = new Date().getFullYear();

// Function to remove diacritical marks from Vietnamese text
function normalizeName(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

// Populate day and month dropdowns
function populateDropdowns() {
  const daySelects = [document.getElementById('day'), document.getElementById('dailyDay'), document.getElementById('compatDay1'), document.getElementById('compatDay2')];
  const monthSelects = [document.getElementById('month'), document.getElementById('dailyMonth'), document.getElementById('compatMonth1'), document.getElementById('compatMonth2')];
  daySelects.forEach(daySelect => {
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      daySelect.appendChild(option);
    }
  });
  monthSelects.forEach(monthSelect => {
    for (let i = 1; i <= 12; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      monthSelect.appendChild(option);
    }
  });
}

// Restrict year input to 4 digits
[document.getElementById('year'), document.getElementById('dailyYear'), document.getElementById('compatYear1'), document.getElementById('compatYear2')].forEach(yearInput => {
  yearInput.addEventListener('input', function(e) {
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.slice(0, 4);
    }
  });
});

// Normalize input as user types
[document.getElementById('fullName'), document.getElementById('compatName1'), document.getElementById('compatName2')].forEach(nameInput => {
  nameInput.addEventListener('input', function(e) {
    const normalizedValue = normalizeName(e.target.value);
    e.target.value = normalizedValue;
  });
});

function reduceToSingleDigit(number, allowMaster = false) {
  if (allowMaster && (number === 11 || number === 22 || number === 33)) return number;
  while (number > 9) number = String(number).split('').reduce((sum, digit) => sum + Number(digit), 0);
  return number;
}

function getLetterValue(letter) {
  const values = {'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,'g':7,'h':8,'i':9,'j':1,'k':2,'l':3,'m':4,'n':5,'o':6,'p':7,'q':8,'r':9,'s':1,'t':2,'u':3,'v':4,'w':5,'x':6,'y':7,'z':8};
  return values[letter.toLowerCase()] || 0;
}

function isVowel(letter, prevLetter, nextLetter) {
  letter = letter.toLowerCase();
  if (['a','e','i','o','u'].includes(letter)) return true;
  if (letter === 'y') return !prevLetter || !nextLetter || !['a','e','i','o','u'].includes(prevLetter.toLowerCase()) && !['a','e','i','o','u'].includes(nextLetter?.toLowerCase());
  return false;
}

function getNumberMeaning(number) {
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
  return meanings[number] || "Không xác định";
}

function getChallengeMeaning(number) {
  const meanings = {
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
  return meanings[number] || "Không xác định";
}

function getPinnacleAdvice(number) {
  const advice = {
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
  return advice[number] || "Tận dụng giai đoạn này để phát triển bản thân theo hướng tích cực.";
}

function getDailySuggestions(number) {
  const suggestions = {
    1: {
      do: "Hôm nay là ngày để tỏa sáng và dẫn đầu! Hãy bắt đầu một dự án mới, đưa ra ý tưởng táo bạo hoặc thử sức với một thử thách cá nhân. Tự tin thể hiện bản thân và nắm bắt cơ hội.",
      avoid: "Tránh né tránh trách nhiệm hoặc phụ thuộc vào người khác để đưa ra quyết định. Đừng để sự thiếu kiên nhẫn làm hỏng cơ hội."
    },
    2: {
      do: "Tập trung vào các mối quan hệ và sự hợp tác. Đây là ngày lý tưởng để trò chuyện, hòa giải hoặc hỗ trợ bạn bè, gia đình. Hãy lắng nghe và kết nối cảm xúc.",
      avoid: "Tránh né tránh xung đột hoặc giữ im lặng khi cần bày tỏ ý kiến. Đừng để sự nhạy cảm quá mức làm bạn mất cân bằng."
    },
    3: {
      do: "Năng lượng sáng tạo đang dâng cao! Viết lách, vẽ tranh, hoặc tham gia hoạt động nghệ thuật. Giao tiếp vui vẻ và lan tỏa năng lượng tích cực đến mọi người.",
      avoid: "Tránh phân tán năng lượng vào quá nhiều việc hoặc thiếu tập trung. Đừng để những lời nói bộc phát gây hiểu lầm."
    },
    4: {
      do: "Hôm nay phù hợp để tổ chức, lập kế hoạch hoặc hoàn thành công việc. Xây dựng nền tảng vững chắc cho mục tiêu dài hạn và giữ kỷ luật trong công việc.",
      avoid: "Tránh cứng nhắc hoặc từ chối thay đổi. Đừng làm việc quá sức mà quên chăm sóc bản thân."
    },
    5: {
      do: "Khám phá và thay đổi! Hãy thử một hoạt động mới, đi đâu đó hoặc gặp gỡ người mới. Linh hoạt và cởi mở với những cơ hội bất ngờ.",
      avoid: "Tránh hành động bốc đồng hoặc bỏ qua trách nhiệm. Đừng để sự thiếu cam kết ảnh hưởng đến các mối quan hệ."
    },
    6: {
      do: "Dành thời gian cho gia đình, bạn bè hoặc cộng đồng. Hôm nay là ngày để chăm sóc, yêu thương và tạo ra sự hài hòa trong các mối quan hệ.",
      avoid: "Tránh ôm đồm quá nhiều trách nhiệm hoặc quên chăm sóc bản thân. Đừng để sự cầu toàn làm bạn căng thẳng."
    },
    7: {
      do: "Tìm kiếm sự tĩnh lặng và suy ngẫm. Thiền, đọc sách hoặc nghiên cứu một chủ đề bạn yêu thích. Kết nối với nội tâm sẽ mang lại sự rõ ràng.",
      avoid: "Tránh cô lập bản thân quá lâu hoặc nghi ngờ mọi thứ. Đừng từ chối sự hỗ trợ từ người khác."
    },
    8: {
      do: "Tập trung vào tài chính và mục tiêu sự nghiệp. Hôm nay là ngày tốt để lập kế hoạch kinh doanh, đàm phán hoặc đầu tư. Hãy giữ sự tự tin.",
      avoid: "Tránh tham lam hoặc chỉ tập trung vào vật chất. Đừng bỏ qua các mối quan hệ cá nhân vì công việc."
    },
    9: {
      do: "Lan tỏa lòng nhân ái và giúp đỡ người khác. Tham gia hoạt động từ thiện hoặc hỗ trợ ai đó đang cần. Hôm nay là ngày để sống vì mục đích cao cả.",
      avoid: "Tránh giữ lấy những cảm xúc tiêu cực hoặc quá khứ. Đừng để sự nhạy cảm làm bạn kiệt sức."
    },
    11: {
      do: "Lắng nghe trực giác của bạn. Đây là ngày để thiền định, tìm kiếm ý nghĩa tâm linh hoặc truyền cảm hứng cho người khác. Hãy tin vào linh cảm của mình.",
      avoid: "Tránh để sự nhạy cảm quá mức dẫn đến lo lắng. Đừng bỏ qua các chi tiết thực tế trong công việc."
    },
    22: {
      do: "Tập trung vào các dự án lớn và xây dựng tương lai. Lập kế hoạch chi tiết và làm việc hướng tới mục tiêu lâu dài. Hôm nay là ngày để biến ước mơ thành hiện thực.",
      avoid: "Tránh để áp lực làm bạn kiệt sức. Đừng bỏ qua các chi tiết nhỏ hoặc làm việc mà không có kế hoạch."
    },
    33: {
      do: "Hãy hướng dẫn và truyền cảm hứng cho người khác. Dành thời gian để chia sẻ kiến thức hoặc hỗ trợ ai đó. Hôm nay là ngày để thể hiện lòng từ bi.",
      avoid: "Tránh hy sinh quá mức mà quên chăm sóc bản thân. Đừng để cảm xúc chi phối các quyết định quan trọng."
    }
  };
  return suggestions[number] || { do: "Hôm nay là một ngày bình thường, hãy làm những gì bạn cảm thấy phù hợp.", avoid: "Tránh hành động vội vàng hoặc thiếu cân nhắc." };
}

function calculatePinnacleNumbers(day, month, year, lifePathNumber) {
  const firstPinnacle = reduceToSingleDigit(day + month, true);
  const yearSum = String(year).split('').reduce((sum, digit) => sum + Number(digit), 0);
  const secondPinnacle = reduceToSingleDigit(day + yearSum, true);
  const thirdPinnacle = reduceToSingleDigit(firstPinnacle + secondPinnacle, true);
  const fourthPinnacle = reduceToSingleDigit(month + yearSum, true);
  const firstPinnacleAgeStart = 36 - lifePathNumber;
  const secondPinnacleAgeStart = firstPinnacleAgeStart + 9;
  const thirdPinnacleAgeStart = secondPinnacleAgeStart + 9;
  const fourthPinnacleAgeStart = thirdPinnacleAgeStart + 9;
  return {
    firstPinnacle,
    secondPinnacle,
    thirdPinnacle,
    fourthPinnacle,
    firstPinnacleAge: `${firstPinnacleAgeStart} - ${secondPinnacleAgeStart - 1}`,
    secondPinnacleAge: `${secondPinnacleAgeStart} - ${thirdPinnacleAgeStart - 1}`,
    thirdPinnacleAge: `${thirdPinnacleAgeStart} - ${fourthPinnacleAgeStart - 1}`,
    fourthPinnacleAge: `${fourthPinnacleAgeStart} trở đi`
  };
}

function calculateAdditionalNumbers(fullName, day, month, year, lifePathNumber) {
  let expressionSum = 0, hiddenPassion = {}, challenge1 = 0, challenge2 = 0, challenge3 = 0, challenge4 = 0;
  const letters = fullName.split('');
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    if (/[a-z]/.test(letter)) {
      const value = getLetterValue(letter);
      expressionSum += value;
      hiddenPassion[value] = (hiddenPassion[value] || 0) + 1;
    }
  }
  const expressionNumber = reduceToSingleDigit(expressionSum, true);
  const hiddenPassionNumber = Object.keys(hiddenPassion).reduce((a, b) => hiddenPassion[a] > hiddenPassion[b] ? a : b, 0);
  const birthDayNumber = reduceToSingleDigit(day);
  challenge1 = reduceToSingleDigit(Math.abs(day - month));
  challenge2 = reduceToSingleDigit(Math.abs(day - reduceToSingleDigit(year)));
  challenge3 = reduceToSingleDigit(Math.abs(challenge1 - challenge2));
  challenge4 = reduceToSingleDigit(Math.abs(month - reduceToSingleDigit(year)));
  return { expressionNumber, hiddenPassionNumber, birthDayNumber, challenge1, challenge2, challenge3, challenge4 };
}

function calculateDailyNumber(day, month, year) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  const personalYear = reduceToSingleDigit(day + month + currentYear, true);
  const personalMonth = reduceToSingleDigit(personalYear + currentMonth);
  const personalDay = reduceToSingleDigit(personalMonth + currentDay);
  return { personalYear, personalMonth, personalDay };
}

function calculateCompatibility(name1, day1, month1, year1, name2, day2, month2, year2) {
  const dateSum1 = String(day1).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(month1).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(year1).split('').reduce((sum, digit) => sum + Number(digit), 0);
  const lifePathNumber1 = reduceToSingleDigit(dateSum1, true);
  let expressionSum1 = 0;
  const letters1 = name1.split('');
  for (let i = 0; i < letters1.length; i++) {
    const letter = letters1[i];
    if (/[a-z]/.test(letter)) {
      expressionSum1 += getLetterValue(letter);
    }
  }
  const expressionNumber1 = reduceToSingleDigit(expressionSum1, true);

  const dateSum2 = String(day2).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(month2).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(year2).split('').reduce((sum, digit) => sum + Number(digit), 0);
  const lifePathNumber2 = reduceToSingleDigit(dateSum2, true);
  let expressionSum2 = 0;
  const letters2 = name2.split('');
  for (let i = 0; i < letters2.length; i++) {
    const letter = letters2[i];
    if (/[a-z]/.test(letter)) {
      expressionSum2 += getLetterValue(letter);
    }
  }
  const expressionNumber2 = reduceToSingleDigit(expressionSum2, true);

  const compatibilityMatrix = {
    1: { 1: 90, 2: 70, 3: 80, 4: 60, 5: 75, 6: 65, 7: 70, 8: 85, 9: 80, 11: 90, 22: 70, 33: 80 },
    2: { 1: 70, 2: 95, 3: 65, 4: 85, 5: 60, 6: 90, 7: 80, 8: 65, 9: 75, 11: 70, 22: 85, 33: 90 },
    3: { 1: 80, 2: 65, 3: 90, 4: 60, 5: 85, 6: 75, 7: 70, 8: 65, 9: 90, 11: 80, 22: 60, 33: 85 },
    4: { 1: 60, 2: 85, 3: 60, 4: 90, 5: 65, 6: 80, 7: 75, 8: 85, 9: 70, 11: 60, 22: 90, 33: 80 },
    5: { 1: 75, 2: 60, 3: 85, 4: 65, 5: 90, 6: 70, 7: 80, 8: 65, 9: 85, 11: 75, 22: 65, 33: 70 },
    6: { 1: 65, 2: 90, 3: 75, 4: 80, 5: 70, 6: 95, 7: 65, 8: 75, 9: 85, 11: 70, 22: 80, 33: 90 },
    7: { 1: 70, 2: 80, 3: 70, 4: 75, 5: 80, 6: 65, 7: 90, 8: 60, 9: 75, 11: 85, 22: 70, 33: 80 },
    8: { 1: 85, 2: 65, 3: 65, 4: 85, 5: 65, 6: 75, 7: 60, 8: 90, 9: 70, 11: 65, 22: 85, 33: 75 },
    9: { 1: 80, 2: 75, 3: 90, 4: 70, 5: 85, 6: 85, 7: 75, 8: 70, 9: 95, 11: 80, 22: 70, 33: 90 },
    11: { 1: 90, 2: 70, 3: 80, 4: 60, 5: 75, 6: 70, 7: 85, 8: 65, 9: 80, 11: 95, 22: 70, 33: 90 },
    22: { 1: 70, 2: 85, 3: 60, 4: 90, 5: 65, 6: 80, 7: 70, 8: 85, 9: 70, 11: 70, 22: 95, 33: 80 },
    33: { 1: 80, 2: 90, 3: 85, 4: 80, 5: 70, 6: 90, 7: 80, 8: 75, 9: 90, 11: 90, 22: 80, 33: 95 }
  };

  const lifePathCompat = compatibilityMatrix[lifePathNumber1][lifePathNumber2];
  const expressionCompat = compatibilityMatrix[expressionNumber1][expressionNumber2];
  const overallCompat = Math.round((lifePathCompat + expressionCompat) / 2);

  let description = '';
  if (overallCompat >= 90) {
    description = "Mức độ tương hợp tuyệt vời! Hai bạn có sự kết nối mạnh mẽ về cả tinh thần và tính cách, dễ dàng hỗ trợ và thấu hiểu nhau.";
  } else if (overallCompat >= 80) {
    description = "Mức độ tương hợp cao! Hai bạn có nhiều điểm chung, nhưng cần chú ý giao tiếp để duy trì sự hài hòa.";
  } else if (overallCompat >= 70) {
    description = "Mức độ tương hợp tốt. Mối quan hệ có tiềm năng, nhưng cần nỗ lực để vượt qua một số khác biệt.";
  } else if (overallCompat >= 60) {
    description = "Mức độ tương hợp trung bình. Hai bạn có thể gặp một số thách thức, cần kiên nhẫn và thấu hiểu.";
  } else {
    description = "Mức độ tương hợp thấp. Hai bạn cần làm việc nhiều để hiểu và hòa hợp với nhau.";
  }

  return {
    lifePathNumber1,
    expressionNumber1,
    lifePathNumber2,
    expressionNumber2,
    overallCompat,
    description
  };
}

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year && year >= 1900 && year <= CURRENT_YEAR;
}

function saveInputs(fullName, day, month, year) {
  localStorage.setItem('numerologyInputs', JSON.stringify({ fullName, day, month, year }));
}

function saveCompatInputs(name1, day1, month1, year1, name2, day2, month2, year2) {
  localStorage.setItem('compatInputs', JSON.stringify({ name1, day1, month1, year1, name2, day2, month2, year2 }));
}

function loadInputs() {
  const inputs = JSON.parse(localStorage.getItem('numerologyInputs'));
  if (inputs) {
    document.getElementById('fullName').value = inputs.fullName || '';
    document.getElementById('day').value = inputs.day || '';
    document.getElementById('month').value = inputs.month || '';
    document.getElementById('year').value = inputs.year || '';
    document.getElementById('dailyDay').value = inputs.day || '';
    document.getElementById('dailyMonth').value = inputs.month || '';
    document.getElementById('dailyYear').value = inputs.year || '';
  }
  const compatInputs = JSON.parse(localStorage.getItem('compatInputs'));
  if (compatInputs) {
    document.getElementById('compatName1').value = compatInputs.name1 || '';
    document.getElementById('compatDay1').value = compatInputs.day1 || '';
    document.getElementById('compatMonth1').value = compatInputs.month1 || '';
    document.getElementById('compatYear1').value = compatInputs.year1 || '';
    document.getElementById('compatName2').value = compatInputs.name2 || '';
    document.getElementById('compatDay2').value = compatInputs.day2 || '';
    document.getElementById('compatMonth2').value = compatInputs.month2 || '';
    document.getElementById('compatYear2').value = compatInputs.year2 || '';
  }
}

function showLoading() {
  document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('active');
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function calculateNumerology() {
  const fullName = document.getElementById('fullName').value.trim();
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
  const summaryDiv = document.getElementById('summary');
  const detailsDiv = document.getElementById('details');
  const calculationDetailsDiv = document.getElementById('calculationDetails');
  const meaningsDiv = document.getElementById('meanings');
  const calculateBtn = document.getElementById('calculateBtn');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const showCalcBtn = document.getElementById('showCalcBtn');
  const showMeaningsBtn = document.getElementById('showMeaningsBtn');

  if (!fullName || !/^[a-z\s]*$/.test(fullName)) {
    summaryDiv.innerHTML = '<p class="text-red-500 font-medium">Họ tên chỉ được chứa chữ cái và khoảng trắng!</p>';
    hideLoading();
    return;
  }
  if (!isValidDate(day, month, year)) {
    summaryDiv.innerHTML = '<p class="text-red-500 font-medium">Ngày sinh không hợp lệ!</p>';
    hideLoading();
    return;
  }

  calculateBtn.disabled = true;
  showLoading();
  setTimeout(() => {
    // Calculate Life Path Number
    const dateSum = String(day).split('').reduce((sum, digit) => sum + Number(digit), 0) + 
                    String(month).split('').reduce((sum, digit) => sum + Number(digit), 0) + 
                    String(year).split('').reduce((sum, digit) => sum + Number(digit), 0);
    const lifePathNumber = reduceToSingleDigit(dateSum, true);
    
    // Calculate Soul Urge and Personality Numbers
    let soulUrgeSum = 0, personalitySum = 0;
    const soulUrgeSteps = [];
    const personalitySteps = [];
    const letters = fullName.split('');
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      if (/[a-z]/.test(letter)) {
        const prevLetter = i > 0 ? letters[i - 1] : null;
        const nextLetter = i < letters.length - 1 ? letters[i + 1] : null;
        const value = getLetterValue(letter);
        if (isVowel(letter, prevLetter, nextLetter)) {
          soulUrgeSum += value;
          soulUrgeSteps.push(`${letter.toUpperCase()} = ${value}`);
        } else {
          personalitySum += value;
          personalitySteps.push(`${letter.toUpperCase()} = ${value}`);
        }
      }
    }
    const soulUrgeNumber = reduceToSingleDigit(soulUrgeSum, true);
    const personalityNumber = reduceToSingleDigit(personalitySum, true);
    
    // Calculate additional numbers
    const additionalNumbers = calculateAdditionalNumbers(fullName, day, month, year, lifePathNumber);
    const pinnacleNumbers = calculatePinnacleNumbers(day, month, year, lifePathNumber);
    
    // Calculate steps for additional numbers
    const expressionSteps = [];
    let expressionSum = 0;
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      if (/[a-z]/.test(letter)) {
        const value = getLetterValue(letter);
        expressionSum += value;
        expressionSteps.push(`${letter.toUpperCase()} = ${value}`);
      }
    }
    const hiddenPassion = {};
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      if (/[a-z]/.test(letter)) {
        const value = getLetterValue(letter);
        hiddenPassion[value] = (hiddenPassion[value] || 0) + 1;
      }
    }
    const hiddenPassionSteps = Object.entries(hiddenPassion).map(([num, count]) => `Số ${num}: ${count} lần`);
    const yearSum = String(year).split('').reduce((sum, digit) => sum + Number(digit), 0);
    
    // Update summary
    summaryDiv.innerHTML = `
      <h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Kết Quả Tổng Quan</h2>
      <p><strong>Họ và tên:</strong> ${fullName}</p>
      <p><strong>Ngày sinh:</strong> ${day}/${month}/${year}</p>
      <p><strong>Con số chủ đạo (Số đường đời):</strong> ${lifePathNumber}</p>
      <p><strong>Con số linh hồn:</strong> ${soulUrgeNumber}</p>
      <p><strong>Con số nhân cách:</strong> ${personalityNumber}</p>
      <p><strong>Con số tương tác:</strong> ${additionalNumbers.expressionNumber}</p>
      <p><strong>Con số linh hồn ẩn:</strong> ${additionalNumbers.hiddenPassionNumber}</p>
      <p><strong>Con số ngày sinh:</strong> ${additionalNumbers.birthDayNumber}</p>
      <p><strong>Con số thách thức đỉnh cao 1:</strong> ${additionalNumbers.challenge1}</p>
      <p><strong>Con số thách thức đỉnh cao 2:</strong> ${additionalNumbers.challenge2}</p>
      <p><strong>Con số thách thức đỉnh cao 3:</strong> ${additionalNumbers.challenge3}</p>
      <p><strong>Con số thách thức đỉnh cao 4:</strong> ${additionalNumbers.challenge4}</p>
      <p><strong>Con số đỉnh cao 1 (Tuổi ${pinnacleNumbers.firstPinnacleAge}):</strong> ${pinnacleNumbers.firstPinnacle}</p>
      <p><strong>Con số đỉnh cao 2 (Tuổi ${pinnacleNumbers.secondPinnacleAge}):</strong> ${pinnacleNumbers.secondPinnacle}</p>
      <p><strong>Con số đỉnh cao 3 (Tuổi ${pinnacleNumbers.thirdPinnacleAge}):</strong> ${pinnacleNumbers.thirdPinnacle}</p>
      <p><strong>Con số đỉnh cao 4 (Tuổi ${pinnacleNumbers.fourthPinnacleAge}):</strong> ${pinnacleNumbers.fourthPinnacle}</p>
    `;

    // Update details
    detailsDiv.innerHTML = `
      <h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Chi Tiết Thần Số Học</h2>
      <p><strong>Con số chủ đạo (Số đường đời):</strong> ${lifePathNumber} - ${getNumberMeaning(lifePathNumber)}</p>
      <p><strong>Con số linh hồn:</strong> ${soulUrgeNumber} - ${getNumberMeaning(soulUrgeNumber)}</p>
      <p><strong>Con số nhân cách:</strong> ${personalityNumber} - ${getNumberMeaning(personalityNumber)}</p>
      <p><strong>Con số tương tác (Số biểu đạt):</strong> ${additionalNumbers.expressionNumber} - ${getNumberMeaning(additionalNumbers.expressionNumber)}</p>
      <p><strong>Con số linh hồn ẩn (Số đam mê ẩn):</strong> ${additionalNumbers.hiddenPassionNumber} - ${getNumberMeaning(additionalNumbers.hiddenPassionNumber)}</p>
      <p><strong>Con số ngày sinh:</strong> ${additionalNumbers.birthDayNumber} - ${getNumberMeaning(additionalNumbers.birthDayNumber)}</p>
      <p><strong>Con số thách thức đỉnh cao 1:</strong> ${additionalNumbers.challenge1} - ${getChallengeMeaning(additionalNumbers.challenge1)}</p>
      <p><strong>Con số thách thức đỉnh cao 2:</strong> ${additionalNumbers.challenge2} - ${getChallengeMeaning(additionalNumbers.challenge2)}</p>
      <p><strong>Con số thách thức đỉnh cao 3:</strong> ${additionalNumbers.challenge3} - ${getChallengeMeaning(additionalNumbers.challenge3)}</p>
      <p><strong>Con số thách thức đỉnh cao 4:</strong> ${additionalNumbers.challenge4} - ${getChallengeMeaning(additionalNumbers.challenge4)}</p>
      <p><strong>Con số đỉnh cao 1 (Tuổi ${pinnacleNumbers.firstPinnacleAge}):</strong> ${pinnacleNumbers.firstPinnacle} - ${getNumberMeaning(pinnacleNumbers.firstPinnacle)} <strong>Lời khuyên:</strong> ${getPinnacleAdvice(pinnacleNumbers.firstPinnacle)}</p>
      <p><strong>Con số đỉnh cao 2 (Tuổi ${pinnacleNumbers.secondPinnacleAge}):</strong> ${pinnacleNumbers.secondPinnacle} - ${getNumberMeaning(pinnacleNumbers.secondPinnacle)} <strong>Lời khuyên:</strong> ${getPinnacleAdvice(pinnacleNumbers.secondPinnacle)}</p>
      <p><strong>Con số đỉnh cao 3 (Tuổi ${pinnacleNumbers.thirdPinnacleAge}):</strong> ${pinnacleNumbers.thirdPinnacle} - ${getNumberMeaning(pinnacleNumbers.thirdPinnacle)} <strong>Lời khuyên:</strong> ${getPinnacleAdvice(pinnacleNumbers.thirdPinnacle)}</p>
      <p><strong>Con số đỉnh cao 4 (Tuổi ${pinnacleNumbers.fourthPinnacleAge}):</strong> ${pinnacleNumbers.fourthPinnacle} - ${getNumberMeaning(pinnacleNumbers.fourthPinnacle)} <strong>Lời khuyên:</strong> ${getPinnacleAdvice(pinnacleNumbers.fourthPinnacle)}</p>
    `;

    // Update calculation details with detailed steps
    const calcDetails = `
      <h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Cách Tính Chi Tiết</h2>
      <p><strong>Con số chủ đạo (Số đường đời):</strong> Cộng tất cả các chữ số trong ngày sinh (${day} → ${String(day).split('').join('+')}), tháng sinh (${month} → ${String(month).split('').join('+')}), và năm sinh (${year} → ${String(year).split('').join('+')}) = ${dateSum}. Rút gọn ${dateSum} về một chữ số (giữ nguyên 11, 22, 33 nếu có) = ${lifePathNumber}.</p>
      <p><strong>Con số linh hồn:</strong> Tổng giá trị các nguyên âm trong họ tên "${fullName}" (${soulUrgeSteps.join(', ')}) = ${soulUrgeSum}. Rút gọn ${soulUrgeSum} về một chữ số (giữ nguyên 11, 22, 33 nếu có) = ${soulUrgeNumber}.</p>
      <p><strong>Con số nhân cách:</strong> Tổng giá trị các phụ âm trong họ tên "${fullName}" (${personalitySteps.join(', ')}) = ${personalitySum}. Rút gọn ${personalitySum} về một chữ số (giữ nguyên 11, 22, 33 nếu có) = ${personalityNumber}.</p>
      <p><strong>Con số tương tác (Số biểu đạt):</strong> Tổng giá trị tất cả chữ cái trong họ tên "${fullName}" (${expressionSteps.join(', ')}) = ${expressionSum}. Rút gọn ${expressionSum} về một chữ số (giữ nguyên 11, 22, 33 nếu có) = ${additionalNumbers.expressionNumber}.</p>
      <p><strong>Con số linh hồn ẩn (Số đam mê ẩn):</strong> Đếm số lần xuất hiện của các giá trị chữ cái (${hiddenPassionSteps.join(', ')}). Giá trị xuất hiện nhiều nhất = ${additionalNumbers.hiddenPassionNumber}.</p>
      <p><strong>Con số ngày sinh:</strong> Rút gọn ngày sinh ${day} về một chữ số = ${additionalNumbers.birthDayNumber}.</p>
      <p><strong>Con số thách thức đỉnh cao 1:</strong> Chênh lệch giữa ngày sinh (${day}) và tháng sinh (${month}) = |${day} - ${month}| = ${Math.abs(day - month)}. Rút gọn về một chữ số = ${additionalNumbers.challenge1}.</p>
      <p><strong>Con số thách thức đỉnh cao 2:</strong> Chênh lệch giữa ngày sinh (${day}) và tổng các chữ số của năm sinh (${year} → ${yearSum}) = |${day} - ${yearSum}| = ${Math.abs(day - yearSum)}. Rút gọn về một chữ số = ${additionalNumbers.challenge2}.</p>
      <p><strong>Con số thách thức đỉnh cao 3:</strong> Chênh lệch giữa con số thách thức 1 (${additionalNumbers.challenge1}) và con số thách thức 2 (${additionalNumbers.challenge2}) = |${additionalNumbers.challenge1} - ${additionalNumbers.challenge2}| = ${Math.abs(additionalNumbers.challenge1 - additionalNumbers.challenge2)}. Rút gọn về một chữ số = ${additionalNumbers.challenge3}.</p>
      <p><strong>Con số thách thức đỉnh cao 4:</strong> Chênh lệch giữa tháng sinh (${month}) và tổng các chữ số của năm sinh (${year} → ${yearSum}) = |${month} - ${yearSum}| = ${Math.abs(month - yearSum)}. Rút gọn về một chữ số = ${additionalNumbers.challenge4}.</p>
      <p><strong>Con số đỉnh cao 1:</strong> Cộng ngày sinh (${day}) và tháng sinh (${month}) = ${day + month}. Rút gọn (giữ nguyên 11, 22, 33 nếu có) = ${pinnacleNumbers.firstPinnacle}. Bắt đầu từ tuổi ${pinnacleNumbers.firstPinnacleAge}.</p>
      <p><strong>Con số đỉnh cao 2:</strong> Cộng ngày sinh (${day}) và tổng các chữ số của năm sinh (${yearSum}) = ${day + yearSum}. Rút gọn = ${pinnacleNumbers.secondPinnacle}. Bắt đầu từ tuổi ${pinnacleNumbers.secondPinnacleAge}.</p>
      <p><strong>Con số đỉnh cao 3:</strong> Cộng con số đỉnh cao 1 (${pinnacleNumbers.firstPinnacle}) và con số đỉnh cao 2 (${pinnacleNumbers.secondPinnacle}) = ${pinnacleNumbers.firstPinnacle + pinnacleNumbers.secondPinnacle}. Rút gọn = ${pinnacleNumbers.thirdPinnacle}. Bắt đầu từ tuổi ${pinnacleNumbers.thirdPinnacleAge}.</p>
      <p><strong>Con số đỉnh cao 4:</strong> Cộng tháng sinh (${month}) và tổng các chữ số của năm sinh (${yearSum}) = ${month + yearSum}. Rút gọn = ${pinnacleNumbers.fourthPinnacle}. Bắt đầu từ tuổi ${pinnacleNumbers.fourthPinnacleAge}.</p>
    `;
    calculationDetailsDiv.innerHTML = calcDetails;

    let meaningsHTML = '<h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Ý Nghĩa Các Con Số Trong Kết Quả</h2>';
    meaningsHTML += '<p class="mb-2">Dưới đây là định nghĩa ngắn gọn về ý nghĩa của các con số được tính toán.</p>';
    meaningsHTML += '<ul class="list-disc pl-5 space-y-2">';
    meaningsHTML += `<li><strong>Con số chủ đạo (Số đường đời):</strong> Biểu thị con đường sống và mục đích chính trong cuộc đời của bạn.</li>`;
    meaningsHTML += `<li><strong>Con số linh hồn:</strong> Thể hiện mong muốn nội tâm và động lực sâu xa bên trong bạn.</li>`;
    meaningsHTML += `<li><strong>Con số nhân cách:</strong> Phản ánh cách bạn thể hiện bản thân ra bên ngoài và ấn tượng bạn tạo ra với người khác.</li>`;
    meaningsHTML += `<li><strong>Con số tương tác (Số biểu đạt):</strong> Đại diện cho cách bạn tương tác và thể hiện tài năng của mình với thế giới.</li>`;
    meaningsHTML += `<li><strong>Con số linh hồn ẩn (Số đam mê ẩn):</strong> Chỉ ra đam mê tiềm ẩn hoặc phẩm chất nổi bật nhất trong bạn.</li>`;
    meaningsHTML += `<li><strong>Con số ngày sinh:</strong> Liên quan đến đặc điểm và năng lượng của ngày bạn sinh ra.</li>`;
    meaningsHTML += `<li><strong>Con số đỉnh cao:</strong> Đại diện cho các giai đoạn quan trọng trong cuộc đời, ảnh hưởng đến cơ hội và thử thách ở các độ tuổi khác nhau.</li>`;
    meaningsHTML += '</ul>';
    meaningsHTML += '<h3 class="font-semibold mt-4">Ý Nghĩa Các Con Số Thách Thức Đỉnh Cao</h3><ul class="list-disc pl-5 space-y-2">';
    meaningsHTML += `<li><strong>Con số thách thức đỉnh cao 1:</strong> Những thử thách liên quan đến sự khác biệt giữa ngày và tháng sinh.</li>`;
    meaningsHTML += `<li><strong>Con số thách thức đỉnh cao 2:</strong> Những thử thách liên quan đến sự khác biệt giữa ngày sinh và năm sinh rút gọn.</li>`;
    meaningsHTML += `<li><strong>Con số thách thức đỉnh cao 3:</strong> Những thử thách từ sự khác biệt giữa hai con số thách thức đầu tiên.</li>`;
    meaningsHTML += `<li><strong>Con số thách thức đỉnh cao 4:</strong> Những thử thách liên quan đến sự khác biệt giữa tháng sinh và năm sinh rút gọn.</li>`;
    meaningsHTML += '</ul>';
    meaningsDiv.innerHTML = meaningsHTML;

    showMoreBtn.classList.remove('hidden');
    showCalcBtn.classList.remove('hidden');
    showMeaningsBtn.classList.remove('hidden');
    detailsDiv.classList.remove('details-shown');
    detailsDiv.classList.add('details-hidden');
    calculationDetailsDiv.classList.remove('details-shown');
    calculationDetailsDiv.classList.add('details-hidden');
    meaningsDiv.classList.remove('details-shown');
    meaningsDiv.classList.add('details-hidden');
    saveInputs(fullName, day, month, year);
    calculateBtn.disabled = false;
    hideLoading();
  }, 500);
}

function calculateDailyForecast() {
  const day = parseInt(document.getElementById('dailyDay').value);
  const month = parseInt(document.getElementById('dailyMonth').value);
  const year = parseInt(document.getElementById('dailyYear').value);
  const dailyForecastDiv = document.getElementById('dailyForecast');
  const dailyCalculationDetailsDiv = document.getElementById('dailyCalculationDetails');
  const dailyCalculateBtn = document.getElementById('dailyCalculateBtn');
  const dailyShowCalcBtn = document.getElementById('dailyShowCalcBtn');

  if (!isValidDate(day, month, year)) {
    dailyForecastDiv.innerHTML = '<p class="text-red-500 font-medium">Ngày sinh không hợp lệ!</p>';
    hideLoading();
    return;
  }

  dailyCalculateBtn.disabled = true;
  showLoading();
  setTimeout(() => {
    const forecast = calculateDailyNumber(day, month, year);
    const today = new Date().toLocaleDateString('vi-VN');
    const suggestions = getDailySuggestions(forecast.personalDay);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const personalYearSum = day + month + currentYear;
    const personalMonthSum = forecast.personalYear + currentMonth;
    const personalDaySum = forecast.personalMonth + currentDay;

    dailyForecastDiv.innerHTML = `
      <h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Dự Báo Hàng Ngày - ${today}</h2>
      <p><strong>Năm cá nhân:</strong> ${forecast.personalYear} - ${getNumberMeaning(forecast.personalYear)}</p>
      <p><strong>Tháng cá nhân:</strong> ${forecast.personalMonth} - ${getNumberMeaning(forecast.personalMonth)}</p>
      <p><strong>Ngày cá nhân:</strong> ${forecast.personalDay} - ${getNumberMeaning(forecast.personalDay)}</p>
      <h3 class="font-semibold mt-4">Gợi ý cho hôm nay:</h3>
      <p>${suggestions.do}</p>
      <h3 class="font-semibold mt-4">Những việc nên tránh:</h3>
      <p>${suggestions.avoid}</p>
    `;

    const dailyCalcDetails = `
      <h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Cách Tính Dự Báo Hàng Ngày</h2>
      <p><strong>Năm cá nhân:</strong> Cộng ngày sinh (${day}) + tháng sinh (${month}) + năm hiện tại (${currentYear}) = ${personalYearSum}. Rút gọn (giữ nguyên 11, 22, 33 nếu có) = ${forecast.personalYear}.</p>
      <p><strong>Tháng cá nhân:</strong> Năm cá nhân (${forecast.personalYear}) + tháng hiện tại (${currentMonth}) = ${personalMonthSum}. Rút gọn = ${forecast.personalMonth}.</p>
      <p><strong>Ngày cá nhân:</strong> Tháng cá nhân (${forecast.personalMonth}) + ngày hiện tại (${currentDay}) = ${personalDaySum}. Rút gọn = ${forecast.personalDay}.</p>
    `;
    dailyCalculationDetailsDiv.innerHTML = dailyCalcDetails;
    dailyCalculationDetailsDiv.classList.remove('details-shown');
    dailyCalculationDetailsDiv.classList.add('details-hidden');

    dailyShowCalcBtn.classList.remove('hidden');
    saveInputs('', day, month, year);
    dailyCalculateBtn.disabled = false;
    hideLoading();
  }, 500);
}

function calculateCompatibilityForecast() {
  const name1 = document.getElementById('compatName1').value.trim();
  const day1 = parseInt(document.getElementById('compatDay1').value);
  const month1 = parseInt(document.getElementById('compatMonth1').value);
  const year1 = parseInt(document.getElementById('compatYear1').value);
  const name2 = document.getElementById('compatName2').value.trim();
  const day2 = parseInt(document.getElementById('compatDay2').value);
  const month2 = parseInt(document.getElementById('compatMonth2').value);
  const year2 = parseInt(document.getElementById('compatYear2').value);
  const compatForecastDiv = document.getElementById('compatForecast');
  const compatCalculationDetailsDiv = document.getElementById('compatCalculationDetails');
  const compatCalculateBtn = document.getElementById('compatCalculateBtn');
  const compatShowCalcBtn = document.getElementById('compatShowCalcBtn');

  if (!name1 || !/^[a-z\s]*$/.test(name1) || !name2 || !/^[a-z\s]*$/.test(name2)) {
    compatForecastDiv.innerHTML = '<p class="text-red-500 font-medium">Họ tên chỉ được chứa chữ cái và khoảng trắng!</p>';
    hideLoading();
    return;
  }
  if (!isValidDate(day1, month1, year1) || !isValidDate(day2, month2, year2)) {
    compatForecastDiv.innerHTML = '<p class="text-red-500 font-medium">Ngày sinh không hợp lệ!</p>';
    hideLoading();
    return;
  }

  compatCalculateBtn.disabled = true;
  showLoading();
  setTimeout(() => {
    const compat = calculateCompatibility(name1, day1, month1, year1, name2, day2, month2, year2);
    const dateSum1 = String(day1).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(month1).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(year1).split('').reduce((sum, digit) => sum + Number(digit), 0);
    const dateSum2 = String(day2).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(month2).split('').reduce((sum, digit) => sum + Number(digit), 0) + String(year2).split('').reduce((sum, digit) => sum + Number(digit), 0);
    const expressionSteps1 = [];
    const expressionSteps2 = [];
    let expressionSum1 = 0, expressionSum2 = 0;
    const letters1 = name1.split('');
    const letters2 = name2.split('');
    for (let i = 0; i < letters1.length; i++) {
      const letter = letters1[i];
      if (/[a-z]/.test(letter)) {
        const value = getLetterValue(letter);
        expressionSum1 += value;
        expressionSteps1.push(`${letter.toUpperCase()} = ${value}`);
      }
    }
    for (let i = 0; i < letters2.length; i++) {
      const letter = letters2[i];
      if (/[a-z]/.test(letter)) {
        const value = getLetterValue(letter);
        expressionSum2 += value;
        expressionSteps2.push(`${letter.toUpperCase()} = ${value}`);
      }
    }

    compatForecastDiv.innerHTML = `
      <h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Kết Quả Độ Tương Hợp</h2>
      <p><strong>Họ và tên người thứ nhất:</strong> ${name1}</p>
      <p><strong>Ngày sinh người thứ nhất:</strong> ${day1}/${month1}/${year1}</p>
      <p><strong>Con số chủ đạo người thứ nhất:</strong> ${compat.lifePathNumber1} - ${getNumberMeaning(compat.lifePathNumber1)}</p>
      <p><strong>Con số tương tác người thứ nhất:</strong> ${compat.expressionNumber1} - ${getNumberMeaning(compat.expressionNumber1)}</p>
      <p><strong>Họ và tên người thứ hai:</strong> ${name2}</p>
      <p><strong>Ngày sinh người thứ hai:</strong> ${day2}/${month2}/${year2}</p>
      <p><strong>Con số chủ đạo người thứ hai:</strong> ${compat.lifePathNumber2} - ${getNumberMeaning(compat.lifePathNumber2)}</p>
      <p><strong>Con số tương tác người thứ hai:</strong> ${compat.expressionNumber2} - ${getNumberMeaning(compat.expressionNumber2)}</p>
      <h3 class="font-semibold mt-4">Mức độ tương hợp:</h3>
      <p><strong>${compat.overallCompat}%</strong> - ${compat.description}</p>
    `;

    const compatCalcDetails = `
      <h2 class="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200">Cách Tính Độ Tương Hợp</h2>
      <p><strong>Con số chủ đạo người thứ nhất:</strong> Cộng tất cả chữ số trong ngày sinh (${day1} → ${String(day1).split('').join('+')}), tháng sinh (${month1} → ${String(month1).split('').join('+')}), năm sinh (${year1} → ${String(year1).split('').join('+')}) = ${dateSum1}. Rút gọn (giữ nguyên 11, 22, 33 nếu có) = ${compat.lifePathNumber1}.</p>
      <p><strong>Con số tương tác người thứ nhất:</strong> Tổng giá trị tất cả chữ cái trong họ tên "${name1}" (${expressionSteps1.join(', ')}) = ${expressionSum1}. Rút gọn (giữ nguyên 11, 22, 33 nếu có) = ${compat.expressionNumber1}.</p>
      <p><strong>Con số chủ đạo người thứ hai:</strong> Cộng tất cả chữ số trong ngày sinh (${day2} → ${String(day2).split('').join('+')}), tháng sinh (${month2} → ${String(month2).split('').join('+')}), năm sinh (${year2} → ${String(year2).split('').join('+')}) = ${dateSum2}. Rút gọn (giữ nguyên 11, 22, 33 nếu có) = ${compat.lifePathNumber2}.</p>
      <p><strong>Con số tương tác người thứ hai:</strong> Tổng giá trị tất cả chữ cái trong họ tên "${name2}" (${expressionSteps2.join(', ')}) = ${expressionSum2}. Rút gọn (giữ nguyên 11, 22, 33 nếu có) = ${compat.expressionNumber2}.</p>
      <p><strong>Mức độ tương hợp:</strong> Trung bình phần trăm tương thích giữa con số chủ đạo (${compat.lifePathNumber1}, ${compat.lifePathNumber2} → ${compat.lifePathCompat}%) và con số tương tác (${compat.expressionNumber1}, ${compat.expressionNumber2} → ${compat.expressionCompat}%) = (${compat.lifePathCompat} + ${compat.expressionCompat})/2 = ${compat.overallCompat}%.</p>
    `;
    compatCalculationDetailsDiv.innerHTML = compatCalcDetails;
    compatCalculationDetailsDiv.classList.remove('details-shown');
    compatCalculationDetailsDiv.classList.add('details-hidden');

    compatShowCalcBtn.classList.remove('hidden');
    saveCompatInputs(name1, day1, month1, year1, name2, day2, month2, year2);
    compatCalculateBtn.disabled = false;
    hideLoading();
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  loadInputs();
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('themeIcon').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
  }
});

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  if (document.documentElement.classList.contains('dark')) {
    themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    localStorage.setItem('theme', 'light');
  }
});

const menuToggle = document.getElementById('menuToggle');
const menuDropdown = document.getElementById('menuDropdown');
menuToggle.addEventListener('click', () => {
  menuDropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
    menuDropdown.classList.remove('active');
  }
});

const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`${tabId}Tab`).classList.add('active');
    menuDropdown.classList.remove('active');
  });
});

const showMoreBtn = document.getElementById('showMoreBtn');
const detailsDiv = document.getElementById('details');
showMoreBtn.addEventListener('click', () => {
  detailsDiv.classList.toggle('details-hidden');
  detailsDiv.classList.toggle('details-shown');
  showMoreBtn.textContent = detailsDiv.classList.contains('details-shown') ? 'Ẩn Chi Tiết' : 'Xem Thêm';
});

const showCalcBtn = document.getElementById('showCalcBtn');
const calculationDetailsDiv = document.getElementById('calculationDetails');
showCalcBtn.addEventListener('click', () => {
  calculationDetailsDiv.classList.toggle('details-hidden');
  calculationDetailsDiv.classList.toggle('details-shown');
  showCalcBtn.textContent = calculationDetailsDiv.classList.contains('details-shown') ? 'Ẩn Cách Tính' : 'Xem Cách Tính';
});

const showMeaningsBtn = document.getElementById('showMeaningsBtn');
const meaningsDiv = document.getElementById('meanings');
showMeaningsBtn.addEventListener('click', () => {
  meaningsDiv.classList.toggle('details-hidden');
  meaningsDiv.classList.toggle('details-shown');
  showMeaningsBtn.textContent = meaningsDiv.classList.contains('details-shown') ? 'Ẩn Ý Nghĩa' : 'Xem Ý Nghĩa Các Con Số';
});

const dailyShowCalcBtn = document.getElementById('dailyShowCalcBtn');
const dailyCalculationDetailsDiv = document.getElementById('dailyCalculationDetails');
dailyShowCalcBtn.addEventListener('click', () => {
  dailyCalculationDetailsDiv.classList.toggle('details-hidden');
  dailyCalculationDetailsDiv.classList.toggle('details-shown');
  dailyShowCalcBtn.textContent = dailyCalculationDetailsDiv.classList.contains('details-shown') ? 'Ẩn Cách Tính' : 'Xem Cách Tính';
});

const compatShowCalcBtn = document.getElementById('compatShowCalcBtn');
const compatCalculationDetailsDiv = document.getElementById('compatCalculationDetails');
compatShowCalcBtn.addEventListener('click', () => {
  compatCalculationDetailsDiv.classList.toggle('details-hidden');
  compatCalculationDetailsDiv.classList.toggle('details-shown');
  compatShowCalcBtn.textContent = compatCalculationDetailsDiv.classList.contains('details-shown') ? 'Ẩn Cách Tính' : 'Xem Cách Tính';
});

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  document.getElementById('fullName').value = '';
  document.getElementById('day').value = '';
  document.getElementById('month').value = '';
  document.getElementById('year').value = '';
  document.getElementById('summary').innerHTML = '';
  document.getElementById('details').innerHTML = '';
  document.getElementById('calculationDetails').innerHTML = '';
  document.getElementById('meanings').innerHTML = '';
  document.getElementById('showMoreBtn').classList.add('hidden');
  document.getElementById('showCalcBtn').classList.add('hidden');
  document.getElementById('showMeaningsBtn').classList.add('hidden');
});

const dailyClearBtn = document.getElementById('dailyClearBtn');
dailyClearBtn.addEventListener('click', () => {
  document.getElementById('dailyDay').value = '';
  document.getElementById('dailyMonth').value = '';
  document.getElementById('dailyYear').value = '';
  document.getElementById('dailyForecast').innerHTML = '';
  document.getElementById('dailyCalculationDetails').innerHTML = '';
  document.getElementById('dailyShowCalcBtn').classList.add('hidden');
});

const compatClearBtn = document.getElementById('compatClearBtn');
compatClearBtn.addEventListener('click', () => {
  document.getElementById('compatName1').value = '';
  document.getElementById('compatDay1').value = '';
  document.getElementById('compatMonth1').value = '';
  document.getElementById('compatYear1').value = '';
  document.getElementById('compatName2').value = '';
  document.getElementById('compatDay2').value = '';
  document.getElementById('compatMonth2').value = '';
  document.getElementById('compatYear2').value = '';
  document.getElementById('compatForecast').innerHTML = '';
  document.getElementById('compatCalculationDetails').innerHTML = '';
  document.getElementById('compatShowCalcBtn').classList.add('hidden');
});

const calculateBtn = document.getElementById('calculateBtn');
const debouncedCalculate = debounce(calculateNumerology, 500);
calculateBtn.addEventListener('click', debouncedCalculate);
document.getElementById('mainTab').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') debouncedCalculate();
});

const dailyCalculateBtn = document.getElementById('dailyCalculateBtn');
const debouncedDailyCalculate = debounce(calculateDailyForecast, 500);
dailyCalculateBtn.addEventListener('click', debouncedDailyCalculate);
document.getElementById('dailyTab').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') debouncedDailyCalculate();
});

const compatCalculateBtn = document.getElementById('compatCalculateBtn');
const debouncedCompatCalculate = debounce(calculateCompatibilityForecast, 500);
compatCalculateBtn.addEventListener('click', debouncedCompatCalculate);
document.getElementById('compatTab').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') debouncedCompatCalculate();
});
