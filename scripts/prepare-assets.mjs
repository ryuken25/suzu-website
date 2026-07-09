#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const cache = '/root/.hermes/cache/images';
const out = path.join(root, 'public/suzu/portfolio');
const items = [
  ['kappuru-renshuu','img_b1cf40397a5e.jpg'],['ayel-duyung','img_2f1fadb9f53e.jpg'],['comis-michael','img_44f2c8fb2ac5.jpg'],['comis-nicholas','img_b28571699842.jpg'],['kohaku','img_2d010e731e39.jpg'],['komis-camelia','img_541987857c89.jpg'],['komis-hilal-3','img_b5e73ce144d6.jpg'],['tsurukagu','img_2d713491694d.jpg'],['komis-95idenn','img_3a6f38eb139f.jpg'],['komis-hilal','img_b08b6fe9d8e8.jpg'],['komis-homura','img_ebb3f156c5a5.jpg'],['komis-kenshi','img_434b12fb196c.jpg'],['robin-hsr','img_b190265b197f.jpg'],['adventurin','img_218d9466a62f.jpg'],['shemmi','img_2677493c1d24.jpg'],['yuu-jin-tabako','img_cea955c8e32f.jpg'],['yoshushu-to-wanchan','img_00286b010863.jpg'],['suika','img_29edf8dc859b.jpg'],
];
for (const d of ['original','webp','thumb']) fs.mkdirSync(path.join(out,d), {recursive:true});
let count = 0;
for (const [id,file] of items) {
  const src = path.join(cache,file);
  if (!fs.existsSync(src)) { console.warn('missing', file); continue; }
  const orig = path.join(out,'original',file);
  if (!fs.existsSync(orig)) fs.copyFileSync(src, orig);
  await sharp(src).rotate().resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(out,'webp',`${id}.webp`));
  await sharp(src).rotate().resize(620,620,{fit:'cover',position:'attention'}).webp({quality:80}).toFile(path.join(out,'thumb',`${id}.webp`));
  count++;
}
console.log(`Prepared ${count} Suzu portfolio assets`);
