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
  { id:'kappuru-renshuu', title:"Couple Practice", originalFile:"img_2dd22914c044.jpg", file:'/suzu/portfolio/webp/kappuru-renshuu.webp', thumb:'/suzu/portfolio/thumb/kappuru-renshuu.webp', categories:["normal", "couple"], tags:["anime", "couple", "soft expression"], featured:true, alt:"Soft anime couple illustration by Suzu Art Studio" },
  { id:'yuu-jin-tabako', title:"Moody Pair Illustration", originalFile:"img_541a551889d5.jpg", file:'/suzu/portfolio/webp/yuu-jin-tabako.webp', thumb:'/suzu/portfolio/thumb/yuu-jin-tabako.webp', categories:["normal", "couple"], tags:["anime", "pair", "moody color"], alt:"Moody pair illustration by Suzu Art Studio" },
  { id:'tsurukagu', title:"Tiny Pair Chibi", originalFile:"img_8b5a85643224.jpg", file:'/suzu/portfolio/webp/tsurukagu.webp', thumb:'/suzu/portfolio/thumb/tsurukagu.webp', categories:["chibi", "couple"], tags:["chibi", "pair", "gift art"], alt:"Tiny pair chibi gift art by Suzu Art Studio" },
  { id:'ayel-duyung', title:"Taiyaki Chibi", originalFile:"img_35a4749ce35d.jpg", file:'/suzu/portfolio/webp/ayel-duyung.webp', thumb:'/suzu/portfolio/thumb/ayel-duyung.webp', categories:["chibi", "collab-ready"], tags:["chibi", "mascot", "cute icon"], alt:"Cute chibi riding taiyaki by Suzu Art Studio" },
  { id:'comis-michael', title:"Michael Chibi", originalFile:"img_bc69fdea7d40.jpg", file:'/suzu/portfolio/webp/comis-michael.webp', thumb:'/suzu/portfolio/thumb/comis-michael.webp', categories:["chibi"], tags:["chibi", "commission", "standing pose"], alt:"Pink-haired chibi commission by Suzu Art Studio" },
  { id:'comis-nicholas', title:"Nicholas Chibi", originalFile:"img_66b6431aa4c6.jpg", file:'/suzu/portfolio/webp/comis-nicholas.webp', thumb:'/suzu/portfolio/thumb/comis-nicholas.webp', categories:["chibi"], tags:["chibi", "commission", "simple character"], alt:"Blond chibi character commission by Suzu Art Studio" },
  { id:'kohaku', title:"Kohaku Chibi", originalFile:"img_7172bab78b78.jpg", file:'/suzu/portfolio/webp/kohaku.webp', thumb:'/suzu/portfolio/thumb/kohaku.webp', categories:["chibi"], tags:["chibi", "profile icon", "cute"], alt:"Green-haired school chibi by Suzu Art Studio" },
  { id:'komis-camelia', title:"Camelia Chibi", originalFile:"img_a8ac7f359aea.jpg", file:'/suzu/portfolio/webp/komis-camelia.webp', thumb:'/suzu/portfolio/thumb/komis-camelia.webp', categories:["chibi"], tags:["chibi", "commission", "school outfit"], alt:"Red-haired school chibi by Suzu Art Studio" },
  { id:'komis-hilal-3', title:"Soft Gothic Chibi", originalFile:"img_6f0f012f644a.jpg", file:'/suzu/portfolio/webp/komis-hilal-3.webp', thumb:'/suzu/portfolio/thumb/komis-hilal-3.webp', categories:["chibi"], tags:["chibi", "gothic", "cute"], alt:"Soft gothic chibi by Suzu Art Studio" },
  { id:'komis-95idenn', title:"Mini Chibi Commission", originalFile:"img_9148daf20ea8.jpg", file:'/suzu/portfolio/webp/komis-95idenn.webp', thumb:'/suzu/portfolio/thumb/komis-95idenn.webp', categories:["chibi"], tags:["chibi", "mini character"], alt:"Mini chibi commission by Suzu Art Studio" },
  { id:'komis-hilal', title:"Black Outfit Character", originalFile:"img_5ec7b58d3fea.jpg", file:'/suzu/portfolio/webp/komis-hilal.webp', thumb:'/suzu/portfolio/thumb/komis-hilal.webp', categories:["normal"], tags:["anime", "full body", "commission"], alt:"Black outfit anime character by Suzu Art Studio" },
  { id:'komis-homura', title:"Angel Bride Portrait", originalFile:"img_6b4a1fd2cf25.jpg", file:'/suzu/portfolio/webp/komis-homura.webp', thumb:'/suzu/portfolio/thumb/komis-homura.webp', categories:["normal"], tags:["anime", "portrait", "soft fantasy"], featured:true, alt:"Soft fantasy angel bride portrait by Suzu Art Studio" },
  { id:'komis-kenshi', title:"Red Overall Character", originalFile:"img_01de7537971a.jpg", file:'/suzu/portfolio/webp/komis-kenshi.webp', thumb:'/suzu/portfolio/thumb/komis-kenshi.webp', categories:["normal"], tags:["anime", "male character", "commission"], alt:"Red overall male character by Suzu Art Studio" },
  { id:'robin-hsr', title:"Blue Stage Character", originalFile:"img_bcf13e626c50.jpg", file:'/suzu/portfolio/webp/robin-hsr.webp', thumb:'/suzu/portfolio/thumb/robin-hsr.webp', categories:["normal", "collab-ready"], tags:["anime", "fan art mood", "character showcase"], alt:"Blue stage anime character by Suzu Art Studio" },
  { id:'adventurin', title:"Elegant Character Portrait", originalFile:"img_be711e71e065.jpg", file:'/suzu/portfolio/webp/adventurin.webp', thumb:'/suzu/portfolio/thumb/adventurin.webp', categories:["normal"], tags:["anime", "portrait", "character art"], featured:true, alt:"Elegant anime character portrait by Suzu Art Studio" },
  { id:'shemmi', title:"Pastel Pink Portrait", originalFile:"img_b3b10fc8a6ac.jpg", file:'/suzu/portfolio/webp/shemmi.webp', thumb:'/suzu/portfolio/thumb/shemmi.webp', categories:["normal"], tags:["anime", "soft pastel", "portrait"], featured:true, alt:"Pastel pink anime portrait by Suzu Art Studio" },
  { id:'yoshushu-to-wanchan', title:"Character With Dog", originalFile:"img_a8b7257d8907.jpg", file:'/suzu/portfolio/webp/yoshushu-to-wanchan.webp', thumb:'/suzu/portfolio/thumb/yoshushu-to-wanchan.webp', categories:["normal", "collab-ready"], tags:["anime", "pet", "soft scene"], alt:"Anime character with dog by Suzu Art Studio" },
  { id:'suika', title:"Casual Character Pose", originalFile:"img_a5a7cae2e5e1.jpg", file:'/suzu/portfolio/webp/suika.webp', thumb:'/suzu/portfolio/thumb/suika.webp', categories:["normal"], tags:["anime", "casual", "half body"], alt:"Casual anime character pose by Suzu Art Studio" },
];

export const portfolioTabs: { id: 'all' | PortfolioCategory; label: string }[] = [
  { id:'all', label:'All' }, { id:'chibi', label:'Chibi' }, { id:'normal', label:'Normal / Anime' }, { id:'couple', label:'Couple / Pair' }, { id:'collab-ready', label:'Collab-ready' },
];
