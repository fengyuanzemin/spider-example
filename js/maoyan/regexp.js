import superAgent from 'superagent';
import fs from 'fs';

let spiderResult = [];
const sleep = time => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, time);
});

const getOnePage = async (offset) => {
  try {
    const res = await superAgent
      .get('http://maoyan.com/board/4')
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36')
      .query({ offset });
    if (res) {
      return res.text.split('\n').join(' ');
    }
    return '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

const parseOnePage = (html) => {
  const resultArray = [];
  const reg = /<dd>.*?board-index.*?>(\d+)<\/i>.*?data-src="(.*?)".*?name"><a.*?>(.*?)<\/a>.*?star">(.*?)<\/p>.*?releasetime">(.*?)<\/p>.*?integer">(.*?)<\/i>.*?fraction">(.*?)<\/i>.*?<\/dd>/g;
  const exec = (result) => {
    if (result) {
      const [, rank, image, title, actor, time, scorePre, score] = result;
      resultArray.push({
        rank,
        image,
        title,
        actor: actor.trim().substring(3).split(','),
        time: time.substring(5),
        score: scorePre + score,
      });
      exec(reg.exec(html));
    }
  };
  exec(reg.exec(html));
  return resultArray;
};

const main = async (offset = 0) => {
  if (offset === 10) {
    fs.writeFile('./regexp.json', JSON.stringify(spiderResult));
    return;
  }
  const html = await getOnePage(offset * 10);
  spiderResult = spiderResult.concat(parseOnePage(html));
  await sleep(1000);
  main((offset + 1));
};

main();
