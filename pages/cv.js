import Layout from '/components/layout';
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';

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
                <h1 className={utilStyles.headingXl}>Resume</h1>
                <div className={utilStyles.lightText}>
                    <p>Hello, I am Nicolas Grymonprez. I have 10 years of experience in project deployment in consulting and IT operations in Health Care IT. I was accountable for the success of all projects for my clients. In order to achieve success I focused extensively on road mapping, setting expectations, ensuring that lesson learnt were capture and shared, manage risks and issues, improving processes, and increase transparency.   
                    **DevOps keywords**
                    <br/><br/>
                    I am really motivated when I learn and grow with a team. Through my previous carreer I quickly endeavour to become a Cerner Command Language Intermediate and Advanced intructor. I lead effort to standardise and document many workflows and knowledge. On my personal time I spent a lot of time learning sailing, and learning all systems on my previous boat in order to achieve a personal goal. I am currently trying to dive again into application devlopment, as well as learning about DevOps and cloud services and architecture.</p>
                </div>
                <div className={utilStyles.lightText}>
                    {jobs.map(job =>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Image
                                            priority
                                            src={job.image}
                                            className={utilStyles.borderCircle}
                                            height={144}
                                            width={144}
                                            quality={75}
                                            alt={job.name}
                                        />
                                    </td>
                                    <td>{job.position}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">{job.summary}</td>
                                </tr>
                            </tbody>
                        </table>)
                    }
                </div>
                <div className={utilStyles.lightText}>
                    Skills TODO: Load data from json file
                    {skills.map(skill =>
                        <div
                            key={skill.name}
                            style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
                            <h2>{skill.name}</h2>
                        </div>)
                    }
                </div>
                <div className={utilStyles.lightText}>
                    Education TODO: Load data from json file
                    {educations.map(education =>
                        <div
                            key={education.institution}
                            style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
                            <h2>{education.institution}</h2>
                        </div>)
                    }
                </div>
            </article>
        </Layout>
    );
}