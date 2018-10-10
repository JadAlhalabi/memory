import getMixedNumberArray from './helpers';

const timer = score => {
  const timeE1 = document.getElementById('time');
  return window.setInterval(() => {
    const currentTime = Date.now();
    score.time = Math.round((currentTime - score.startTime) / 1000);
    timeE1.textContent = score.time;
  }, 1000);
};

const turnBrick = (bricks, img, score, renderOptions, t) => {
  const triesE1 = document.getElementById('tries');
  const pairsE1 = document.getElementById('pairs');

  if (bricks.second) {
    return;
  }

  if (!bricks.first) {
    bricks.first = img;
  } else {
    bricks.second = img;

    //
    const isSameSrc = bricks.first.getAttribute('src') === bricks.second.getAttribute('src');
    const isDifferentBrick =
      bricks.first.getAttribute('data-index-number') !==
      bricks.second.getAttribute('data-index-number');
    const isPair = isSameSrc && isDifferentBrick;
    //
    if (isPair) {
      window.setTimeout(() => {
        bricks.first.parentElement.classList.add('hidden');
        bricks.second.parentElement.classList.add('hidden');
        score.pairs++;
        score.tries++;
        pairsE1.textContent = score.pairs;
        triesE1.textContent = score.tries;
        //
        bricks.first = null;
        bricks.second = null;
        if ((renderOptions.rows * renderOptions.columns) / 2 === score.pairs) {
          const msgE1 = document.getElementById('win-message');
          clearInterval(t);
          msgE1.textContent = `Grattis! Du vann efter ${score.trise} försök och fick ${
            score.pairs
          } par på ${score.time} sekunder`;
        }
      }, 300);
    } else {
      // FIXME:
      window.setTimeout(() => {
        //
        const path = 'images/0.png';
        //
        bricks.first.setAttribute('src', path);
        bricks.second.setAttribute('src', path);
        score.tries++;
        triesE1.textContent = score.tries;
        //
        bricks.first = null;
        bricks.second = null;
      }, 300);
    }
  }
};
const renderMemory = (containerId, bricks, score, renderOptions) => {
  //
  const container = document.getElementById(containerId);
  //
  const template = document.querySelector('#memory template');
  const templateDiv = template.content.querySelector('.memory');
  const headerDiv = template.content.getElementById('header');
  //
  const div = document.importNode(templateDiv, false);
  const header = document.importNode(headerDiv, true);
  //
  div.appendChild(header);
  container.appendChild(div);
  const t = timer(score);

  div.addEventListener('click', event => {
    const isTargetBrick = event.target.getAttribute('class') === 'brick';
    const isParentBrick = event.target.parentElement.getAttribute('class') === 'brick';
    const isBrick = isTargetBrick || isParentBrick;
    if (!isBrick) {
      return;
    }
    const img = event.target.tagName === 'DIV' ? event.target.firstElementChild : event.target;

    const tileIndex = event.target.getAttribute('data-index-number')
      ? event.target.getAttribute('data-index-number')
      : event.target.firstElementChild.getAttribute('data-index-number');

    const path = `images/${bricks.tiles[tileIndex]}.png`;
    img.setAttribute('src', path);

    //
    turnBrick(bricks, img, score, renderOptions, t);
  });

  bricks.tiles.forEach((tiles, i) => {
    const brick = document.importNode(templateDiv.firstElementChild, true);
    brick.firstElementChild.setAttribute('data-index-number', i);
    div.appendChild(brick);
  });
};
//
const memory = containerId => {
  //
  const renderOptions = {
    rows: 4,
    columns: 4
  };
  //
  const bricks = {
    first: null,
    second: null,
    tiles: getMixedNumberArray((renderOptions.rows * renderOptions.columns) / 2)
  };

  const score = {
    tries: 0,
    pairs: 0,
    time: 0,
    startTime: Date.now()
  };

  //
  renderMemory(containerId, bricks, score, renderOptions);
};

export default memory;
