# Imports
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import NoSuchElementException
# import Action chains 
from selenium.webdriver.common.action_chains import ActionChains
# see https://selenium-python.readthedocs.io/locating-elements.html
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import json
import time
import sys
from car import Car

#TODO: Check arguments! 1 = url param, 2 = JSON file name

# Load and scroll the website
## Set up headless browser
opts = Options()
opts.add_argument("--headless")
browser = Firefox(options=opts)

## Get page
URL = f"https://www.tesla.com/{sys.argv[1]}/design#overview"
browser.get(URL)
html_content = browser.page_source

##Wait for the page to load
time.sleep(10)

print(URL +" page is loaded")

## create action chain object
action = ActionChains(browser)

## Scroll to the bottom of the page / div element in order to get all the data loaded
scrollItems = browser.find_elements(By.XPATH,"//*[@class='aside-section side-scroll--item']")
for scrollItem in scrollItems:
  scrollItem.location_once_scrolled_into_view
  time.sleep(1)

print("The page has been scrolled")

# Get model names
soup = BeautifulSoup(html_content, "html.parser")

scripts = soup.findAll('script')
nbr = 0 
script_found = ""
for script in scripts:
  script_text = "".join(script)
  if '"sku":{"trims":' in script_text:
     print("sku trims found in the <script> tag #",nbr)
     script_found = soup.findAll('script')[nbr].string
     
  nbr+=1

data = script_found.split('"sku":{"trims":', 1)[-1].rsplit(',"toggle":[')[0]
dataJSON = json.loads(data)

teslaCar = Car(sys.argv[1], sys.argv[2])

optionList = ["PAINT", "WHEELS", "INTERIOR", "PREMIUM_PACKAGE", "INTERIOR_PACKAGE", "STEERING_WHEEL", "REAR_SEATS"]
typeOptionLabel = ["group--option--label", "group-option_circle-label"]

for modelCode in dataJSON:
    modelName = dataJSON[modelCode]['variant']['name']
    print(teslaCar.name + " (" + modelCode + ") - " + modelName)
    price = 0
    modelAvailable = False

    try:
        priceItem = browser.find_element(By.CSS_SELECTOR, "p[data-id='"+modelCode+"-price']")
        browser.execute_script("document.querySelector(\"p[data-id='"+modelCode+"-price']\").scrollIntoView({behavior: 'smooth', block: 'center'}) ")
        time.sleep(0.5)
        action.click(on_element = priceItem)
        # perform the operation
        action.perform()
        time.sleep(0.5)
        price = priceItem.text.replace('$','').replace(',','')
        modelAvailable = True
    except NoSuchElementException:
        print("Couldn't get the price information for this trim (" + modelName + ")")
    except Exception as exc: 
        print("Something went wrong when getting the price: " + exc)

    teslaCar.addModelData(modelName, modelCode, int(price))

    if modelAvailable:
      for label in typeOptionLabel:
        # Get price of options
        optionIcons = browser.find_elements(By.CLASS_NAME, label)
        
        nbr = 0
        for option in optionIcons:
          # Place the element on screen so it can be clicked
          browser.execute_script("document.getElementsByClassName('" + label + "')[" + str(nbr) + "].scrollIntoView({behavior: 'smooth', block: 'center'}) ")
          time.sleep(0.5)
          
          # click the item
          if option.is_displayed():
            action.click(on_element = option)
            # perform the operation
            action.perform()
            time.sleep(0.5)
            
            optionType = option.get_attribute('for')
            price = '0'

            for optionCat in optionList:
              if optionCat in optionType:
                try:
                  priceStr = browser.find_element(By.CSS_SELECTOR, "p[data-id='"+ optionCat +"-price']").text
                  if priceStr not in 'Included':
                    price = priceStr.replace('$','').replace(',','')
                    
                  teslaCar.addOptionData(modelName, optionCat, option.text, int(price))
                except NoSuchElementException:
                    print("No price information for this option category (" + optionCat + ")")

          else: 
            print("The WebElement is not viewable")

          nbr += 1

      ## Get price of Enhanced autopilot & Full Self-Driving Capability
      pilotList = browser.find_elements(By.XPATH,"//*[@class='text-loader--content tds-text--500 tds-text_color--black formatted-price tds-text--center']")
      nbr = 0
      for pilot in pilotList:
        pilotStr = browser.execute_script("return document.getElementsByClassName('text-loader--content tds-text--500 tds-text_color--black formatted-price tds-text--center')[" + str(nbr) + "].previousSibling.textContent")
        priceStr = pilot.text
        time.sleep(0.5)
        if priceStr not in 'Included':
          price = priceStr.replace('$','').replace(',','')
          
        teslaCar.addOptionData(modelName, "OTHER", pilotStr, int(price))
        
        nbr += 1

      ## TODO: Charging
        ####tds-flex tds-o-flex-nowrap
        ####tds--vertical_padding--small tds-text_color--black tds-text--end tds-text--500 group--options_block-container_price

teslaCar.saveData()

# Exit
browser.close()
quit()
