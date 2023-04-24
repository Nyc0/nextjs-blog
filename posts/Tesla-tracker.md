---
title: 'Tesla tracker'
date: '2023-04-22'
---

Improving on the NVC static webpage scraper that I initially created, I wanted to create a dynamic scraper and display data over time. Since I have a keen interest in what Tesla is doing, I focused on their configuration pages.

Trackers:
- Model S 
- [Model 3](https://nyc0.github.io/nextjs-blog/md3)
- Model X 
- [Model Y](https://nyc0.github.io/nextjs-blog/mdy)

# How do they work?

The pages reliese on two components. 
1. Collect information: a python script using request and selenium loads the web page and browse through the DOM component based on my initial analysis. The script collects the data in a JSON object, which get saved on completion. 
2. Display information: a Next.js page create the static web page based on the JSON file, and Chart.js object. 
In order to review the data more easily, I have included button allowing to filter the charts based on an option prefix (P-, W-. I-, O-).

## Next steps?
- Add seater option data to mdy page
- Use Object programming to define a car and options
- S & X trackers
