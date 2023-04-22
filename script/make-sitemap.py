import os

url = 'https://nicolas.grymonprez.com/posts/'

xml = '''<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
        <loc>https://nicolas.grymonprez.com</loc>
        </url>
        <url>
        <loc>https://nicolas.grymonprez.com/cv</loc>
        </url>
        <url>
        <loc>https://nicolas.grymonprez.com/nvc</loc>
        </url>
        <url>
        <loc>https://nicolas.grymonprez.com/md3</loc>
        </url>
        <url>
        <loc>https://nicolas.grymonprez.com/mdy</loc>
        </url>
        '''

for file in os.listdir("posts"):
    if file.endswith(".md"):
        xml += '''<url>
        <loc>''' + url + '' + file.replace(".md","") + '''</loc>
        </url>
        '''

xml += '</urlset>'

#Write the xml file with a nice formatting
with open('out/sitemap.xml', 'w', encoding='utf-8') as sitemap_file:
  sitemap_file.write(xml)
  sitemap_file.close