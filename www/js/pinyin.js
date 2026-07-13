/* ============================================
   拼音小乐园 — 拼音数据 + 读写逻辑
   Product: 幼小衔接拼音学习工具
   ============================================ */

// ===== 拼音数据 =====
const PINYIN_DATA = {
  // 声母 23个
  initials: [
    { pinyin: 'b', label: 'b 玻', group: '声母' },
    { pinyin: 'p', label: 'p 泼', group: '声母' },
    { pinyin: 'm', label: 'm 摸', group: '声母' },
    { pinyin: 'f', label: 'f 佛', group: '声母' },
    { pinyin: 'd', label: 'd 得', group: '声母' },
    { pinyin: 't', label: 't 特', group: '声母' },
    { pinyin: 'n', label: 'n 讷', group: '声母' },
    { pinyin: 'l', label: 'l 勒', group: '声母' },
    { pinyin: 'g', label: 'g 哥', group: '声母' },
    { pinyin: 'k', label: 'k 科', group: '声母' },
    { pinyin: 'h', label: 'h 喝', group: '声母' },
    { pinyin: 'j', label: 'j 鸡', group: '声母' },
    { pinyin: 'q', label: 'q 七', group: '声母' },
    { pinyin: 'x', label: 'x 西', group: '声母' },
    { pinyin: 'zh', label: 'zh 知', group: '声母' },
    { pinyin: 'ch', label: 'ch 吃', group: '声母' },
    { pinyin: 'sh', label: 'sh 诗', group: '声母' },
    { pinyin: 'r', label: 'r 日', group: '声母' },
    { pinyin: 'z', label: 'z 资', group: '声母' },
    { pinyin: 'c', label: 'c 刺', group: '声母' },
    { pinyin: 's', label: 's 丝', group: '声母' },
    { pinyin: 'y', label: 'y 衣', group: '声母' },
    { pinyin: 'w', label: 'w 屋', group: '声母' }
  ],

  // 单韵母 6个
  simple_finals: [
    { pinyin: 'ā', label: 'ā 阿', group: '单韵母' },
    { pinyin: 'ō', label: 'ō 喔', group: '单韵母' },
    { pinyin: 'ē', label: 'ē 鹅', group: '单韵母' },
    { pinyin: 'ī', label: 'ī 衣', group: '单韵母' },
    { pinyin: 'ū', label: 'ū 乌', group: '单韵母' },
    { pinyin: 'ǖ', label: 'ǖ 迂', group: '单韵母' }
  ],

  // 复韵母 18个
  compound_finals: [
    { pinyin: 'āi', label: 'āi 爱', group: '复韵母' },
    { pinyin: 'ēi', label: 'ēi 诶', group: '复韵母' },
    { pinyin: 'uī', label: 'uī 微', group: '复韵母' },
    { pinyin: 'áo', label: 'áo 熬', group: '复韵母' },
    { pinyin: 'óu', label: 'óu 欧', group: '复韵母' },
    { pinyin: 'iú', label: 'iú 由', group: '复韵母' },
    { pinyin: 'iē', label: 'iē 耶', group: '复韵母' },
    { pinyin: 'üē', label: 'üē 约', group: '复韵母' },
    { pinyin: 'ēr', label: 'ēr 儿', group: '复韵母' },
    { pinyin: 'ān', label: 'ān 安', group: '复韵母' },
    { pinyin: 'ēn', label: 'ēn 恩', group: '复韵母' },
    { pinyin: 'īn', label: 'īn 因', group: '复韵母' },
    { pinyin: 'ūn', label: 'ūn 温', group: '复韵母' },
    { pinyin: 'ǖn', label: 'ǖn 晕', group: '复韵母' },
    { pinyin: 'áng', label: 'áng 昂', group: '复韵母' },
    { pinyin: 'éng', label: 'éng 嗯', group: '复韵母' },
    { pinyin: 'īng', label: 'īng 英', group: '复韵母' },
    { pinyin: 'ōng', label: 'ōng 轰', group: '复韵母' }
  ],

  // 整体认读音节 16个
  whole_syllables: [
    { pinyin: 'zhī', label: 'zhī 知', group: '整体认读' },
    { pinyin: 'chī', label: 'chī 吃', group: '整体认读' },
    { pinyin: 'shī', label: 'shī 诗', group: '整体认读' },
    { pinyin: 'rì', label: 'rì 日', group: '整体认读' },
    { pinyin: 'zī', label: 'zī 资', group: '整体认读' },
    { pinyin: 'cī', label: 'cī 刺', group: '整体认读' },
    { pinyin: 'sī', label: 'sī 丝', group: '整体认读' },
    { pinyin: 'yī', label: 'yī 衣', group: '整体认读' },
    { pinyin: 'wū', label: 'wū 乌', group: '整体认读' },
    { pinyin: 'yú', label: 'yú 鱼', group: '整体认读' },
    { pinyin: 'yē', label: 'yē 耶', group: '整体认读' },
    { pinyin: 'yuē', label: 'yuē 约', group: '整体认读' },
    { pinyin: 'yuān', label: 'yuān 冤', group: '整体认读' },
    { pinyin: 'yīn', label: 'yīn 音', group: '整体认读' },
    { pinyin: 'yūn', label: 'yūn 晕', group: '整体认读' },
    { pinyin: 'yīng', label: 'yīng 英', group: '整体认读' }
  ]
};

// ===== 发音映射 (pinyin -> 真人发音文本) =====
// Web Speech API 通过朗读对应中文汉字更准确
const PRONUNCIATION_MAP = {
  // 声母
  'b': '波',
  'p': '泼',
  'm': '摸',
  'f': '佛',
  'd': '得',
  't': '特',
  'n': '讷',
  'l': '勒',
  'g': '哥',
  'k': '科',
  'h': '喝',
  'j': '鸡',
  'q': '七',
  'x': '西',
  'zh': '知',
  'ch': '吃',
  'sh': '诗',
  'r': '日',
  'z': '资',
  'c': '刺',
  's': '丝',
  'y': '衣',
  'w': '屋',
  // 单韵母
  'ā': '啊',
  'ō': '喔',
  'ē': '鹅',
  'ī': '衣',
  'ū': '乌',
  'ǖ': '迂',
  // 复韵母
  'āi': '爱',
  'ēi': '诶',
  'uī': '微',
  'áo': '熬',
  'óu': '欧',
  'iú': '由',
  'iē': '耶',
  'üē': '约',
  'ēr': '儿',
  'ān': '安',
  'ēn': '恩',
  'īn': '因',
  'ūn': '温',
  'ǖn': '晕',
  'áng': '昂',
  'éng': '嗯',
  'īng': '英',
  'ōng': '轰',
  // 整体认读
  'zhī': '知',
  'chī': '吃',
  'shī': '诗',
  'rì': '日',
  'zī': '资',
  'cī': '刺',
  'sī': '丝',
  'yī': '衣',
  'wū': '乌',
  'yú': '鱼',
  'yē': '耶',
  'yuē': '约',
  'yuān': '冤',
  'yīn': '音',
  'yūn': '晕',
  'yīng': '英'
};

// 获取纯拼音文本（去掉声调符号用于发音）
function stripTones(py) {
  const toneMap = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v',
    'ü': 'v', 'ê': 'e'
  };
  return py.split('').map(c => toneMap[c] || c).join('');
}

// ===== 发音引擎 =====
const SpeechEngine = {
  synth: window.speechSynthesis,
  isSpeaking: false,
  queue: [],

  speak(text, pinyin, callback) {
    if (!this.synth) {
      if (callback) callback();
      return;
    }

    this.synth.cancel();
    this.isSpeaking = true;

    // 用对应汉字朗读更自然
    const speakText = PRONUNCIATION_MAP[pinyin] || text || pinyin;

    const utter = new SpeechSynthesisUtterance(speakText);
    utter.lang = 'zh-CN';
    utter.rate = 0.75;   // 慢一点，适合儿童
    utter.pitch = 1.1;   // 音调略高，更亲切
    utter.volume = 1;

    // 选中文语音
    const voices = this.synth.getVoices();
    const zhVoice = voices.find(v => v.lang.startsWith('zh'));
    if (zhVoice) utter.voice = zhVoice;

    utter.onend = () => {
      this.isSpeaking = false;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        this.speak(next.text, next.pinyin, next.callback);
      } else if (callback) {
        callback();
      }
    };

    utter.onerror = () => {
      this.isSpeaking = false;
      if (callback) callback();
    };

    this.synth.speak(utter);
  },

  speakAll(items, onItem, onComplete) {
    this.queue = [];
    items.forEach((item, i) => {
      this.queue.push({
        text: item.pinyin,
        pinyin: item.pinyin,
        callback: i === items.length - 1 ? onComplete : null
      });
    });
    // 动画回调
    if (onItem) {
      this.queue.forEach((item, i) => {
        const origCb = item.callback;
        item.callback = () => {
          if (onItem) onItem(i);
          if (origCb) origCb();
        };
      });
    }
    // 开始第一个
    if (this.queue.length > 0) {
      const first = this.queue.shift();
      this.speak(first.text, first.pinyin, first.callback);
    }
  },

  stop() {
    this.synth.cancel();
    this.queue = [];
    this.isSpeaking = false;
  }
};

// ===== 学习状态 =====
const StudyState = {
  learned: new Set(),
  currentCategory: 'initials',

  load() {
    try {
      const saved = localStorage.getItem('pinyin_learned');
      if (saved) this.learned = new Set(JSON.parse(saved));
    } catch(e) { /* ignore */ }
  },

  save() {
    try {
      localStorage.setItem('pinyin_learned', JSON.stringify([...this.learned]));
    } catch(e) { /* ignore */ }
  },

  markLearned(pinyin) {
    this.learned.add(pinyin);
    this.save();
    this.updateProgress();
  },

  isLearned(pinyin) {
    return this.learned.has(pinyin);
  },

  updateProgress() {
    const total = getAllPinyin().length;
    const learned = this.learned.size;
    const pct = total > 0 ? (learned / total * 100) : 0;

    const bar = document.querySelector('.progress-bar-inner');
    const text = document.querySelector('.progress-text');
    if (bar) bar.style.width = Math.min(pct, 100) + '%';
    if (text) text.textContent = `已学 ${learned}/${total}`;
  }
};

// ===== 获取所有拼音（扁平化）=====
function getAllPinyin() {
  const all = [];
  for (const key of Object.keys(PINYIN_DATA)) {
    PINYIN_DATA[key].forEach(item => all.push(item));
  }
  return all;
}

// ===== 获取某分类拼音 =====
function getPinyinByCategory(catKey) {
  return PINYIN_DATA[catKey] || [];
}

// ===== 测试模式 =====
const TestMode = {
  questions: [],
  currentQ: 0,
  score: 0,

  generate(category) {
    const items = category ? getPinyinByCategory(category) : getAllPinyin();
    if (items.length < 4) return;
    
    this.questions = [];
    this.currentQ = 0;
    this.score = 0;

    // 随机选6个作为测试题
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(6, items.length));

    selected.forEach(correct => {
      // 选3个干扰项
      const others = items.filter(i => i.pinyin !== correct.pinyin);
      const wrongs = others.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...wrongs].sort(() => Math.random() - 0.5);
      
      this.questions.push({
        answer: correct,
        options: options
      });
    });
  },

  render() {
    const panel = document.querySelector('.test-panel');
    if (!panel) return;

    if (this.currentQ >= this.questions.length) {
      // 完成
      panel.innerHTML = `
        <div style="font-size:48px;margin-bottom:12px;">🎉</div>
        <div class="test-question">答对了 ${this.score}/${this.questions.length} 题!</div>
        <div class="test-score">
          ${this.score === this.questions.length ? '太棒了！全部正确！🌟' : 
            this.score >= this.questions.length * 0.7 ? '很好！继续加油！💪' : '再练练吧！'}</div>
        <button class="mode-btn active" style="margin-top:16px;" onclick="startTest()">再来一次</button>
        <button class="mode-btn" style="margin-top:8px;" onclick="closeTest()">返回学习</button>
      `;
      return;
    }

    const q = this.questions[this.currentQ];
    
    panel.innerHTML = `
      <div class="test-question">${q.answer.pinyin}</div>
      <div style="font-size:14px;color:#666;margin-bottom:8px;">
        请选出听到的拼音（第 ${this.currentQ + 1}/${this.questions.length} 题）
      </div>
      <div class="test-options">
        ${q.options.map((opt, i) => `
          <div class="test-option" data-index="${i}" onclick="checkAnswer(this, '${opt.pinyin}', ${i})">
            ${opt.pinyin}
          </div>
        `).join('')}
      </div>
      <div class="test-score">得分: <span>${this.score}</span></div>
    `;

    // 自动读题
    setTimeout(() => {
      SpeechEngine.speak(PRONUNCIATION_MAP[q.answer.pinyin] || q.answer.pinyin, q.answer.pinyin);
    }, 300);
  }
};

// ===== 全局函数（HTML onclick用） =====
function switchTab(key) {
  StudyState.currentCategory = key;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.tab[data-cat="${key}"]`)?.classList.add('active');
  renderGrid(key);
}

function renderGrid(catKey) {
  const grid = document.querySelector('.grid');
  const catInfo = document.querySelector('.cat-name');
  const catCount = document.querySelector('.cat-count');
  const items = getPinyinByCategory(catKey);

  // 更新分类信息
  const catLabels = {
    initials: '声母 (23个)',
    simple_finals: '单韵母 (6个)',
    compound_finals: '复韵母 (18个)',
    whole_syllables: '整体认读音节 (16个)'
  };
  if (catInfo) catInfo.textContent = catLabels[catKey] || '拼音';
  if (catCount) catCount.textContent = `${items.length} 个`;

  if (items.length === 0) {
    grid.innerHTML = '<div class="empty-state"><div class="emoji">📚</div><div>暂无拼音</div></div>';
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="pinyin-card ${StudyState.isLearned(item.pinyin) ? 'learned' : ''}"
         onclick="playPinyin(this, '${item.pinyin}', '${item.label}')">
      <span class="check-mark">✓</span>
      <span class="pinyin-text">${item.pinyin}</span>
      <span class="pinyin-label">${item.label}</span>
    </div>
  `).join('');
}

function playPinyin(el, pinyin, label) {
  // 动画
  document.querySelectorAll('.pinyin-card.speaking').forEach(c => c.classList.remove('speaking'));
  if (el) el.classList.add('speaking');

  // 发音
  SpeechEngine.speak(PRONUNCIATION_MAP[pinyin] || pinyin, pinyin, () => {
    if (el) {
      el.classList.remove('speaking');
      el.classList.add('learned');
      StudyState.markLearned(pinyin);
    }
  });
}

function playAll() {
  const catKey = StudyState.currentCategory;
  const items = getPinyinByCategory(catKey);
  if (items.length === 0) return;

  const btn = document.querySelector('.play-all-btn');
  if (btn) btn.disabled = true;

  const cards = document.querySelectorAll('.pinyin-card');
  
  SpeechEngine.speakAll(items, 
    (idx) => {
      // 每读一个高亮
      document.querySelectorAll('.pinyin-card.speaking').forEach(c => c.classList.remove('speaking'));
      if (cards[idx]) {
        cards[idx].classList.add('speaking');
        cards[idx].classList.add('learned');
        StudyState.markLearned(items[idx].pinyin);
      }
    },
    () => {
      // 完成
      document.querySelectorAll('.pinyin-card.speaking').forEach(c => c.classList.remove('speaking'));
      if (btn) btn.disabled = false;
      showToast('播放完成！🎉');
    }
  );
}

function stopPlay() {
  SpeechEngine.stop();
  document.querySelectorAll('.pinyin-card.speaking').forEach(c => c.classList.remove('speaking'));
  const btn = document.querySelector('.play-all-btn');
  if (btn) btn.disabled = false;
}

function startTest() {
  const catKey = StudyState.currentCategory;
  TestMode.generate(catKey);
  
  document.querySelector('.test-panel')?.classList.add('active');
  document.querySelector('.mode-btn.test-mode-btn')?.classList.add('active');
  
  TestMode.render();
}

function checkAnswer(el, pinyin, index) {
  const q = TestMode.questions[TestMode.currentQ];
  const allOptions = document.querySelectorAll('.test-option');

  allOptions.forEach(opt => opt.style.pointerEvents = 'none');

  if (pinyin === q.answer.pinyin) {
    el.classList.add('correct');
    TestMode.score++;
  } else {
    el.classList.add('wrong');
    // 标记正确答案
    allOptions.forEach(opt => {
      if (opt.dataset.index && TestMode.questions[TestMode.currentQ].options[parseInt(opt.dataset.index)].pinyin === q.answer.pinyin) {
        opt.classList.add('correct');
      }
    });
  }

  // 下一题
  setTimeout(() => {
    TestMode.currentQ++;
    TestMode.render();
  }, 1000);
}

function closeTest() {
  document.querySelector('.test-panel')?.classList.remove('active');
  document.querySelector('.mode-btn.test-mode-btn')?.classList.remove('active');
}

function searchFilter() {
  const query = document.querySelector('.search-box')?.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.pinyin-card');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = (!query || text.includes(query)) ? '' : 'none';
  });
}

function showToast(msg) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  StudyState.load();

  // 加载浏览器语音列表
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // 默认显示声母
  renderGrid('initials');
  StudyState.updateProgress();

  // 设置tab点击
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      if (cat) switchTab(cat);
    });
  });
});
