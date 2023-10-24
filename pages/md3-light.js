import Layout from '/components/layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import { useEffect } from "react";
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Legend, Tooltip} from "chart.js";
ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Legend, Tooltip);

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), '/data/md3-light.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}

function getOption(text, option) {
  return {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: (option?'Price of the Model 3 ('+text+') options':'Price of the Model 3 trims')
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
          text: 'Price'
        },
      }
    }
  };
}

function getLabelPrefix(list, text) {
  if(list[text]) {
    return list[text];
  }
  return "O-";
}

function isLabelExisting(labels, label) {
  for (var l in labels) {
    if (labels[l] == label) {
      return true;
    }
  }
  return false;
}

export default function Md3(props) {

  const labels = new Array();
  const models = new Array();
  const modelOptions = new Array();
  const options = new Array();
  const chartOption = new Array();
  const borderColors = ["#3e95cd", "#3cba9f", "#ffa500", "#6772d8", "#d35260", "#3ecdbf"];
  const backgroundColors = ["#7bb6dd", "#71d1bd", "#ffc04d", "#8f98e2", "#e28f98", "#8fe2da"];
  const optionPrefix = {"PAINT": "P-", "WHEELS" : "W-", "INTERIOR" : "I-", "PREMIUM_PACKAGE": "I-", "INTERIOR_PACKAGE": "I-"}
  var nbr = 0;
  var nbrOpt = 0;
  var price = 0;

  const md3Data = {
    labels: labels,
    datasets: []
  };

  //loop through all models to get the complete list of labels
  for (var model in props) {
    for (var key in props[model]['code']) {
      if(!isLabelExisting(labels, key)) {
        labels.push(key);
      }
    }
  }

  //sort list of labels
  var tempDate;
  for (let i in labels) {
    for (let j = i+1; j < labels.length; j++) {
      if(labels[i]>labels[j]) {
        tempDate = labels[i]
        labels[i] = labels[j]
        labels[j] = tempDate
      }
    }
  }

  for (var model in props) {
    models[nbr] = new Array();
    modelOptions[nbr] = new Array();
    options[nbr] = {
      labels: labels,
      datasets: []
    };

    for (let k  in labels){
      price = props[model]['price'][labels[k]];
      if (price > 0) {
        models[nbr].push(price);
      } else {
        models[nbr].push("NaN");
      }
    }

    md3Data.datasets.push({
      data: models[nbr],
      label: model,
      borderColor: borderColors[nbr%6],
      backgroundColor: backgroundColors[nbr%6],
      fill: false,
    })
    
    //options
    nbrOpt = 0;
    for (var i in props[model]["options"]) {
      modelOptions[nbr][i] = new Array();
      
      for (var j in props[model]["options"][i]) {
        modelOptions[nbr][i][j] = new Array();

        for (let k  in labels){
          price = props[model]["options"][i][j][labels[k]];
          if (price > 0) {
            modelOptions[nbr][i][j].push(price);
          } else {
            modelOptions[nbr][i][j].push("NaN");
          }
        }
        options[nbr].datasets.push({
          data: modelOptions[nbr][i][j],
          label: getLabelPrefix(optionPrefix,i)+j,
          borderColor: borderColors[nbrOpt%6],
          backgroundColor: backgroundColors[nbrOpt%6],
          fill: false,
        })
        //console.log("model: " + model + ", options (" + j + "): " + modelOptions[nbr][i][j]);  
      }
      nbrOpt ++;
    }
    chartOption[nbr] = getOption(model,true);
    nbr ++;
  }
  
  const mainChartOption = getOption("",false);

  useEffect(() => {
      var ctx = document.getElementById('chart').getContext('2d');
      var teslaChart = new Array();
      teslaChart.push(new ChartJS(ctx, {
        type: 'line',
        data: md3Data,
        options: mainChartOption,
      })
      );

      for(let n = 0; n < options.length && n < 11; n ++) {
        var ctx = document.getElementById('chartTRIM'+n).getContext('2d');
        teslaChart.push(new ChartJS(ctx, {
          type: 'line',
          data: options[n],
          options: chartOption[n],
        })
        );

        document.getElementById("myPaintBtn"+n).addEventListener("click", () => {
          for(let i = 0; i < teslaChart[n+1].data.datasets.length; i++) {
            if(teslaChart[n+1].data.datasets[i].label.includes("P-")) {
              teslaChart[n+1].setDatasetVisibility(i, !teslaChart[n+1].isDatasetVisible(i));
            }
          }
          teslaChart[n+1].update();
          if (document.getElementById("myPaintBtn"+n).innerText == "Hide paint") {
            document.getElementById("myPaintBtn"+n).innerText = "Show paint";
          } else {
            document.getElementById("myPaintBtn"+n).innerText = "Hide paint";
          }
        });

        document.getElementById("myWheelBtn"+n).addEventListener("click", () => {
          for(let i = 0; i < teslaChart[n+1].data.datasets.length; i++) {
            if(teslaChart[n+1].data.datasets[i].label.includes("W-")) {
              teslaChart[n+1].setDatasetVisibility(i, !teslaChart[n+1].isDatasetVisible(i));
            }
          }
          teslaChart[n+1].update();
          if (document.getElementById("myWheelBtn"+n).innerText == "Hide wheel") {
            document.getElementById("myWheelBtn"+n).innerText = "Show wheel";
          } else {
            document.getElementById("myWheelBtn"+n).innerText = "Hide wheel";
          }
        });

        document.getElementById("myInteriorBtn"+n).addEventListener("click", () => {
          for(let i = 0; i < teslaChart[n+1].data.datasets.length; i++) {
            if(teslaChart[n+1].data.datasets[i].label.includes("I-")) {
              teslaChart[n+1].setDatasetVisibility(i, !teslaChart[n+1].isDatasetVisible(i));
            }
          }
          teslaChart[n+1].update();
          if (document.getElementById("myInteriorBtn"+n).innerText == "Hide interior") {
            document.getElementById("myInteriorBtn"+n).innerText = "Show interior";
          } else {
            document.getElementById("myInteriorBtn"+n).innerText = "Hide interior";
          }
        });

        document.getElementById("myOtherBtn"+n).addEventListener("click", () => {
          for(let i = 0; i < teslaChart[n+1].data.datasets.length; i++) {
            if(teslaChart[n+1].data.datasets[i].label.includes("O-")) {
              teslaChart[n+1].setDatasetVisibility(i, !teslaChart[n+1].isDatasetVisible(i));
            }
          }
          teslaChart[n+1].update();
          if (document.getElementById("myOtherBtn"+n).innerText == "Hide other") {
            document.getElementById("myOtherBtn"+n).innerText = "Show other";
          } else {
            document.getElementById("myOtherBtn"+n).innerText = "Hide other";
          }
        });
      }

      for (let n = teslaChart.length - 1; n < 11; n++) {
        document.getElementById("chartTRIM"+n).remove();
        document.getElementById("myPaintBtn"+n).remove();
        document.getElementById("myWheelBtn"+n).remove();
        document.getElementById("myInteriorBtn"+n).remove();
        document.getElementById("myOtherBtn"+n).remove();
      }
    }, [])

  return (
      <Layout>
          <Head>
              <title>Model 3 Tracker</title>
          </Head>
          <article>
              <h1 className={utilStyles.headingXl}>Model 3 Tracker</h1>
              <div className={utilStyles.lightText}>
                  <p>The Model 3 tracker is updated every day. </p>
                  <p>The data is extracted from <a href="https://www.tesla.com/model3/design#overview">Tesla</a> website.</p>
                  <canvas id='chart'></canvas>
              </div>
              <h1 className={utilStyles.headingXl}>Model 3 - TRIM's options</h1>
              <div className={utilStyles.lightText}>
                  <canvas id='chartTRIM0'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn0">Hide paint</button>
                    <button id="myWheelBtn0">Hide wheels</button>
                    <button id="myInteriorBtn0">Hide interior</button>
                    <button id="myOtherBtn0">Hide other</button>
                  </div>
                  <canvas id='chartTRIM1'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn1">Hide paint</button>
                    <button id="myWheelBtn1">Hide wheels</button>
                    <button id="myInteriorBtn1">Hide interior</button>
                    <button id="myOtherBtn1">Hide other</button>
                  </div>
                  <canvas id='chartTRIM2'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn2">Hide paint</button>
                    <button id="myWheelBtn2">Hide wheels</button>
                    <button id="myInteriorBtn2">Hide interior</button>
                    <button id="myOtherBtn2">Hide other</button>
                  </div>
                  <canvas id='chartTRIM3'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn3">Hide paint</button>
                    <button id="myWheelBtn3">Hide wheels</button>
                    <button id="myInteriorBtn3">Hide interior</button>
                    <button id="myOtherBtn3">Hide other</button>
                  </div>
                  <canvas id='chartTRIM4'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn4">Hide paint</button>
                    <button id="myWheelBtn4">Hide wheels</button>
                    <button id="myInteriorBtn4">Hide interior</button>
                    <button id="myOtherBtn4">Hide other</button>
                  </div>
                  <canvas id='chartTRIM5'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn5">Hide paint</button>
                    <button id="myWheelBtn5">Hide wheels</button>
                    <button id="myInteriorBtn5">Hide interior</button>
                    <button id="myOtherBtn5">Hide other</button>
                  </div>
                  <canvas id='chartTRIM6'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn6">Hide paint</button>
                    <button id="myWheelBtn6">Hide wheels</button>
                    <button id="myInteriorBtn6">Hide interior</button>
                    <button id="myOtherBtn6">Hide other</button>
                  </div>
                  <canvas id='chartTRIM7'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn7">Hide paint</button>
                    <button id="myWheelBtn7">Hide wheels</button>
                    <button id="myInteriorBtn7">Hide interior</button>
                    <button id="myOtherBtn7">Hide other</button>
                  </div>
                  <canvas id='chartTRIM8'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn8">Hide paint</button>
                    <button id="myWheelBtn8">Hide wheels</button>
                    <button id="myInteriorBtn8">Hide interior</button>
                    <button id="myOtherBtn8">Hide other</button>
                  </div>
                  <canvas id='chartTRIM9'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn9">Hide paint</button>
                    <button id="myWheelBtn9">Hide wheels</button>
                    <button id="myInteriorBtn9">Hide interior</button>
                    <button id="myOtherBtn9">Hide other</button>
                  </div>
                  <canvas id='chartTRIM10'></canvas>
                  <div className={utilStyles.button}>
                    <button id="myPaintBtn10">Hide paint</button>
                    <button id="myWheelBtn10">Hide wheels</button>
                    <button id="myInteriorBtn10">Hide interior</button>
                    <button id="myOtherBtn10">Hide other</button>
                  </div>
              </div>
          </article>
      </Layout>
  );
}