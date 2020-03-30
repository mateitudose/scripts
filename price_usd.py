from selenium import webdriver
import time
driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver")

driver.get('https://www.binance.org/en/trade/MTXLT-286_BNB')

tixlPrice_usd = driver.find_element_by_css_selector('span.FontNumber__Wrapper-sc-71biei-0.gTwFej')
tixlPrice_text = tixlPrice_usd.get_attribute('innerHTML')

print (tixlPrice_text.strip())

driver.quit()