
import { Movie } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'ETHEREAL CHRONICLES',
    description: 'In a future where memories can be traded as currency, a rogue detective uncovers a conspiracy that threatens to erase the history of humanity itself.',
    year: 2024,
    rating: 'TV-MA',
    matchScore: 98,
    seasons: '4 Seasons',
    quality: '4K Ultra HD',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWxjCOvUpugmotLH6PkARB0dD7vLhteVIPr7qNeHTsPmXjjj8FGIGa6HlCV3X-446zi-Lrv_B1x8rmfm7UbU__HWyM9kz9wZHvSUZPeZ5mCsue30Cr4gVM9BMqMgl3OlEUDb9gALo3_4fyduK4M6G5bWiZNgqlTIBYcxdW8fASEpx7QR1IYsofq0cgbJMVWBo6tZxSzyp3NdLovcxxLTJ25_y7GihdrJYf4zT1i6xncKHr2r-77_gqu-5wj0MuR1C9fVZuI--8Kh8',
    heroUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZp-XMs0fXqFKQLKMNmws4aZTarjzIXetlAeuuzHPcPgLc02KXVY1E2thnyoeLDBHVA_Gjv59MEKTS7B_OsyHuX57FImBfm1CdIMwRVzORO0y11RxUr3xNDUqXgG93v0Dn_ASufCwrpeEhuIBJ1YukkzubHTVAdjxi9N0hIm21aLe5f5t3Vq8zwRfyXthX6hIs4CAJJkgLvySTp-EErtFYcVfy4xTN1Nu-FDp88LIq40yKDKXecErAjSvkwGEgdxBd_dinprLrlS0',
    genre: 'Sci-Fi',
    category: 'trending',
    cast: [
      { name: 'M. McConaughey', role: 'Detective Joe', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANhaLlvcfWxE-FbrMgtEuR9pvuj3szqlVEdo11yVv6d_grfAKPIW0vEQT8moDVSMhVVZeEI9AdTtXIE1f55V2AD3V8hz6hpheLCmIfHyaLd0fZ7QnsGLSn9gaXqbM2LyMUyROifnr5HuOZj3ehAByRwG9n5CljJwjJfXw95JfTV7xtBOoeCSx0eSBnxoWCXFzNz_QFHyGDNbRXsADU2AZTYvrc0glrgTB_jWnmBFmpf9829e1ORZlUQ5nJA8IpQ2ncQvuJZItGnQA' },
      { name: 'Anne Hathaway', role: 'Agent Sarah', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFD-a4nPH8-OTFExC5_vrnXUCcpVWqn32Wpo4clAvJY_YB3ZZUjSpS-XkAqoqXRzsP8Hp6qIDDM2S95rxzrZFYueYoBwafsTZ2g6fnYxyFRO_9a7mgCWl2jq6ONDARI1NDmJSyivZWmLOEe2Hb8iwRdMx7YUDbNIFJVkcSY-B7OilW09Aucb30Pk51QV_1yO4revC4ltq0-9mltBSwVwKbbsczrWelkJr_njkQwbQ210jyTiQRdo5Gq0fLn6de5no1HHXgJTNqAiM' }
    ]
  },
  {
    id: '2',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    year: 2014,
    rating: 'PG-13',
    matchScore: 99,
    quality: '4K',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdw8e4w-JQ3GigFEThEtCd4P5s0r9MeuzsV_JRUDFLW_feZxeIu-zt5qerr-e1sJ04UEpaWlVdKvGL1sJaQsWE1ZE1v78E2CPlkniArGXDCJl0BrZV44okThXp6jmzST7yatmnBHgUGdG4xdpXEzO_gQ0j8pPBbfOdNxoQWXJQpFeycJ3IZrn6QOtmItWPG7-jEH92a-kM089MUirdzjRWXFpCvkTkz5dNAKb-NWgt1CGTe73Gx_SwT3kcXhsOtGfaucaeaGerqQI',
    heroUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfrNTzBtGRB8FvZzyjeRjfj9qn0a85sXCixF1_rndnK_CBlYsZNKqTMcCmOErMQAchISNKlw2whnhqOIFz1bpzlxmgvt-z52WQNsHhx2DvMvblNV7btcAYyOthX0BPvWjqM_5P6bXH2IozayKPBA7SYvGJIsZZClFdPed90_cPh2TURw6UTxdm4YWa0iYO8mNN14cm6b0sEGvgksMbqXPoyVvOzaLtguUDBdA2IKgjNQsTXxBQf3tsJIUAOfIiuixJhMFoLh8rmRc',
    genre: 'Sci-Fi',
    category: 'trending',
    cast: [
       { name: 'M. McConaughey', role: 'Cooper', imageUrl: 'https://picsum.photos/200/200?random=1' },
       { name: 'Anne Hathaway', role: 'Brand', imageUrl: 'https://picsum.photos/200/200?random=2' }
    ]
  },
  {
    id: '3',
    title: 'The Martian',
    description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
    year: 2015,
    rating: 'PG-13',
    matchScore: 95,
    quality: '4K',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU7qrGKKALRScD6j87GryNwsWs_0xIWgUFYG6yj3mGw1R3oJeuYR2nvTNe_V87HYsWv2h7-OTweQQIHhdba7nNg_RPaErtEiFkvegW8qVQfXXnLx9y5A9qYfJ5hWRmSeEVJNMmwB1d_AF8sHf8tgH_J180D1Bv3pGxv0tRz1wBakIrk-MPnm4OHCoTiFO_KKRKowyWJvoc3lt6xUzbl4jzMnZLvQ6JS2yftrMkjEmaZn8sqRDoAoTv-jWbjQB7Bv-VsRbjwcWNCxo',
    heroUrl: 'https://picsum.photos/1920/1080?random=10',
    genre: 'Drama',
    category: 'trending',
    cast: []
  },
  {
    id: '4',
    title: 'Gravity',
    description: 'Two astronauts work together to survive after an accident leaves them stranded in space.',
    year: 2013,
    rating: 'PG-13',
    matchScore: 92,
    quality: 'HD',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgGEHZRqpGtMDkcLo660CQ5HOB_lhrKz6A8ygzjiCdJTUEHvBbrjyQCdhTcBjD4ke_zh_0ayPXzWdTu0uM5WSewG74WeFgJI-21ZXC1dAFuLX7DRDK54jEDGxfAxcrCPKPdvvSymSL4gF_RN2F3sh7BSz3pU9Hb0-VrXH_cZtVuvOh1BKulUx5_9E2F9uOK8E_JOx_tNRzp3zVK1EUOuNMzX0iCp9PctQ3OQ-GsQ6Gbmtf3Xj5NN0adU0ENF0MOlxs3SZZ_CT4Sjk',
    heroUrl: 'https://picsum.photos/1920/1080?random=11',
    genre: 'Thriller',
    category: 'trending',
    cast: []
  },
  {
    id: '5',
    title: 'Ad Astra',
    description: 'Astronaut Roy McBride undertakes a mission across an unforgiving solar system to uncover the truth about his missing father.',
    year: 2019,
    rating: 'PG-13',
    matchScore: 88,
    quality: '4K',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm16x-TVBbKn5H8bTSGmyEPW8Ax3TqyGvKX166sX-ja8PWcwGszBAKW-jaP4g7VK9TjLz1a7T4FYEAIYYLjAiJiJpN7vR79foK3DqqyXo30LcBUyPfg46q4RGpAnKzxY9SCYLFUQjk3dWsUphUrkHkEkpRujCq-CKBE4Tf9TSI_cLhmKhlFqFPGD3-lTMaupHFj_CyG4ScZ59N-20NLXkfOsAlmqiSDw7PKoohLznL7crhMRo4KssHh58tvi2FTwR84VjSh5yo6DQ',
    heroUrl: 'https://picsum.photos/1920/1080?random=12',
    genre: 'Mystery',
    category: 'new',
    cast: []
  },
  {
    id: '6',
    title: 'Urban Lights',
    description: 'A glowing documentary about the history of neon lighting in modern cities.',
    year: 2023,
    rating: 'TV-G',
    matchScore: 90,
    quality: 'HDR',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-NBbywN974URyQng-c64tzN-6iM0neDW9tG5ZQhhqEZMGWnH64jlxacEXMabZeQxr_bkEScXn7xHNg-VbnMut2F6NMIQGzfx7GvZg-Wzu6VP5qR2w3N2ST350yQ_nnRpi2AGoPSv0Cf0CZlvxeBLvVm8YCwEKFaIKGBGvu80ZOjBwfpOwux_XpSWU60rXU0XeRsuGP82eQqHryaA50E1tlSwJAzC1F3OPU1alTNBsnowIIDGZqAHY3hvT6t9So8v3yfWtz8Q2OgE',
    heroUrl: 'https://picsum.photos/1920/1080?random=13',
    genre: 'Documentary',
    category: 'new',
    cast: []
  },
  {
    id: '7',
    title: 'Musical Nights',
    description: 'Exploring the vibrant world of jazz and neon-lit underground clubs.',
    year: 2022,
    rating: 'TV-PG',
    matchScore: 82,
    quality: '4K',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvp59B6mkme3rOrW9o64a8WMf6UKFj4rbip9-UGdLsM8n72_xEf6bHqhHH0VVUk_7fT-6rYeNe-4Jz6K4heVXFmvi5TM25YOoZbyNzuR0pFj76O5bgRhvXvjO9aha0PjxEKAT27No8fzb63RbicOiUjou7lqdSa0YPEG-XSLOuBm8g-d1h1qqtuXS5GpTmM9QoDKG1CBVZpU4xlQwZUqJUseJNGaPPeUAuOYtsznly3FjC79-Pob42o9lD_KLVwngvPz6a9iiSRPY',
    heroUrl: 'https://picsum.photos/1920/1080?random=14',
    genre: 'Musical',
    category: 'mylist',
    cast: []
  },
  {
    id: '8',
    title: 'Sunset Rider',
    description: 'A classic western tale of revenge and redemption.',
    year: 2021,
    rating: 'R',
    matchScore: 75,
    quality: 'HD',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAacmjlGA7gfKYZEH0aEagjZADmp0iXLjouhI6OIkaGad1jlijP-n6BranXbic36IbDi7Yv6ujJYK3tg-TaIRHVLXNSv79-Z8HVy9YMVC1V8hr60nVP1SLZU59z7VhrKgUWRPjUhpsyO6EaYuABNkveiJc6fDCBptVHj6cha7moaK1U5IVJoRAv2jHx5VEqvN2-oBW_flMomm4b_nwVxq76qljkvnQGoUV05keyLPYhdsgzXNfFDWHtzEo7i1zxX2xv_47ScsT-68',
    heroUrl: 'https://picsum.photos/1920/1080?random=15',
    genre: 'Western',
    category: 'mylist',
    cast: []
  }
];
