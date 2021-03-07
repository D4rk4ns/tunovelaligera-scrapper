const request = require("request"),
    cheerio = require('cheerio'),
    fs = require('fs'),
    test = require('./download');


let topNumber = 2;
let title = [],
    numberPage = [];

const chapters = new Map();


async function getListChapters(url) {
    //let url      = "https://tunovelaligera.com/novelas/super-gene/?lcp_page0=24",
    let links = [];
    try {
       let content = await request.get(url, function (error, response, data) {

            const $ = cheerio.load(data);

            let position = url.slice(url.length - 2, url.length).replace('=', '0');

            if (error) {
                console.error(`Could not send request to API: ${error.message}`);
                return;
            }

            if (response.statusCode !== 200) {
                console.error(`Expected status code 200 but received ${response.statusCode}.`);
                return;
            }

            if(topNumber === 2){
            //Obtener la cantidad de páginas que hay por novela
            $('.lcp_paginator LI A').each((i, el) => {
                numberPage.push($(el).text());
            });
            topNumber = parseInt(numberPage[numberPage.length - 2]);
            }

            $('#lcp_instance_0 LI A').each((i, el) => {
                //    chapters.set($(el).text(),$(el).attr('href'));
                //   title.push($(el).text());
                //links.push($(el).attr('href'));
                test.getChapter($(el).attr('href'));
            });


         //   writingFile(position,JSON.stringify(links));


        });

    } catch (error) {
        console.error(`Algo fue realmente mal: ${error}`);
    }
}


function Main() {
    console.log("Inserta la URL");
    var stdin = process.openStdin();
    let url = '';
    stdin.addListener("data", function(d) {
        console.log("La URL es: " +
            d.toString().trim());
           url = d.toString();

            getListChapters("https://tunovelaligera.com/novelas/"+url);

    });


}

/*
function updatingLinkList(href) {
    links.push(href);
}
*/
async function writingFile(path, context) {
    await fs.writeFile(path + '.txt', context, (err => {
        if (err) {
            console.error(`Could not save the Links to a file: ${error}`);
            return;
        }
        console.log('Done >u<');
    }));


}

Main();
