import superAgent from 'superagent';
import fs from 'fs';

superAgent
  .get('http://maoyan.com/board/4')
  .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36')
  .then((res) => {
    // const resultArray = [];
    console.log(res.text);
    // const html = res.text;
    // const html = res.text.split('\n').join(' ');
    // const reg = /<dd>.*?board-index.*?>(\d+)<\/i>.*?data-src="(.*?)".*?name"><a.*?>(.*?)<\/a>.*?star">(.*?)<\/p>.*?releasetime">(.*?)<\/p>.*?integer">(.*?)<\/i>.*?fraction">(.*?)<\/i>.*?<\/dd>/g;
    // const result = reg.exec(html);
    // const [, rank, image, title, actor, time, scorePre, score] = result;
    // const json = {
    //   rank,
    //   image,
    //   title,
    //   actor: actor.trim().substring(3).split(','),
    //   time: time.substring(5),
    //   score: scorePre + score,
    // };
    // console.log(json);
    // fs.writeFile('./firstPage.json', JSON.stringify(json));
  });
