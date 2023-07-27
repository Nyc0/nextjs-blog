import Layout from '/components/layout';
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import cvStyles from '../styles/cv.module.css';

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), '/data/cv/resume.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}

export default function Cv(props) {
    const jobs = props.work;
    const skills = props.skills;
    const educations = props.education;
    const languages = props.languages;
    const interests = props.interests;

    return (
        <Layout cv>
            <Head>
                <title>Resume</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>Résumé</h1>
                <h2 className={utilStyles.headingXl}>About</h2>
                <div className={cvStyles.sumText}>
                    <p>Hello, I am Nicolas Grymonprez. Achiever, Relator, Analytical are the strengths that describe me the best. Every day starts at zero and something tangible needs to have been accomplished by the end. During my 10 years tenure at Oracle Health (Previously Cerner Corporation) I have continuously demonstrated it through my progression within the organization, leading major projects, improving workflows, coaching, providing feedback, leading initiatives, developing documentations, becoming an internal instructor in Cerner Command Language.
                    <br/><br/>
                    Outside of work I enjoy sailing, photography, and learning (this blog)</p>
                </div>
                
                <h2 className={utilStyles.headingXl}>Experience</h2>
                <div className={utilStyles.lightText}>
                    {jobs.map((job, i) =>
                        <table key={"job"+i} className={utilStyles.table}>
                            <tbody>
                                <tr>
                                    <td className={utilStyles.logo}>
                                        <Image
                                            priority
                                            src={job.image}
                                            height={70}
                                            width={70}
                                            quality={75}
                                            alt={job.name}
                                        />
                                    </td>
                                    <td className={cvStyles.jobTitle}>{job.position}<br/>{job.location}</td>
                                    <td className={cvStyles.jobDate}>{"from " + job.startDate + " to " + job.endDate}</td>
                                </tr>
                                <tr>
                                    <td className={cvStyles.sumExp} colSpan="3"><div dangerouslySetInnerHTML={{ __html: job.summary }} /></td>
                                    
                                </tr>
                            </tbody>
                        </table>)
                    }
                </div>

                <h2 className={utilStyles.headingXl}>Awards</h2>
                <div className={utilStyles.lightText}>
                    Awards TODO: Load data from json file
                </div>
                
                <h2 className={utilStyles.headingXl}>Education</h2>
                <div className={utilStyles.lightText}>
                    {educations.map((education, k) =>
                        <table key={"edu"+k} className={utilStyles.table}>
                            <tbody>
                                <tr>
                                    <td className={utilStyles.logo}>
                                        <Image
                                            priority
                                            src={education.image}
                                            height={70}
                                            width={70}
                                            quality={75}
                                            alt={education.institution}
                                        />
                                    </td>
                                    <td className={cvStyles.jobTitle}>{education.institution}</td>
                                    <td className={cvStyles.jobDate}>{"from " + education.startDate + " to " + education.endDate}</td>
                                </tr>
                            </tbody>
                    </table>)
                    }
                </div>
            </article>
        </Layout>
    );
}