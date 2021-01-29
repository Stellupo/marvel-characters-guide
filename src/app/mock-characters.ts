import {Character} from './character';


export const CHARACTERS: Character[] = [
  { id: 1,
    name: 'WOLVERINE',
    story: 'From the northern wilderness of Canada hails one of the gruffest, most irascible, totally cynical and brooding member of the X-Men ever to grace the team with his presence.',
    abilities: ['Indestructible claws', 'Healing powers', 'Enhanced senses'],
    group: ['X-men'],
    img: 'assets/images/wolwerine.jpg',
    header: 'assets/images/wolwerine_header.png'
  },
  { id: 2,
    name: 'IRON MAN',
    story: 'Having created a wondrous suit of armor to keep himself alive, Tony has revised it dozens of times, each version with increased capabilities, faster operation, reduced energy usage, and adaptability to the greatest threats the universe has to offer.',
    abilities: ['360 vision', 'Energy blast', 'Powerful Armor'],
    group: ['Avengers', 'S.H.I.E.L.D'],
    img: 'assets/images/Ironman.jpg',
    header: 'assets/images/ironman_header.png'
  }];
