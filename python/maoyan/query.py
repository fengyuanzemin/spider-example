import json
import time

import requests
from pyquery import PyQuery as pq
from requests.exceptions import RequestException

def get_one_page(url):
  try:
    headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
      return response.text
    return None
  except RequestException:
    return None


def parse_one_page(html):
  doc = pq(html)
  items = doc('dd').items()
  for item in items:
    yield {
      'index': item.find('.board-index').text(),
      'image': item.find('a img[data-src]').attr('data-src'),
      'title': item.find('.name a').attr('title'),
      'actor': item.find('.star').text().strip()[3:],
      'time': item.find('.releasetime').text().strip()[5:],
      'score': item.find('.score .integer').text() + item.find('.score .fraction').text()
    }


def write_to_file(content):
  with open('./query.text', 'a', encoding='utf-8') as f:
    f.write(json.dumps(content, ensure_ascii=False) + '\n')


def main(offset):
  url = 'http://maoyan.com/board/4?offset=' + str(offset)
  html = get_one_page(url)
  for item in parse_one_page(html):
    write_to_file(item)


if __name__ == '__main__':
  for i in range(10):
    main(offset=i * 10)
    time.sleep(2)
