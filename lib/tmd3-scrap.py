# Imports
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import NoSuchElementException
# import Action chains 
from selenium.webdriver.common.action_chains import ActionChains
# see https://selenium-python.readthedocs.io/locating-elements.html
from selenium.webdriver.common.by import By
import requests
from bs4 import BeautifulSoup
import json
import time
from car import Car

# Set up headless browser
opts = Options()
opts.add_argument("--headless")
browser = Firefox(options=opts)

# Get page
URL = "https://www.tesla.com/model3/design#overview"
browser.get(URL)
#Wait for the page to load
time.sleep(10)

print("Website loaded")

# create action chain object
action = ActionChains(browser)

#Scroll to the bottom of the page / div element in order to get all the data loaded
scrollItems = browser.find_elements(By.XPATH,"//*[@class='aside-section side-scroll--item']")
for scrollItem in scrollItems:
  scrollItem.location_once_scrolled_into_view
  time.sleep(1)

print("Website scrolled")

# Get model names
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")
#Script containing "dataJson" is located in the first table element. 
#TODO: Add code to locate which element dataJson is stored (in keyword)
script = soup.findAll('script')[0].string
data = script.split('"sku":{"trims":', 1)[-1].rsplit(',"toggle":[')[0]
dataJSON = json.loads(data)

# Load JSON file
# with open('../data/md3.json') as md3_file:
#   md3_data = md3_file.read()
  
# md3_dataJSON = json.loads(md3_data)

# today = date.today()
# todayStr = today.strftime("%Y-%m-%d")

teslaCar = Car("Tesla Model 3", "md3")

optionList = ["PAINT", "WHEELS", "INTERIOR"]

for modelCode in dataJSON:
    modelName = dataJSON[modelCode]['variant']['name']
    print(modelCode + " - " + modelName)
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

    #Initiate JSON structure if non existant
    # if modelName not in md3_dataJSON:
    #   md3_dataJSON[modelName] = {}
    # if 'code' not in md3_dataJSON[modelName]:
    #   md3_dataJSON[modelName]['code'] = {}
    # if 'price' not in md3_dataJSON[modelName]:
    #   md3_dataJSON[modelName]['price'] = {}
    # if 'options' not in md3_dataJSON[modelName]:
    #   md3_dataJSON[modelName]['options'] = {}

    #Update JSON
    # md3_dataJSON[modelName]['code'][todayStr] = modelCode
    # md3_dataJSON[modelName]['price'][todayStr] = int(price)

    teslaCar.addModelData(modelName, modelCode, int(price))

    if modelAvailable:
      # Get price of options
      optionIcons = browser.find_elements(By.CLASS_NAME,'group--option--label')
      
      nbr = 0
      for option in optionIcons:
        # Place the element on screen so it can be clicked
        browser.execute_script("document.getElementsByClassName('group--option--label')[" + str(nbr) + "].scrollIntoView({behavior: 'smooth', block: 'center'}) ")
        time.sleep(0.5)
        # click the item
        if option.is_displayed:
          action.click(on_element = option)
          # perform the operation
          action.perform()
          time.sleep(0.5)
          
          optionType = option.get_attribute('for')
          price = '0'

          for optionItem in optionList:
            if optionItem in optionType:
              try:
                priceStr = browser.find_element(By.CSS_SELECTOR, "p[data-id='"+ optionItem +"-price']").text
                if priceStr not in 'Included':
                  price = priceStr.replace('$','').replace(',','')
                # optionStr = re.sub("[^a-zA-Z0-9 ]", "", option.text,0)
                # if optionItem not in md3_dataJSON[modelName]['options']:
                #   md3_dataJSON[modelName]['options'][optionItem] = {}
                # if optionStr not in md3_dataJSON[modelName]['options'][optionItem]:
                #   md3_dataJSON[modelName]['options'][optionItem][optionStr] = {}
                # md3_dataJSON[modelName]['options'][optionItem][optionStr][todayStr] = int(price)
                teslaCar.addOptionData(modelName, optionItem, option.text, int(price))
              except NoSuchElementException:
                  print("No price information for this option")

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
        # if "AUTOPILOT" not in md3_dataJSON[modelName]['options']:
        #   md3_dataJSON[modelName]['options']["AUTOPILOT"] = {}
        # if pilotStr not in md3_dataJSON[modelName]['options']["AUTOPILOT"]:
        #   md3_dataJSON[modelName]['options']["AUTOPILOT"][pilotStr] = {}
        # md3_dataJSON[modelName]['options']["AUTOPILOT"][pilotStr][todayStr] = int(price)
        teslaCar.addOptionData(modelName, "AUTOPILOT", pilotStr, int(price))
        nbr += 1

      ## TODO: Charging
        ####tds-flex tds-o-flex-nowrap
        ####tds--vertical_padding--small tds-text_color--black tds-text--end tds-text--500 group--options_block-container_price

# Write the JSON file with a nice formatting
# with open('../data/md3.json', 'w', encoding='utf-8') as md3_file:
#   json.dump(md3_dataJSON,md3_file, ensure_ascii=False, indent=4)

teslaCar.saveData()

# Exit
browser.close()
quit()
