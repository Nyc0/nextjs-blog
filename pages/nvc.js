import Layout from '/components/layout';
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import { useEffect } from "react";
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Legend, Tooltip} from "chart.js";
ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Legend, Tooltip);

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), '/data/nvc.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}

export default function Cv(props) {
    const creations = props.creation;
    const reviews = props.review;
    const inquiries = props.inquiry;

    // Create a Set
    const labelsArray = new Array();
    const creationArray = new Array();
    const reviewArray = new Array();
    const inquiryArray = new Array();

    //Create list of labels for the graph
    //TODO: How to ensure that all lists have the same keys? Or is it an assumption
    for (var key in creations){
        labelsArray.push(key);
        creationArray.push(creations[key]);
    }
    for (var key in reviews){
        reviewArray.push(reviews[key]);
    }
    for (var key in inquiries){
        inquiryArray.push(inquiries[key]);
    }

    const data = {
        labels: labelsArray,
        datasets: [{
          data: creationArray,
          label: "Case creation",
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        }, {
          data: reviewArray,
          label: "Case review",
          borderColor: "#3cba9f",
          backgroundColor: "#71d1bd",
          fill: false,
        }, {
          data: inquiryArray,
          label: "Inquiries",
          borderColor: "#ffa500",
          backgroundColor: "#ffc04d",
          fill: false,
        }
        ]
      };

    const option = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'NVC waiting time published each week'
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Dates'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Days'
            },
          }
        }
    };

    useEffect(() => {
        var ctx = document.getElementById('nvcChart').getContext('2d');
        var nvcChart = new ChartJS(ctx, {
          type: 'line',
          data: data,
          options: option,
        });
      }, [])

    return (
        <Layout>
            <Head>
                <title>NVC Tracker</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>NVC Tracker</h1>
                <div className={utilStyles.lightText}>
                    <p>The NVC tracker will be updated next Monday (XXXXXXXXXXXXXXXXXXXXXXXXX). The data should be made available by the end of the day US time.</p>
                    <p>The data is extracted from <a src="https://travel.state.gov/content/travel/en/us-visas/immigrate/nvc-timeframes.html">nvc-timeframe</a> website.</p>
                    <canvas id='nvcChart'></canvas>
                    <p>My work was inspired by <a src="https://visawhen.com/nvc">visawhen.com/nvc</a>!</p>
                </div>
            </article>
        </Layout>
    );
}