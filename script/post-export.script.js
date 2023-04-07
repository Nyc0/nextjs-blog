var EXTERNAL_DATA_URL = 'https://nicolas.grymonprez.com';

async function generateSiteMap() {    
    // We make an API call to gather the URLs for our site - API MUST EXIST!
    const request = await fetch(EXTERNAL_DATA_URL + '/api/posts');
    
    console.log(EXTERNAL_DATA_URL + '/api/posts');
    console.log(request);

    const posts = await request.json();

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