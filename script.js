const emojiSource = document.querySelector('.emoji-source');
const emojiOptions = document.getElementById('emoji-options');
const emojiContainer = document.getElementById('emoji-container');

function saveEmojiPositions() {
  const positions = [];
  const emojis = document.querySelectorAll('.emoji');
  emojis.forEach(emoji => {
    positions.push({
      left: emoji.style.left,
      top: emoji.style.top,
      text: emoji.textContent
    });
  });
  localStorage.setItem('emojiPositions', JSON.stringify(positions));
}

function loadEmojiPositions() {
  const positions = JSON.parse(localStorage.getItem('emojiPositions'));
  if (positions) {
    positions.forEach(position => {
      const newEmoji = document.createElement('span');
      newEmoji.classList.add('emoji');
      newEmoji.textContent = position.text;
      newEmoji.style.left = position.left;
      newEmoji.style.top = position.top;
      emojiContainer.appendChild(newEmoji);
      makeEmojiDraggable(newEmoji);
    });
  }
}

function makeEmojiDraggable(emoji) {
  let isDragging = false;
  let offsetX, offsetY;

  emoji.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - emoji.offsetLeft;
    offsetY = e.clientY - emoji.offsetTop;
    e.preventDefault();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    saveEmojiPositions();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      emoji.style.left = e.clientX - offsetX + 'px';
      emoji.style.top = e.clientY - offsetY + 'px';
      e.preventDefault();
    }
  });
}

emojiSource.addEventListener('click', () => {
  emojiOptions.style.display = 'block';
});

emojiOptions.addEventListener('click', (e) => {
  if (e.target.classList.contains('emoji-option')) {
    const newEmoji = document.createElement('span');
    newEmoji.classList.add('emoji');
    newEmoji.textContent = e.target.textContent;
    newEmoji.style.position = 'absolute';
    newEmoji.style.left = '250px';
    newEmoji.style.top = '150px';
    emojiContainer.appendChild(newEmoji);
    makeEmojiDraggable(newEmoji);
    emojiOptions.style.display = 'none';
  }
});

// Load saved positions on page load
loadEmojiPositions();
