# coding: utf-8

import jieba
from wordcloud import WordCloud


def chinese_jieba(text):
  wordlist_jieba=jieba.cut(text)
  space_wordlist=''.join(wordlist_jieba)
  return space_wordlist

# with open("python/taobao/ipad.txt", encoding="utf-8") as file:
with open("python/wordcloud/article.text", encoding="utf-8") as file:
  text=file.read()
  text=chinese_jieba(text)
  wordcloud = WordCloud(background_color='black',
  font_path="/System/Library/Fonts/PingFang.ttc",
  width=800, height=600, max_words=50).generate(text)
  image = wordcloud.to_image()
  image.show()
