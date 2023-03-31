import requests
from bs4 import BeautifulSoup

URL = "https://www.tesla.com/model3/design#overview"
page = requests.get(URL)

print(page.text)

#soup = BeautifulSoup(page.content, "html.parser")
#results = soup.find(id="$MT322-Model 3")
#print(results.prettify())

