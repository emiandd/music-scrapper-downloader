// const puppeteer = require('puppeteer');
// const readline = require('readline');
import inquirer from 'inquirer';
import { Info, Warning, Err } from './helpers/logger.js'


Init();


function Init() {

	Info("Initializing Web Music Scrapper...");
	
	let userOptions = {
		site: '',
		downloadType: '',
		
	}

	// Define a list of options for the user to choose from
	const siteOptions = [
	  'FlowHot',
	  'PlayUrbano',
	];

	// Question about site from
	const question1 = {
	  type: 'list',
	  name: 'selectedOption',
	  message: 'Please select a site to download music:',
	  choices: siteOptions,
	};

	// Use inquirer to prompt the user and get their choice
	inquirer.prompt(question1).then((answers) => {
	  const site = answers.selectedOption;
	  Info(`You selected: ${site}`)
	});



}







// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('Please enter something: ', (userInput) => {
//   // Process user input here
//   console.log(`You entered: ${userInput}`);
//   if (userInput === "flowhot"){
//   	console.log(`navigating to: ${userInput}`)
//   }

//   if (userInput === "playurbano"){

//   }

//   // Close the readline interface
//   rl.close();
// });




// (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch({
//   headless: 'new',
//   // `headless: true` (default) enables old Headless;
//   // `headless: 'new'` enables new Headless;
//   // `headless: false` enables “headful” mode.
//   });
//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto('https://flowhot.cc/');

//   // Set screen size
//   await page.setViewport({width: 1080, height: 1024});

//   // Type into search box
//   await page.type('#searchfield', 'ñengo flow');


//     // Query for an element handle.
//   // const element = await page.waitForSelector('i > .fa-search');
//   // await element.click();

//   // Tomar una captura de pantalla y guardarla como imagen
//   await page.screenshot({path: 'screenshot.png', fullPage: true});

//   // // Wait and click on first result
//   // const searchArtist = '.search_artista';
//   // await page.waitForSelector(searchArtist);
//   // await page.click(searchArtist);

//   // // // Locate the full title with a unique string
//   // const textSelector = await page.waitForSelector(
//   //   'text/Customize and automate'
//   // );
//   // const fullTitle = await textSelector?.evaluate(el => el.textContent);

//   // // Print the full title
//   // console.log('The title of this blog post is "%s".', fullTitle);

//   await browser.close();
// })();
// 
// 
// import puppeteer from 'puppeteer';

// (async () => {
//   // Launch the browser and open a new blank page

//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto('https://developer.chrome.com/');

//   // Set screen size
//   await page.setViewport({width: 1080, height: 1024});

//   // Type into search box
//   await page.type('.search-box__input', 'automate beyond recorder');

//   // Wait and click on first result
//   const searchResultSelector = '.search-box__link';
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate'
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);

//   await browser.close();
// })();

// (async () => {
//   // Iniciar el navegador
//   const browser = await puppeteer.launch({
//   headless: 'new',
//   // `headless: true` (default) enables old Headless;
//   // `headless: 'new'` enables new Headless;
//   // `headless: false` enables “headful” mode.
//   });

//   // Abrir una nueva página
//   const page = await browser.newPage();

//   // Navegar a una URL
//   await page.goto('https://nailartstore.cl');

//   // Tomar una captura de pantalla y guardarla como imagen
//   await page.screenshot({ path: 'captura.png' });

//   // Cerrar el navegador
//   await browser.close();
// })();