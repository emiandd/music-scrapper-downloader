// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import readline from 'readline';
import https from 'https';
import fs from 'fs';
import inquirer from 'inquirer';
import { Info, Warning, Err } from './helpers/logger.js';


Init();


async function Init() {

	Info("Inicializando Web Music Scrapper...");
	


	// INGRESAR ARTISTA
	startSearch()





	// MP3 O ALBUM


	// MOSTRAR COUNT DE RESULTADOS EN CADA SITIO


	// SELECCIONA SITIO A DESCARGAR (OPCION DE FILTRAR DESCARGAS )

	
	// let userOptions = {
	// 	site: '',
	// 	downloadType: '',
		
	// }

	// // Define a list of options for the user to choose from
	// const siteOptions = [
	//   'FlowHot',
	//   'PlayUrbano',
	// ];

	// // Question about site from
	// const question1 = {
	//   type: 'list',
	//   name: 'selectedOption',
	//   message: 'Selecciona un sitio para descargar música:',
	//   choices: siteOptions,
	// };


	// // Use inquirer to prompt the user and get their choice
	// inquirer.prompt(question1).then((answers) => {
	//   const site = answers.selectedOption;
	//   Info(`You selected: ${site}`)
	// });




}








function startSearch(indication) {
	
	let rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	rl.question("Ingresa un artista: ", (artist) => {
	  // Close the readline interface
		// console.log("Inserted: ", artist)		
		
		Info(`Buscando canciones de: ${artist}`)
		rl.close();




		// search albums
		(async () => {
			// Launch the browser and open a new blank page
			const browser = await puppeteer.launch({
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
				headless: 'new',
				defaultViewport: null,
				userDataDir: './userData',  // Esta línea guarda los datos del usuario (incluidas las descargas) entre sesiones
				// Aquí puedes agregar más opciones de lanzamiento según tus necesidades
			});
			const page = await browser.newPage();

			

			// Navigate the page to a URL
			await page.goto(`https://www.playurbano.com/?s=${artist}`);
		
			// Set screen size
			await page.setViewport({width: 1080, height: 1024});
		
			// Type into search box
			// await page.type('#searchfield', userInput);
		
		
				// Query for an element handle.

			const element = await page.waitForSelector('.lista_musica');
			
			if (await element.isVisible()) {
				const songs = await element.$$('ul > li > a');

				songs.length === 1 ? Info(`Se encontró: ${songs.length} canción`) : Info(`Se encontraron: ${songs.length} canciones`)
				Info("Intentando descargar el total encontrado...");
				

				for (const song of songs) {
					const originalSongName = await song.evaluate(el => el.textContent);
					const songSiteUrl = await song.evaluate(el => el.getAttribute("href"));
					// console.log(originalSongName);
					// console.log(songSiteUrl);

					
					let songPage = await browser.newPage();
					let fileName = "";
					// console.log("songPage", songPage);

					try {
						let result = await songPage.goto(songSiteUrl);
						await songPage.setViewport({width: 1080, height: 1024});
						// result = await songPage.screenshot({path: `${originalSongName.toLowerCase()}.png`, fullPage: true});
						
						const source = await songPage.waitForSelector('source');

						// // Comprueba el código de estado HTTP
    				// console.log('Código de estado HTTP:', result.status());
						console.log("result", result.status());
						// console.log("audio", audio);

						// const source = await audio.evaluate(el => el.getElementsByTagName('source'));
						let src = await source.evaluate(el => el.getAttribute('src'));


						// console.log("result", await result.text());
						// console.log("source", source);
						// console.log("src", src);
						src = src.includes("https") ? src : src.replace("http", "https");
						
						https.get(src, resp => {
							if (resp.statusCode === 200) {
								fileName = `${originalSongName}.mp3`;
								const fileStream = fs.createWriteStream(fileName);
								resp.pipe(fileStream);
								
								fileStream.on('finish', () => {
									console.log(`Archivo ${fileName} descargado.`);
									fileStream.close();
								});
							} else {
								console.error(`Error al descargar el archivo. Código de estado: ${resp.statusCode}`);
							}
						}).on('error', error => {
							console.error(error);
						});



						
					} catch (e) {
						console.log("ENTRA AL CATCH")
						console.log(e)
						console.log(e.message)
						if (e.message.includes('net::ERR_NAME_NOT_RESOLVED at')) {
							Warning(`No se pudo descargar: ${fileName}`);
						}
						continue
					}


					// await songPage._client.send('Page.setDownloadBehavior', {
					// 	behavior: 'allow',
					// 	downloadPath: 'C:\Users\emila\Downloads',  // Ruta donde se guardarán las descargas
					// });



					// const src  = await audio.$$('audio > source');
					// const srcForDownload = await src.evaluate(el => el.getAttribute("src"));


					// console.log("srcForDownload", srcForDownload);





				}


			}
			
			// await element.click();
		
			// Tomar una captura de pantalla y guardarla como imagen
			// await page.screenshot({path: 'screenshot.png', fullPage: true});
		
			// // Wait and click on first result
			// const searchArtist = '.search_artista';
			// await page.waitForSelector(searchArtist);
			// await page.click(searchArtist);
		
			// // // Locate the full title with a unique string
			// const textSelector = await page.waitForSelector(
			//   'text/Customize and automate'
			// );
			// const fullTitle = await textSelector?.evaluate(el => el.textContent);
		
			// // Print the full title
			// console.log('The title of this blog post is "%s".', fullTitle);
		
			await browser.close();
		})();

		// mp3 searching
		// (async () => {
		// 	// Launch the browser and open a new blank page
		// 	const browser = await puppeteer.launch({
		// 	headless: 'new',
		// 	// `headless: true` (default) enables old Headless;
		// 	// `headless: 'new'` enables new Headless;
		// 	// `headless: false` enables “headful” mode.
		// 	});
		// 	const page = await browser.newPage();
		
		// 	// Navigate the page to a URL
		// 	await page.goto('https://flowhot.cc/');
		
		// 	// Set screen size
		// 	await page.setViewport({width: 1080, height: 1024});
		
		// 	// Type into search box
		// 	await page.type('#searchfield', userInput);
		
		
		// 		// Query for an element handle.
		// 	// const element = await page.waitForSelector('i > .fa-search');
		// 	// await element.click();
		
		// 	// Tomar una captura de pantalla y guardarla como imagen
		// 	await page.screenshot({path: 'screenshot.png', fullPage: true});
		
		// 	// // Wait and click on first result
		// 	// const searchArtist = '.search_artista';
		// 	// await page.waitForSelector(searchArtist);
		// 	// await page.click(searchArtist);
		
		// 	// // // Locate the full title with a unique string
		// 	// const textSelector = await page.waitForSelector(
		// 	//   'text/Customize and automate'
		// 	// );
		// 	// const fullTitle = await textSelector?.evaluate(el => el.textContent);
		
		// 	// // Print the full title
		// 	// console.log('The title of this blog post is "%s".', fullTitle);
		
		// 	await browser.close();
		// })();



	});

	
}




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

function songsCount() {
	Info("Realizando conteo de canciones...");
}