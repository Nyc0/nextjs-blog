from car import Car

teslaCar = Car("ModelS", "mds")
teslaCar = Car("Model3", "md3")
teslaCar = Car("ModelX", "mdx")
teslaCar = Car("ModelY", "mdy")

teslaCar.saveData()

#Clean up the entire data. TODO: Potential issue with amount of time required
teslaCar.cleanUp()