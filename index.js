const request = require("request"),
    cheerio = require('cheerio'),
    fs = require('fs'),
    test = require('./download');


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

            $('#lcp_instance_0 LI A').each((i, el) => {
                  test.getChapter($(el).attr('href'));
            });
        });

    } catch (error) {
        console.error(`Algo fue realmente mal: ${error}`);
    }
}


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


Main();
