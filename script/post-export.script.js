const EXTERNAL_DATA_URL = 'https://nicolas.grymonprez.com';

async function generateSiteMap() {    
    const fileNames = fs.readdirSync(postsDirectory);
  
    posts = fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });

    const posts = await request.json();

    console.log(posts);
    console.log(posts.paths);

    xml = `<?xml version="1.0" encoding="UTF-8"?>
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
        ${posts.paths
        .map(({ params }) => {
            return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/posts/${params.id}`}</loc>
        </url>
        `;
        })
        .join('')}
    </urlset>
    `;

    // write the sitemap.xml file
    // directory MUST be `out/`
    fs.writeFile("out/sitemap.xml", xml);
}

// execute the createSitemap() function
generateSiteMap();

module.exports = generateSiteMap;