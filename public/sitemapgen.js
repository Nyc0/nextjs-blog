//pages/sitemap.xml.js
/*
var EXTERNAL_DATA_URL = 'https://nicolas.grymonprez.com';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
     ${posts
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
}

function SiteMapGen(props) {
  // getServerSideProps would do the heavy lifting if a server was available
}


export async function getServerSideProps({ res }) {
  const env = process.env.NODE_ENV
  if(env == "development"){
    EXTERNAL_DATA_URL = 'http://localhost:3000';
  }

  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL + '/api/posts');
  const posts = await request.json();
  
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts.paths);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMapGen;
*/