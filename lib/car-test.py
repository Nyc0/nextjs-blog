from car import Car

#testCar = Car("Tesla 3", "PERFORMANCE", "$MT317", 52990)
testCar = Car("Tesla Model 3", "md3test")
#print(testCar)
testCar.addModelData("PERFORMANCE", "$MT317", 52990)
testCar.addModelData("PERFORMANCE2", "$MT317", 52990)
testCar.addOptionData("PERFORMANCE2", "AUTOPILOT", "FSD", 5000)
testCar.saveData()
#print(testCar)