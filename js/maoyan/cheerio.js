import superAgent from 'superagent';
import cheerio from 'cheerio';
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
      return res.text;
    }
    return '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

const parseOnePage = (html) => {
  const resultArray = [];
  const $ = cheerio.load(html);

  $('dd').each((i, item) => {
    const $Item = $(item);
    resultArray.push({
      rank: $Item.find('.board-index').text(),
      image: $Item.find('a img[data-src]').attr('data-src'),
      title: $Item.find('.name a').attr('title'),
      actor: $Item.find('.star').text().trim().substring(3)
        .split(','),
      time: $Item.find('.releasetime').text().substring(5),
      score: $Item.find('.score .integer').text() + $Item.find('.score .fraction').text(),
    });
  });
  return resultArray;
};

const main = async (offset = 0) => {
  if (offset === 10) {
    fs.writeFile('./cheerio.json', JSON.stringify(spiderResult));
    return;
  }
  const html = await getOnePage(offset * 10);
  spiderResult = spiderResult.concat(parseOnePage(html));
  await sleep(1000);
  main((offset + 1));
};

main();
