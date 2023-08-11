import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import cvStyles from '../styles/cv.module.css';
import Link from 'next/link';

const name = 'Nicolas Grymonprez';
export const siteTitle = 'Nicolas Grymonprez Next.js website';

export default function Layout({ children, home, cv }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={cv ? styles.headercv : styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              quality={75}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          cv ? (
            <>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Link href="/">
                        <Image
                          priority
                          src="/images/profile.jpg"
                          className={utilStyles.borderCircle}
                          height={108}
                          width={108}
                          quality={75}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>
                      <div className={cvStyles.cvTitle}>
                        {name}<br/>
                        📍 United States<br/>
                        📞: (816) 886-8893<br/>
                        📧: <a href="mailto:nicolas.grymonprez@gmail.com">nicolas.grymonprez@gmail.com</a><br/>
                        🌐: French, British 🗣:French, English<br/>                        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  quality={75}
                  alt=""
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {name}
                </Link>
              </h2>
            </>
          ))
        }
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}