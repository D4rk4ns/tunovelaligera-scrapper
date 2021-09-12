const request = require("request"),
      cheerio = require('cheerio'),
      fs      = require('fs');


//let url = "https://tunovelaligera.com/la-primera-orden/la-primera-orden-capitulo-471-grua-de-papel-blanco/";


function getChapter(url) {
    let titulo = '', texto  = '', parrafo = '';

    let options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    };

    request.get(options, function (error, response, data) {

        const $ = cheerio.load(data);

        if (error) {
            console.error(`Could not send request to API: ${error.message}`);
            return;
        }

        if (response.statusCode !== 200) {
            console.error(`Expected status code 200 but received ${response.statusCode}.`);
            return;
        }

        let nameClassSearch = "."+$('.ct-font-resizer').parent().attr('class')+" p";

    //    if($(nameClassSearch).length !== 0){

            $(nameClassSearch).each((i, el) => {
                texto += '\n'+$(el).text()+'\n';
            });
      /*  }
        else {
            return error.message;
        }
*/
        titulo = $('.item-title').text()
            .normalize("NFD")
            //.replace(/[^a-zA-Z0-9]/g, '');
            .replace(/[&\/\\#,+()$~%.'":*¿?!¡<>{}]/g, '');
            /*.replace(/[\u0300-\u036f]/g, "")
            .replace(":", '-')
            .replace("?", "")
            .replace(" ?", "")
            .replace("¿", "")
            .replace(" ¿", "")
            .replace("!", "")
            .replace(" !", "")
            .replace("¡", "")
            .replace(" ¡", "")
            .replace("– \t\t\t\t\t\t\t\t\t\t\t\tC", "-C")
            .replace(/(\r\n|\n|\r)/gm,"")
            .replace(/['"]+/g, " ")
            .replace("<","")
            .replace(">","")
            .replace("|","")
            .replace("\\","-")
            .replace("/","-")
            .replace(" – "," - ")
            .replace("*","");
*/
        parrafo = titulo + "\n "+ texto;

      /*  fs.writeFile('./txts/'+titulo+'.txt', parrafo, (error => {
            if (error) {
                console.error(`Could not save the Links to a file: ${error}`);
                return error.message;
            }
            console.log('Se ha creado el archivo en su carpeta correspondiente');
        }));*/
        try {
            let writeStream = fs.createWriteStream('./txts/' + titulo + '.txt');
            writeStream.write(parrafo);
            writeStream.on('finish', () => {
                console.log('Se ha creado el archivo en su carpeta correspondiente');
            });
            writeStream.end();
        } catch (error) {
            console.error(`Could not save the Links to a file: ${error}`);
        }
    });
}

module.exports = {getChapter};

  //  getChapter(url);
