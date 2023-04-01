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
                    <p>Hello, I am Nicolas Grymonprez. I have 10 years of experience in project deployment in consulting and IT operations in Health Care IT. I was accountable for the success of all projects for my clients. In order to achieve success I focused extensively on road mapping, setting expectations, ensuring that lesson learnt were capture and shared, manage risks and issues, improving processes, and increase transparency.
                    <br/><br/>
                    I am really motivated when I learn and grow with a team. Through my previous carreer I quickly endeavour to become a Cerner Command Language Intermediate and Advanced intructor. I lead effort to standardise and document many workflows and knowledge. On my personal time I spent a lot of time learning sailing, and learning all systems on my previous boat in order to achieve a personal goal. I am currently trying to dive again into application devlopment, as well as learning about DevOps and cloud services and architecture.</p>
                </div>
                
                <h2 className={utilStyles.headingXl}>Experience</h2>
                <div className={utilStyles.lightText}>
                    {jobs.map((job, i) =>
                        <table key={"job"+i}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Image
                                            priority
                                            src={job.image}
                                            className={utilStyles.borderCircle}
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
                        <table key={"edu"+k}>
                        <tbody>
                            <tr>
                                <td>
                                    <Image
                                        priority
                                        src={education.image}
                                        className={utilStyles.borderCircle}
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