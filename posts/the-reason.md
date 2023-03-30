---
title: 'The reason behind this blog'
date: '2023-03-29'
---

Before leaving Cerner in September 2023, I was managing initiatives within our team. One of them was to replace our OneNote pages by a wiki / knowledge repository. We looked at multiple frameworks and ended up using **Hugo** as this was used within other organisations and it already had support. Setting one repositery up was complex, but I was hooked on trying it myself. 

This project restarted after seeing [visawhen.com](https://visawhen.com/nvc). I wanted to create something similar, and maybe become a template for anyone wanting to track data freely available online. 

My first step was to create this blog using **Next.js** and this [tutorial](https://nextjs.org/learn). I wanted to host this blog on **Github** and using **Github actions** to publish the static pages. I used the [following post](https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/) to achieve it and be able to test a CI/CD workflow.

My next steps will be:
- Create a new page (Resume, Visa data), and menu
- Create a cronjob extracting data similar to visawhen
- Display the information
- Create a scheduled workflow to re-deploy the static pages