
export type PortfolioCategory = 'chibi' | 'normal' | 'couple' | 'collab-ready';

export type PortfolioItem = {
  id: string;
  title: string;
  file: string;
  thumb: string;
  originalFile: string;
  categories: PortfolioCategory[];
  year?: string;
  tags: string[];
  featured?: boolean;
  alt: string;
};

export const portfolio: PortfolioItem[] = [
  { id:'kappuru-renshuu', title:'Couple Practice', originalFile:'img_b1cf40397a5e.jpg', file:'/suzu/portfolio/webp/kappuru-renshuu.webp', thumb:'/suzu/portfolio/thumb/kappuru-renshuu.webp', categories:['normal','couple'], tags:['anime','couple','soft expression'], featured:true, alt:'Soft anime couple illustration by Pesona Suzu' },
  { id:'ayel-duyung', title:'Taiyaki Chibi', originalFile:'img_2f1fadb9f53e.jpg', file:'/suzu/portfolio/webp/ayel-duyung.webp', thumb:'/suzu/portfolio/thumb/ayel-duyung.webp', categories:['chibi','collab-ready'], tags:['chibi','mascot','cute icon'], alt:'Cute chibi riding taiyaki fish by Pesona Suzu' },
  { id:'comis-michael', title:'Michael Chibi', originalFile:'img_44f2c8fb2ac5.jpg', file:'/suzu/portfolio/webp/comis-michael.webp', thumb:'/suzu/portfolio/thumb/comis-michael.webp', categories:['chibi'], tags:['chibi','commission','standing pose'], alt:'Purple hair chibi commission by Pesona Suzu' },
  { id:'comis-nicholas', title:'Nicholas Chibi', originalFile:'img_b28571699842.jpg', file:'/suzu/portfolio/webp/comis-nicholas.webp', thumb:'/suzu/portfolio/thumb/comis-nicholas.webp', categories:['chibi'], tags:['chibi','commission','simple character'], alt:'Blond chibi character commission by Pesona Suzu' },
  { id:'kohaku', title:'Kohaku Chibi', originalFile:'img_2d010e731e39.jpg', file:'/suzu/portfolio/webp/kohaku.webp', thumb:'/suzu/portfolio/thumb/kohaku.webp', categories:['chibi'], tags:['chibi','profile icon','cute'], alt:'Green-haired school chibi by Pesona Suzu' },
  { id:'komis-camelia', title:'Camelia Chibi', originalFile:'img_541987857c89.jpg', file:'/suzu/portfolio/webp/komis-camelia.webp', thumb:'/suzu/portfolio/thumb/komis-camelia.webp', categories:['chibi'], tags:['chibi','commission','school outfit'], alt:'Red-haired school chibi by Pesona Suzu' },
  { id:'komis-hilal-3', title:'Soft Gothic Chibi', originalFile:'img_b5e73ce144d6.jpg', file:'/suzu/portfolio/webp/komis-hilal-3.webp', thumb:'/suzu/portfolio/thumb/komis-hilal-3.webp', categories:['chibi'], tags:['chibi','gothic','cute'], alt:'Soft gothic chibi commission by Pesona Suzu' },
  { id:'tsurukagu', title:'Tiny Pair Chibi', originalFile:'img_2d713491694d.jpg', file:'/suzu/portfolio/webp/tsurukagu.webp', thumb:'/suzu/portfolio/thumb/tsurukagu.webp', categories:['chibi','couple'], tags:['chibi','pair','gift art'], alt:'Tiny pair chibi gift art by Pesona Suzu' },
  { id:'komis-95idenn', title:'Mini Chibi Commission', originalFile:'img_3a6f38eb139f.jpg', file:'/suzu/portfolio/webp/komis-95idenn.webp', thumb:'/suzu/portfolio/thumb/komis-95idenn.webp', categories:['chibi'], tags:['chibi','mini character'], alt:'Mini chibi commission by Pesona Suzu' },
  { id:'komis-hilal', title:'Black Outfit Character', originalFile:'img_b08b6fe9d8e8.jpg', file:'/suzu/portfolio/webp/komis-hilal.webp', thumb:'/suzu/portfolio/thumb/komis-hilal.webp', categories:['normal'], tags:['anime','full body','commission'], alt:'Black outfit anime character by Pesona Suzu' },
  { id:'komis-homura', title:'Angel Bride Portrait', originalFile:'img_ebb3f156c5a5.jpg', file:'/suzu/portfolio/webp/komis-homura.webp', thumb:'/suzu/portfolio/thumb/komis-homura.webp', categories:['normal'], tags:['anime','portrait','soft fantasy'], featured:true, alt:'Soft fantasy angel bride portrait by Pesona Suzu' },
  { id:'komis-kenshi', title:'Red Overall Character', originalFile:'img_434b12fb196c.jpg', file:'/suzu/portfolio/webp/komis-kenshi.webp', thumb:'/suzu/portfolio/thumb/komis-kenshi.webp', categories:['normal'], tags:['anime','male character','commission'], alt:'Red overall male character commission by Pesona Suzu' },
  { id:'robin-hsr', title:'Blue Stage Character', originalFile:'img_b190265b197f.jpg', file:'/suzu/portfolio/webp/robin-hsr.webp', thumb:'/suzu/portfolio/thumb/robin-hsr.webp', categories:['normal','collab-ready'], tags:['anime','fan art mood','character showcase'], alt:'Blue stage anime character by Pesona Suzu' },
  { id:'adventurin', title:'Elegant Character Portrait', originalFile:'img_218d9466a62f.jpg', file:'/suzu/portfolio/webp/adventurin.webp', thumb:'/suzu/portfolio/thumb/adventurin.webp', categories:['normal'], tags:['anime','portrait','character art'], featured:true, alt:'Elegant anime character portrait by Pesona Suzu' },
  { id:'shemmi', title:'Pastel Pink Portrait', originalFile:'img_2677493c1d24.jpg', file:'/suzu/portfolio/webp/shemmi.webp', thumb:'/suzu/portfolio/thumb/shemmi.webp', categories:['normal'], tags:['anime','soft pastel','portrait'], featured:true, alt:'Pastel pink anime portrait by Pesona Suzu' },
  { id:'yuu-jin-tabako', title:'Moody Pair Illustration', originalFile:'img_cea955c8e32f.jpg', file:'/suzu/portfolio/webp/yuu-jin-tabako.webp', thumb:'/suzu/portfolio/thumb/yuu-jin-tabako.webp', categories:['normal','couple'], tags:['anime','pair','moody color'], alt:'Moody pair illustration by Pesona Suzu' },
  { id:'yoshushu-to-wanchan', title:'Character With Dog', originalFile:'img_00286b010863.jpg', file:'/suzu/portfolio/webp/yoshushu-to-wanchan.webp', thumb:'/suzu/portfolio/thumb/yoshushu-to-wanchan.webp', categories:['normal','collab-ready'], tags:['anime','pet','soft scene'], alt:'Anime character with dog by Pesona Suzu' },
  { id:'suika', title:'Casual Character Pose', originalFile:'img_29edf8dc859b.jpg', file:'/suzu/portfolio/webp/suika.webp', thumb:'/suzu/portfolio/thumb/suika.webp', categories:['normal'], tags:['anime','casual','half body'], alt:'Casual anime character pose by Pesona Suzu' },
];

export const portfolioTabs: { id: 'all' | PortfolioCategory; label: string }[] = [
  { id:'all', label:'All' }, { id:'chibi', label:'Chibi' }, { id:'normal', label:'Normal / Anime' }, { id:'couple', label:'Couple / Pair' }, { id:'collab-ready', label:'Collab-ready' },
];
