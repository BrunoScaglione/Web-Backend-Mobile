from config import keys
from selenium import webdriver
import time

driver = webdriver.Chrome('./chromedriver')
window_before = driver.window_handles[0]

def order(k):
    driver.get(k['bbb_url'])
    driver.find_element_by_xpath('//*[@id="roulette-root"]/div/div[1]/div[4]/div[2]/div').click()
    time.sleep(5)
    # driver.switch_to.active_element
    # driver.switch_to.frame(0)
    window_after = driver.window_handles[1]
    driver.switch_to_window(window_after)
    driver.find_element_by_xpath('//*[@id="login"]').send_keys(k["email"])
    # driver.find_element_by_xpath('/html/body/div[1]/main/div[2]/div/div/div/div[2]/div[1]/form/div[3]/div[1]/input').send_keys(k["senha"])
    # driver.find_element_by_xpath('/html/body/div[1]/main/div[2]/div/div/div/div[2]/div[1]/form/div[6]/button').click()
    # # time.sleep(5)
    # driver.switch_to_default_content()
    # driver.find_element_by_xpath('//*[@id="roulette-root"]/div/div[1]/div[4]/div[2]/div[2]/div/div/div[2]/div/div[2]/img').click()
    # driver.find_element_by_xpath('')

if __name__ == "__main__":
    while True:
        try:
            order(keys)    
            break
        except:    
            pass








    