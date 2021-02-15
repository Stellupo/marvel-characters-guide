export function Mouseover(card: EventTarget): void {

  /** changing appearance of the cards when the mouse is over them */
    const li = (card as HTMLElement).parentElement;
    const div = li.firstElementChild as HTMLElement;

    if (div.className !== 'txt_wrapper') {return; }
    console.log('Changing appearance when mouse on');

    const title = div.firstElementChild as HTMLElement;
    title.style.display = 'none';

    const intro = div.lastElementChild as HTMLElement;
    intro.style.display = 'none';

    div.style.backgroundColor = 'rgba(32,32,32,0.2)';

}

export function Mouseout(card: EventTarget): void {

/** changing appearance of the cards when the mouse is out */
  const li = (card as HTMLElement).parentElement;
  const div = li.firstElementChild as HTMLElement;

  if (div.className !== 'txt_wrapper') {return; }
  console.log('Changing appearance when mouse out');

  const title = div.firstElementChild as HTMLElement;
  title.style.display = '';

  const intro = div.lastElementChild as HTMLElement;
  intro.style.display = '';

  div.style.backgroundColor = 'rgba(32,32,32,0.8)';

}
