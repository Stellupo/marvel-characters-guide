import {Group} from './groups';


export const GROUPS: Group[] = [
  { id : 1,
    name: 'X-MEN',
    story: 'Realizing mutants were the next step in human evolution, Professor Charles Xavier gathered gifted teenagers to be his first class of students. His goal to protect and educate the next generation of homo superior, while pursuing a dream of harmony.',
    members: ['Professor X', 'Cyclops', 'Phoenix', 'Angel', 'Beast', 'Wolverine'],
    img: 'assets/images/x-men.jpg',
    header: 'assets/images/xmen_header.jpg',
  },
  { id: 2,
    name: 'Avengers',
    story: 'The Avengers began as a group of extraordinary individuals who were assembled to defeat Loki and his Chitauri army in New York City. Since then, the team has expanded its roster and faced a host of new threats, while dealing with their own turmoil.',
    members: ['Captain America', 'Thor', 'Iron Man', 'She-Hulk', 'Captain Marvel', 'Black Panther', 'Black Widow', 'Doctor Strange'],
    img: 'assets/images/avengers.jpg',
    header: 'assets/images/avengers_header.jpg',
  },
  { id: 3,
    name: 'Guardians of the galaxy',
    story: 'This group of intergalactic outlaws, turned unlikely saviors of the galaxy, are typically without a plan and bicker constantly. But they care deeply about one another and usually get the job done, legal or otherwise.',
    members: ['Rocket', 'Gamora', 'Groot', 'Star-Lord', 'Bug'],
    img: 'assets/images/guardian_of_the_galaxy.jpg',
    header: 'assets/images/guardian_of_the_galaxy_header.jpg',
  }];
