import {Character} from './models/character';


export const CHARACTERS: Character[] = [
  { id: 1,
    name: 'WOLVERINE',
    story: 'From the northern wilderness of Canada hails one of the gruffest, most irascible, totally cynical and brooding member of the X-Men ever to grace the team with his presence.',
    abilities: ['Indestructible claws', 'Healing powers', 'Enhanced senses'],
    group: ['X-MEN'], // todo faire en sorte que le groupe se charge automatiquement
    img: 'assets/images/wolverine.jpg',
    header: 'assets/images/wolverine_header.png'
  },
  { id: 2,
    name: 'IRON MAN',
    story: 'Having created a wondrous suit of armor to keep himself alive, Tony has revised it dozens of times, each version with increased capabilities, faster operation, reduced energy usage, and adaptability to the greatest threats the universe has to offer.',
    abilities: ['360 vision', 'Energy blast', 'Powerful Armor'],
    group: ['Avengers', 'S.H.I.E.L.D'],
    img: 'assets/images/Ironman.jpg',
    header: 'assets/images/ironman_header.png'
  },
  { id:3,
    name: 'GROOT',
    story: 'This sentient alien tree branches out of his comfort zone to help the Guardians of the Galaxy keep the people of the universe safe.',
    abilities: ['Regeneration', 'Super strength'],
    group: ['Guardians of the galaxy'],
    img: 'assets/images/groot.png',
    header: 'assets/images/groot_header.png'
  }];
