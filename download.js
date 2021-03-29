const request = require("request"),
      cheerio = require('cheerio'),
      fs      = require('fs');


//let url = "https://tunovelaligera.com/dejame-jugar-en-paz/dejame-jugar-en-paz-capitulo-748-viejo-maestro-xia/";


function getChapter(url) {
    let titulo = '', texto  = '', parrafo = '';
    request.get(url, function (error, response, data) {

        const $ = cheerio.load(data);

        if (error) {
            console.error(`Could not send request to API: ${error.message}`);
            return;
        }

        if (response.statusCode !== 200) {
            console.error(`Expected status code 200 but received ${response.statusCode}.`);
            return;
        }


        if($('#chapter-content .cha-words p').length != 0){

            $('#chapter-content .cha-words p').each((i, el) => {
                texto += '\n'+$(el).text()+'\n';
            });
        }
   /*     else if($('.entry-content_wrap div p').length > $('.entry-content_wrap p').length) {

            $('.entry-content_wrap div p').each((i, el) => {
                texto += '\n'+$(el).text()+'\n';
            });

            }*/
        else {

            $('.entry-content_wrap p').each((i, el) => {
                texto += '\n'+$(el).text()+'\n';
            });
        }


        titulo = $('.item-title').text()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(":", '-')
            .replace("?", "")
            .replace("¿", "")
            .replace("– \t\t\t\t\t\t\t\t\t\t\t\tC", "–C")
            .replace(/(\r\n|\n|\r)/gm,"")
            .replace(/['"]+/g, " ");


        parrafo = titulo + "\n "+ texto;

        fs.writeFile('./txts/'+titulo+'.txt', parrafo, (error => {
            if (error) {
             //   console.error(`Could not save the Links to a file: ${error}`);
             console.error(error.message);

                return;
            }
            console.log('Se ha creado el archivo llamado ' + titulo + ' en su carpeta correspondiente');
        }));

    });
}

module.exports = {getChapter};

  //  getChapter(url);
