// TODO: 1.6. Man ska kunna vända en bricka genom att trycka på den
// TODO: 1.7. Om 2 lika brickor vänds så ska dem tas bort
// TODO: 1.8. Om 2 olika brickor vänds så ska dem vändas tillbaka
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
//
const memory = () => {
  const rows = 4;
  const columns = 4;
  //
  const tiles = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  //
  const containerId = 'memory';
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
  for (let i = 0; i < tiles.length; i++) {
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
      const path = `images/${tiles[i]}.png`;
      img.setAttribute('src', path);
    };
    // FIXME:
    //
    const brick = document.importNode(templateDiv.firstElementChild, true);
    brick.addEventListener('click', handleClick);
    div.appendChild(brick);
  }
};
export default memory;
