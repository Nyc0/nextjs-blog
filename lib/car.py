from datetime import date
from datetime import timedelta
import json
import re

class Car:
    # Class attribute
    today = date.today()

    def __init__(self, name, file):
        self.name = name
        self.file = file
        self.newDataIndicator = False
        
        # Load data
        with open(f'../data/{self.file}.json') as tesla_file:
            tesla_data = tesla_file.read()
        
        self.tesla_dataJSON = json.loads(tesla_data)

    def __str__(self):
        #return f"{self.name} {self.trim} trim (code: {self.code}) is ${self.price} on {self.date}."
        return json.dumps(self.tesla_dataJSON)
    
    def addModelData(self, trim, code, price):
        self.initializeCarJSON(trim)

        if not self.newDataIndicator:
            self.checkModelDiff(trim, code, price)

        self.tesla_dataJSON[trim]['code'][self.today.strftime("%Y-%m-%d")] = code
        self.tesla_dataJSON[trim]['price'][self.today.strftime("%Y-%m-%d")] = price

    def addOptionData(self, trim, optionCat, option, price):        
        #Initiate JSON structure for Options if non existant
        optionStr = re.sub("[^a-zA-Z0-9 ]", "", option,0)
        if optionCat not in self.tesla_dataJSON[trim]['options']:
            self.tesla_dataJSON[trim]['options'][optionCat] = {}
        if optionStr not in self.tesla_dataJSON[trim]['options'][optionCat]:
            self.tesla_dataJSON[trim]['options'][optionCat][optionStr] = {}

        if not self.newDataIndicator:
            self.checkOptionDiff(trim, optionCat, optionStr, price)

        self.tesla_dataJSON[trim]['options'][optionCat][optionStr][self.today.strftime("%Y-%m-%d")] = price

    def initializeCarJSON(self, trim):
        #Initiate JSON structure for Trim if non existant
        if trim not in self.tesla_dataJSON:
            self.tesla_dataJSON[trim] = {}
        if 'code' not in self.tesla_dataJSON[trim]:
            self.tesla_dataJSON[trim]['code'] = {}
        if 'price' not in self.tesla_dataJSON[trim]:
            self.tesla_dataJSON[trim]['price'] = {}
        if 'options' not in self.tesla_dataJSON[trim]:
            self.tesla_dataJSON[trim]['options'] = {}

    def saveData(self):
        #If newDataIndicator = False then remove yesterday's data because the data hasn't changed
        
        # Write the JSON file with a nice formatting
        with open(f'../data/{self.file}.json', 'w', encoding='utf-8') as tesla_file:
            json.dump(self.tesla_dataJSON,tesla_file, ensure_ascii=False, indent=4)

    def checkModelDiff(self, trim, code, price):
        yesterday = self.today - timedelta(days = 1)

        if yesterday.strftime("%Y-%m-%d") not in self.tesla_dataJSON[trim]['code']:
            self.newDataIndicator = True

        if yesterday.strftime("%Y-%m-%d") not in self.tesla_dataJSON[trim]['price']:
            self.newDataIndicator = True

        if not self.newDataIndicator:
            yesterdayCode = self.tesla_dataJSON[trim]['code'][yesterday.strftime("%Y-%m-%d")]
            yesterdayPrice = self.tesla_dataJSON[trim]['price'][yesterday.strftime("%Y-%m-%d")]
            self.newDataIndicator = not ((yesterdayCode == code) & (yesterdayPrice == price))

    def checkOptionDiff(self, trim, optionCat, option, price):
        yesterday = self.today - timedelta(days = 1)

        if yesterday.strftime("%Y-%m-%d") not in self.tesla_dataJSON[trim]['options'][optionCat][option]:
            self.newDataIndicator = True

        if not self.newDataIndicator:
            yesterdayPrice = self.tesla_dataJSON[trim]['options'][optionCat][option][yesterday.strftime("%Y-%m-%d")]
            self.newDataIndicator = not (yesterdayPrice == price)