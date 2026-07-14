var currentCat = 'shengmu';
var currentIdx = 0;
var audioEl = document.getElementById('player');

function selectCategory(cat) {
  currentCat = cat;
  currentIdx = 0;
  var names = {shengmu:'声母', yunmu:'韵母', zhengti:'整体认读音节'};
  document.getElementById('header-title').textContent = names[cat];
  document.getElementById('page-category').classList.remove('active');
  document.getElementById('page-player').classList.add('active');
  showPinyin();
}

function backToCategory() {
  audioEl.pause();
  document.getElementById('page-player').classList.remove('active');
  document.getElementById('page-category').classList.add('active');
}

function getList() { return DATA[currentCat]; }

function showPinyin() {
  var list = getList();
  var item = list[currentIdx];
  document.getElementById('pinyin-big').textContent = item.pinyin;
  document.getElementById('pinyin-char').textContent = item.ch;
  var names = {shengmu:'声母', yunmu:'韵母', zhengti:'整体认读音节'};
  document.getElementById('pinyin-type').textContent = names[currentCat];
  document.getElementById('progress-text').textContent = (currentIdx+1) + '/' + list.length;
  var pct = ((currentIdx+1) / list.length * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
}

function playCurrent() {
  var item = getList()[currentIdx];
  audioEl.src = 'audio/' + item.mp3;
  audioEl.play();
}

function nextPinyin() {
  var list = getList();
  if (currentIdx < list.length - 1) {
    currentIdx++;
    showPinyin();
  }
}

function prevPinyin() {
  if (currentIdx > 0) {
    currentIdx--;
    showPinyin();
  }
}

// 手势滑动的支持
document.addEventListener('touchstart', function(e) {
  window._touchStartX = e.touches[0].clientX;
}, false);

document.addEventListener('touchend', function(e) {
  var page = document.getElementById('page-player');
  if (!page.classList.contains('active')) return;
  var dx = e.changedTouches[0].clientX - window._touchStartX;
  if (dx > 60) prevPinyin();
  else if (dx < -60) nextPinyin();
}, false);
