import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Image from 'next/image';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I am Nicolas Grymonprez. You will find my résumé, blog, interests, and projects.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Résumé</h2>
        <Link href="/cv">Résumé</Link>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul>
          <li><Link href="/nvc">NVC Tracker</Link></li>
          <li>US Tesla trackers:</li>
          <table>
            <tbody>
              <tr>
                <th><Image
                      priority
                      src="/images/flags/us.svg"
                      height={70}
                      width={70}
                      quality={75}
                      alt="US"
                  />
                </th>
                <th><Image
                      priority
                      src="/images/flags/ca.svg"
                      height={70}
                      width={70}
                      quality={75}
                      alt="Canada"
                  />
                </th>
                <th><Image
                      priority
                      src="/images/flags/mx.svg"
                      height={70}
                      width={70}
                      quality={75}
                      alt="Mexico"
                  />
                </th>
                <th><Image
                      priority
                      src="/images/flags/pr.svg"
                      height={70}
                      width={70}
                      quality={75}
                      alt="Puerto Rico"
                  />
                </th>
              </tr>
              <tr>
                <td><Link href="/mds">S</Link></td> 
                <td></td> 
                <td></td> 
                <td></td> 
              </tr>
              <tr>
                <td><Link href="/md3">3</Link></td> 
                <td></td> 
                <td></td> 
                <td></td> 
              </tr>
              <tr>
                <td><Link href="/mdy">Y</Link></td> 
                <td></td> 
                <td></td> 
                <td></td>
              </tr>
            </tbody>
          </table>
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Sailing blog</h2>
        My wife and I adventure on <a href="https://nicoanderica.com/">French Kiss</a> sailing vessel, a 2001 Beneteau Ocean 361 Clipper.
      </section>
    </Layout>
  );
}