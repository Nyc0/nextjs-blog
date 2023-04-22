---
title: 'Sitemap-generation'
date: '2023-04-07'
---

In order to improve the SEO of my blog I looked into the following [Next.js tutorial](https://nextjs.org/learn/seo/introduction-to-seo/importance-of-seo).

This lead me to create a robot.txt and generate sitemap.xml.

The later was complex as the tutorial go through Service Side generation on demand with the getServerSideProps function and using an API. Which was only working when running the Next.js app locally (```npm run dev```). 
I then attempted to modify this example to use the getStaticProps function, but I was only generating HTML content, and I couldn't find any way to create a xml file. 

I found another [tutorial](https://www.technouz.com/5086/how-to-create-a-sitemap-xml-file-for-next-js/) but that was only generating the sitemap.xml from a static table. Since I didn't have an API avialable I tried importing fs to read the posts directory but imports are not allowed in a module. 

However that last tutorial introduced me to postexport functionalities and I decided to create a Python script that generates the sitemap.xml whenever the site gets deployed. 

This is now working! My [sitemap](https://nicolas.grymonprez.com/sitemap.xml)