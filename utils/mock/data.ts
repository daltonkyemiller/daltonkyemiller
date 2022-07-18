import { Project } from '../types';
import { randomFromArray } from '../helpers';

export const randomPhotos = [
    'https://picsum.photos/seed/98094/1920/1080',
    'https://picsum.photos/seed/96324/1920/1080',
    'https://picsum.photos/seed/62807/1920/1080',
    'https://picsum.photos/seed/81583/1920/1080',
    'https://picsum.photos/seed/12832/1920/1080',
    'https://picsum.photos/seed/13847/1920/1080',
    'https://picsum.photos/seed/89337/1920/1080',
    'https://picsum.photos/seed/36018/1920/1080',
    'https://picsum.photos/seed/99203/1920/1080',
    'https://picsum.photos/seed/95755/1920/1080',
    'https://picsum.photos/seed/02454/1920/1080',
    'https://picsum.photos/seed/57205/1920/1080',
    'https://picsum.photos/seed/55804/1920/1080',
    'https://picsum.photos/seed/92022/1920/1080',
    'https://picsum.photos/seed/53815/1920/1080',
    'https://picsum.photos/seed/88264/1920/1080',
    'https://picsum.photos/seed/01423/1920/1080',
    'https://picsum.photos/seed/80144/1920/1080',
    'https://picsum.photos/seed/53134/1920/1080',
    'https://picsum.photos/seed/44005/1920/1080',
    'https://picsum.photos/seed/54937/1920/1080',
    'https://picsum.photos/seed/38038/1920/1080',
    'https://picsum.photos/seed/65784/1920/1080',
    'https://picsum.photos/seed/98916/1920/1080',
    'https://picsum.photos/seed/77429/1920/1080',
];

export const projects: Project[] = [
    {
        name: 'Capstone',
        description:
            'Counters marc lightbox trends moore amanda single, belarus philosophy larger authorized kansas scratch profiles, goat jobs tradition hiring exclusion must critical, blonde join six. ',
        path: 'capstone',
        images: [randomFromArray(randomPhotos), randomFromArray(randomPhotos)],
        cover: randomFromArray(randomPhotos),
    },
    {
        name: 'React Movies App',
        description:
            'While trusts open photograph treated cultural marked, protein toolbox bargains striking. ',
        path: 'react-movies-app',
        images: [randomFromArray(randomPhotos), randomFromArray(randomPhotos)],
        cover: randomFromArray(randomPhotos),
    },
    {
        name: 'Weather Map App',
        description:
            'Gossip liquid baseball if seekers cannon hope, exports motorcycles memorabilia triple activated volt crops, doctors cellular. ',
        path: 'weather-map-app',
        images: [randomFromArray(randomPhotos), randomFromArray(randomPhotos)],
        cover: randomFromArray(randomPhotos),
    },
    {
        name: 'Coffee Project ☕',
        description:
            'Keyboard habitat cruises promoting greetings sponsor crazy, carroll operated phys enclosure released final plug, devoted cables gambling viewpicture develops louisville cooked, bang.',
        path: 'coffee-project',
        images: [randomFromArray(randomPhotos), randomFromArray(randomPhotos)],
        cover: randomFromArray(randomPhotos),
    },
    {
        name: 'Vanilla Movies App',
        description: 'Fears ethernet camera reading game.',
        path: 'vanilla-movies-app',
        images: [randomFromArray(randomPhotos), randomFromArray(randomPhotos)],
        cover: 'https://github.com/daltonkyemiller/movies-app/blob/main/readme/img/movies_app_demo.gif?raw=true',
    },
];
