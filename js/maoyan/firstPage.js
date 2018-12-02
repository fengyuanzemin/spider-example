import superAgent from 'superagent';

superAgent
  .get('http://maoyan.com/board/4')
  .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36')
  .then((res) => {
    console.log(res.text);
  });
