#import requests
from curl_cffi import requests
#import cloudscraper
from bs4 import BeautifulSoup
import re
import datetime
import json

#TODO: Test connectivity
#Retrieve NVC static web page to get processing timeframe
URL = "https://travel.state.gov/content/travel/en/us-visas/immigrate/nvc-timeframes.html"
#page = requests.get(URL, impersonate="chrome") #with requests 

# 2. Use a curl_cffi Session to handle cookies/headers and impersonate a modern browser
with requests.Session() as session:
    # 'chrome' acts as your TLS-impersonate profile (simulating standard chrome fingerprints)
    page = session.get(URL, impersonate="chrome")

# === GITHUB ACTIONS LOGGING BLOCK ===
print("=" * 50)
print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] HTTP Request Dispatched")
print(f"Target URL:    {URL}")
print(f"Final URL:     {page.url} (Checked for redirects)")
print(f"Status Code:   {page.status_code}")
print(f"Content Size:  {len(page.content)} bytes")
print("=" * 50)

# Check if the page was blocked or retrieved successfully
if page.status_code == 200:
    print("✅ SUCCESS: Web page successfully retrieved.")
elif page.status_code == 403:
    print("❌ FAILURE: Cloudflare Blocked the Request (403 Forbidden).")
else:
    print(f"⚠️ WARNING: Unexpected Status Code received ({page.status_code}).")
# ====================================

# Create a cloudscraper instance
#scraper = cloudscraper.create_scraper(
#    browser={
#        'browser': 'chrome',
#        'platform': 'windows',
#        'desktop': True
#    }
#)
#page = scraper.get(URL)

#Retrieve specific class_ elements of the DOM
soup = BeautifulSoup(page.content, "html.parser")
results = soup.find_all(class_="tsg-rwd-featurebox tsg_rwd_feature_box_single")

#Dictionary to transfor three character months into numbers 
months = {'Jan' : 1, 'Feb' : 2, 'Mar' : 3, 'Apr' : 4, 'May' : 5, 'Jun' : 6, 'Jul' : 7, 'Aug' : 8, 'Sep' : 9, 'Oct' : 10, 'Nov' : 11, 'Dec' : 12}  

#Load JSON file
with open('../data/nvc.json') as nvc_file:
  nvc_contents = nvc_file.read()
  
parsed_nvc_json = json.loads(nvc_contents)

#Retrieve the first b elements of each results
for result in results:
    description_element = result.find("b")
    
    #Extract dates based on d or dd-mmm-yy format
    dates = re.findall("(\d{1,2}-\w{3}-\d{2})", description_element.text.strip())

    #TODO: Add a check to ensure that 2 dates have been found

    date_as = dates[0].split('-')
    date_as = datetime.datetime(2000+int(date_as[2]),months[date_as[1]],int(date_as[0]))
    date_from = dates[1].split('-')
    date_from = datetime.datetime(2000+int(date_from[2]),months[date_from[1]],int(date_from[0]))
    nbrOfDays = date_as - date_from

    date_as_format = date_as.strftime("%Y-%m-%d")

    #Update JSON file
    if "creation" in description_element.text.strip().lower():
        if parsed_nvc_json['creation'].get(date_as_format) is None:
            parsed_nvc_json['creation'][date_as_format] = nbrOfDays.days
    elif "review" in description_element.text.strip().lower():
        if parsed_nvc_json['review'].get(date_as_format) is None:
            parsed_nvc_json['review'][date_as_format] = nbrOfDays.days
    elif "inquiries" in description_element.text.strip().lower():
        if parsed_nvc_json['inquiry'].get(date_as_format) is None: 
            parsed_nvc_json['inquiry'][date_as_format] = nbrOfDays.days

#Write the JSON file with a nice formatting
with open('../data/nvc.json', 'w', encoding='utf-8') as nvc_file:
  json.dump(parsed_nvc_json,nvc_file, ensure_ascii=False, indent=4)
