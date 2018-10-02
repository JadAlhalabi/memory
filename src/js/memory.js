// TODO: 1.6. Man ska kunna vända en bricka genom att trycka på den
// TODO: 1.9. När 2 brickor vänds ska antalet försök uppdateras
// TODO: 1.10. När 2 lika brickor vänds ska antalet par uppdateras
// TODO: 1.11. Antalet försök och antalet par ska visas för användaren
// TODO: 1.12. Spelaren ska kunna se under hur många sekunder som han har spelat
// TODO: 1.13. När spelet är slut ska antalet sekunder sluta räkna
// TODO: 2. Det ska enkelt gå att ladda in flera spel, gebin att anropa en funktion flera gånger
/* TODO: 3. En enklare dokumentation i README.md som ska vara skriven i markup språket Markdown,
Bör inhållar kortare information om vad som ligger i respektive fil somt vilka kommandon som ska
 köras för att starta utvecklingsserver samt hur man bygger en build. */
//
const turnBrick = (bricks, img) => {
  if (bricks.first === null) {
    bricks.first = img;
  } else {
    bricks.second = img;

    if (bricks.first.getAttribute('src') === bricks.second.getAttribute('src')) {
      const removeBrick = () => {
        bricks.first.parentElement.classList.add('hidden');
        bricks.second.parentElement.classList.add('hidden');
        //
        bricks.first = null;
        bricks.second = null;
      };
      window.setTimeout(removeBrick, 100);
    } else {
      //
      const turnBackBrick = () => {
        const path = 'images/0.png';

        bricks.first.setAttribute('src', path);
        bricks.second.setAttribute('src', path);

        bricks.first = null;
        bricks.second = null;
      };
      window.setTimeout(turnBackBrick, 100);
    }
  }
};
const renderMemory = (containerId, bricks) => {
  //
  const container = document.getElementById(containerId);
  //
  const template = document.querySelector('#memory template');
  // FIXME: ska skrivas om senare.
  //
  const templateDiv = template.content.firstElementChild;
  //
  const div = document.importNode(templateDiv, false);
  //
  container.appendChild(div);

  //
  //
  for (let i = 0; i < bricks.tiles.length; i++) {
    // FIXME:
    //
    const handleClick = event => {
      // FIXME:
      let img;
      if (event.target.tagName === 'DIV') {
        img = event.target.firstElementChild;
      } else {
        img = event.target;
      }
      const path = `images/${bricks.tiles[i]}.png`;
      img.setAttribute('src', path);

      turnBrick(bricks, img);
    };
    const brick = document.importNode(templateDiv.firstElementChild, true);
    // FIXME:
    brick.addEventListener('click', handleClick);
    div.appendChild(brick);
  }
};
//
const memory = () => {
  //
  const renderOptions = {
    rows: 4,
    columns: 4
  };
  //
  const bricks = {
    first: null,
    second: null,
    tiles: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
  };

  //
  const containerId = 'memory';
  renderMemory(containerId, bricks);
};

export default memory;
