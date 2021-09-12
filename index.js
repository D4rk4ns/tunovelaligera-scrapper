const request = require("request"),
    cheerio = require('cheerio'),
    test = require('./download');

const wait = async (time) =>{
    new Promise((res, req) => setTimeout(() => res(), time));
};


async function getMaxPages(url) {
    let topNumber = 2,
        numberPage = [];

    try {
        let content = await request.get(url, function (error, response, data) {

            const $ = cheerio.load(data);

            if (error) {
                console.error(`Could not send request to API: ${error.message}`);
                return;
            }

            if (response.statusCode !== 200) {
                console.error(`Expected status code 200 but received ${response.statusCode}.`);
                return;
            }

            if (topNumber === 2) {
                //Obtener la cantidad de páginas que hay por novela
                $('.lcp_paginator LI A').each((i, el) => {
                    numberPage.push($(el).text());
                });

                topNumber = parseInt(numberPage[numberPage.length - 2]);
            }
        });

    } catch (error) {
        console.error(`Algo fue realmente mal: ${error}`);
    }
}

async function getListChapters(url) {
    try {
        //let urlList = [];
        let options = {
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
            }
        };

        let content = await request.get(options, function (error, response, data) {
            const $ = cheerio.load(data);

            if (error) {
                console.error(`Could not send request to API: ${error.message}`);
                return;
            }

            if (response.statusCode !== 200) {
                console.error(`Expected status code 200 but received ${response.statusCode}.`);
                return;
            }

            $('#lcp_instance_0 LI A').each((i, el) => {
                 test.getChapter($(el).attr('href'));
                 //urlList.push($(el).attr('href'));
            });
            //console.log("Hay un total de "+temp+" archivos");
            // console.log(urlList);
        });

    } catch (error) {
        console.error(`Algo fue realmente mal: ${error}`);
    }

}

/*async function DoStuff(urlList) {
    for (let i=0; i< urlList.length; i++){
        await wait(1000);
        test.getChapter(urlList[i]);
        console.log("Vas por "+(i+1)+" de "+urlList.length);
    }
}
*/

function Main() {
    console.log("////////////////////////////////////////////////");
    console.log("Inserta la URL");
    console.log("////////////////////////////////////////////////");

    let stdin = process.openStdin();
    let url = '';
    stdin.addListener("data", function(d) {
        url = d.toString();
        getListChapters("https://tunovelaligera.com/novelas/"+url);
        stdin.destroy();
    });
}

//getListChapters("https://tunovelaligera.com/novelas/monster-paradise-tnla/?lcp_page0=1");
Main();
