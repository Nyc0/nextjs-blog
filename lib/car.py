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
        return json.dumps(self.tesla_dataJSON, indent=4)
    
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
        # Write the JSON file with a nice formatting
        with open(f'../data/{self.file}.json', 'w', encoding='utf-8') as tesla_file:
            json.dump(self.tesla_dataJSON,tesla_file, ensure_ascii=False, indent=4)

        #If newDataIndicator = False then remove yesterday's data because the data hasn't changed, and save into light file
        if not self.newDataIndicator:
            yesterday = self.today - timedelta(days = 1)
            if self.__canBeDeletedDate(self.tesla_dataJSON, yesterday.strftime("%Y-%m-%d")):
                #print(yesterday.strftime("%Y-%m-%d") + " date can be deleted - TRIM")
                self.__deleteDate(self.tesla_dataJSON, yesterday.strftime("%Y-%m-%d"))

        with open(f'../data/{self.file}-trim.json', 'w', encoding='utf-8') as tesla_file:
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

    #Recursive function to go through the JSON file and delete a specific key (date)
    def __deleteDate(self, jsonElements, date):
        for jsonElement in jsonElements:
            if isinstance(jsonElements[jsonElement], dict):
                jsonElements[jsonElement] = self.__deleteDate(jsonElements[jsonElement], date)
            else: 
                keyList = list(jsonElements.keys())
                if not ((date == keyList[0]) or (date == keyList[len(keyList)-1])):
                    jsonElements.pop(date, None)

                return jsonElements
            
        return jsonElements
    
    #clean up
    ## Get all unique model 'code' key
    ## Order all unique model 'code' key
    ## First date is to be kept
    ## Last date is to be kept
    ## Recusively Check X data against X - 1 
    ## If not X data different from X - 1 delete date 

    def cleanUp(self):
        modelCodeKeyList = []

        for model in self.tesla_dataJSON:
            for code in self.tesla_dataJSON[model]['code']:
                if code not in modelCodeKeyList:
                    modelCodeKeyList.append(code)
        
        modelCodeKeyList.sort()

        i = 2
        nbr = len(modelCodeKeyList) - 1

        while i < nbr:
            incrementBool = True
            #print("Check data from " + modelCodeKeyList[i] + " against " + modelCodeKeyList[i-1])
            if not self.__isNewData(self.tesla_dataJSON, modelCodeKeyList[i], modelCodeKeyList[i-1]):
                if self.__canBeDeletedDate(self.tesla_dataJSON, modelCodeKeyList[i-1]):
                    #print(modelCodeKeyList[i-1] + " date can be deleted - CLEAN UP " + modelCodeKeyList[i])
                    self.__deleteDate(self.tesla_dataJSON, modelCodeKeyList[i-1])
                    modelCodeKeyList.pop(i-1)
                    nbr = len(modelCodeKeyList) - 1
                    incrementBool = False
                    
            else:
                #If the data is new we jump to the follow pair of data to keep the transition
                i += 1
            
            if incrementBool:
                i += 1
        
        with open(f'../data/{self.file}-light.json', 'w', encoding='utf-8') as tesla_file:
            json.dump(self.tesla_dataJSON,tesla_file, ensure_ascii=False, indent=4)
            
    def __isNewData(self, jsonElements, curDate, prevDate):
        result = False
        
        for jsonElement in jsonElements:
            if isinstance(jsonElements[jsonElement], dict):
                result = result or self.__isNewData(jsonElements[jsonElement], curDate, prevDate)

            else: 
                if (curDate in jsonElements) and (prevDate in jsonElements):
                    result = not (jsonElements[curDate] == jsonElements[prevDate])
                    #print("Element is a new value: " + str(result) + " (" + str(jsonElements[curDate]) + " == " + str(jsonElements[prevDate]) + ")")
                else:
                    keyList = list(jsonElements.keys())
                    #If the jsonElements dates starts after the current date then the data set for this model/option hasn't started
                    #If the jsonElements dates ends before the previous date then the data set for this model/option is likely over
                    #In both cases the data should not be considered as new as the data set checked is not started or has ended 
                    if not ((curDate <= keyList[0]) or (keyList[len(keyList)-1] <= prevDate)):
                        result = True

                return result
        
        return result
    
    #Recursive function to go through the JSON file and checked whether the date can be deleted. 
    #If the date is the first or the last element in a dictionary it cannot be deleted 
    def __canBeDeletedDate(self, jsonElements, date):
        result = True

        for jsonElement in jsonElements:
            if isinstance(jsonElements[jsonElement], dict):
                result = result and self.__canBeDeletedDate(jsonElements[jsonElement], date)
            else: 
                keyList = list(jsonElements.keys())
                if (date == keyList[0]) or (date == keyList[len(keyList)-1]):
                    return False

                return True
            
        return result