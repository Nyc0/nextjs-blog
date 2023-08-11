import Layout from '/components/layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import { Chart } from "react-google-charts";

// Fetching data from the JSON file
/*import fsPromises from 'fs/promises';
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), '/data/domain-plan.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}
*/

export const data = [
  [
    { type: "string", id: "Environment" },
    { type: "string", id: "Description" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  [
    "Production",
    "Domain refresh",
    new Date(2023, 7, 7),
    new Date(2023, 7, 20),
  ],
  [
    "Production",
    "Domain refresh",
    new Date(2023, 7, 21),
    new Date(2023, 8, 3),
  ],
  [
    "Production",
    "Change frost",
    new Date(2023, 7, 7),
    new Date(2023, 9, 29),
  ],
  [
    "Production",
    "Go-live",
    new Date(2023, 10, 7),
    new Date(2023, 10, 7),
  ],
  [
    "Certification",
    "Domain refresh",
    new Date(2023, 7, 7),
    new Date(2023, 7, 20),
  ],
  [
    "Certification",
    "Validation",
    new Date(2023, 7, 21),
    new Date(2023, 7, 25),
  ],
  [
    "Certification",
    "Project configuration",
    new Date(2023, 10, 15),
    new Date(2023, 10, 15),
  ],
  [
    "Certification",
    "Project test",
    new Date(2023, 10, 15),
    new Date(2023, 10, 17),
  ],
  [
    "Certification",
    "BAU",
    new Date(2023, 7, 28),
    new Date(2023, 11, 31),
  ],
  [
    "Build",
    "Domain refresh",
    new Date(2023, 7, 21),
    new Date(2023, 8, 3),
  ],
  [
    "Build",
    "Validation",
    new Date(2023, 8, 4),
    new Date(2023, 8, 8),
  ],
  [
    "Build",
    "Project build",
    new Date(2023, 8, 11),
    new Date(2023, 9, 6),
  ],
  [
    "Build",
    "UAT",
    new Date(2023, 9, 9),
    new Date(2023, 9, 20),
  ],
  [
    "Build",
    "Path to live",
    new Date(2023, 10, 7),
    new Date(2023, 10, 17),
  ],
];

export default function domainPlan() {
    /*const clients = props.clients;
    const organizations = props.organizations;
    const domains = props.domains;
    const tasks = props.tasks;*/

    return (
        <Layout>
            <Head>
                <title>Domain Plan</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>Domain Plan example (static)</h1>
                <div className={utilStyles.lightText}>
                <Chart
                  chartType="Timeline"
                  data={data}
                  width="100%"
                  height="400px"
                  options={{
                    timeline: {
                      colorByRowLabel: true,
                    },
                    enableInteractivity: true,
                  }}
                />
                </div>
            </article>
        </Layout>
    );
}