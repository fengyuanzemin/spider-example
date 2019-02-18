import superAgent from 'superagent';
import fs from 'fs';

const baseUrl = 'https://m.weibo.cn/api/container/getIndex';
let spiderResult = [];

const sleep = time => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, time);
});

const getOnePage = async (page) => {
  try {
    const res = await superAgent.get(`${baseUrl}`)
      .set('Host', 'm.weibo.cn')
      .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
      .set('Referer', 'https://m.weibo.cn/u/3217179555')
      .set('X-Requested-With', 'XMLHttpRequest')
      .query({ type: 'uid' })
      .query({ value: 3217179555 })
      .query({ containerid: 1076033217179555 })
      .query({ page });
    if (res) {
      return JSON.parse(res.text);
    }
    return '';
  } catch (e) {
    return '';
  }
};

const parseOnePage = (json) => {
  if (json) {
    const items = json.data.cards;
    return items.map((item) => {
      const mblog = item.mblog || {};
      return {
        id: mblog.id,
        text: mblog.text,
        attitudes: mblog.attitudes_count,
        comments: mblog.comments_count,
        reposts: mblog.reposts_count
      };
    });
  }
  return [];
};

const main = async (offset = 1) => {
  if (offset === 11) {
    fs.writeFile('./ajax.json', JSON.stringify(spiderResult));
    return;
  }
  const html = await getOnePage(0);
  spiderResult = spiderResult.concat(parseOnePage(html));
  await sleep(1000);
  main((offset + 1));
};

main();
