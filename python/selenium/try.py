from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver import ActionChains
import time

browser = webdriver.Chrome()
try:
  # 搜索百度示例
  # browser.get('https://www.baidu.com')
  # input = browser.find_element_by_id('kw')
  # input.send_keys('Python')
  # input.send_keys(Keys.ENTER)
  # wait = WebDriverWait(browser, 10)
  # wait.until(EC.presence_of_element_located((By.ID, 'content_left')))
  # print(browser.current_url)
  # print(browser.get_cookies())
  # print(browser.page_source)

  # 拖拽示例
  browser.get('http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable')
  browser.switch_to.frame('iframeResult')
  source = browser.find_element_by_css_selector('#draggable')
  target = browser.find_element_by_css_selector('#droppable')
  actions = ActionChains(browser)
  actions.drag_and_drop(source, target)
  actions.perform()

  # 知乎滑倒最后示例
  # browser.get('https://www.zhihu.com/explore')
  # browser.execute_script('window.scrollTo(0, document.body.scrollHeight)')
  # browser.execute_script('alert("to bottom")')
finally:
  time.sleep(10)
  browser.close()
