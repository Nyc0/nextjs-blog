#import requests
from curl_cffi import requests
#import cloudscraper
from bs4 import BeautifulSoup
import re
import datetime
import json
import os

#TODO: Test connectivity
#Retrieve NVC static web page to get processing timeframe
URL = "https://travel.state.gov/content/travel/en/us-visas/immigrate/nvc-timeframes.html"
#page = requests.get(URL, impersonate="chrome") #with requests 

# 1. Sign up for a free ScraperAPI account to get an API Key
SCRAPER_API_KEY = os.environ.get("MY_SCRAPER_KEY")
TARGET_URL = "https://travel.state.gov/content/travel/en/us-visas/immigrate/nvc-timeframes.html"

# 2. Route your request through their API endpoint
URL = f"http://scraperapi.com?api_key={SCRAPER_API_KEY}&url={TARGET_URL}"

# 3. Use a curl_cffi Session to handle cookies/headers and impersonate a modern browser
with requests.Session() as session:
    # 'chrome' acts as your TLS-impersonate profile (simulating standard chrome fingerprints)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1"
    }
    page = session.get(URL, impersonate="chrome", headers=headers)
    # === SCRAPING DIAGNOSTIC LOGS ===
    print("=" * 50)
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] HTML Inspection")
    print(f"HTTP Status:  {page.status_code}")
    print(f"HTML Length:  {len(page.content)} bytes")
    # 2. Check if the exact target class string even exists in the raw text
    class_target_1 = "tsg-rwd-featurebox"
    class_target_2 = "tsg_rwd_feature_box_single"
    print("\n--- Class Target Presence Check ---")
    print(f"Does '{class_target_1}' exist in HTML?: {class_target_1 in page.text}")
    print(f"Does '{class_target_2}' exist in HTML?: {class_target_2 in page.text}")

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
print(f"\nTotal elements matched for loop: {len(test_results)}")
print("=" * 50)


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

    # === GITHUB ACTIONS LOGGING BLOCK ===
    print("=" * 50)
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Dates identified")
    print(f"date_as:    {date_as}")
    print(f"date_from:     {date_from}")
    print(f"nbrOfDays:   {nbrOfDays}")
    print(f"date_as_format:  {date_as_format}")
    print("=" * 50)
    
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
