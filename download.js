const request = require("request"),
      cheerio = require('cheerio'),
      fs      = require('fs');


//let url = "https://tunovelaligera.com/super-gene/super-gene-capitulo-1299-vino-desesperado/";


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
        else {
            $('.entry-content_wrap div p').each((i, el) => {
                texto += '\n'+$(el).text()+'\n';
            });

            }

        titulo = $('.item-title').text().replace(":", '–').replace("?", "").replace("¿", "");

        parrafo = titulo + "\n "+ texto;


        fs.writeFile('./txts/'+titulo+'.txt', parrafo, (error => {
            if (error) {
                console.error(`Could not save the Links to a file: ${error}`);
                return;
            }
            console.log('Se ha creado el archivo llamado ' + titulo + 'en su carpeta correspondiente');
        }));

    });
}

module.exports = {getChapter};

//getChapter("https://tunovelaligera.com/super-gene/super-gene-capitulo-2974-nunca-lo-sabras/");
/*
function f() {
    let arr = ["https://tunovelaligera.com/super-gene/super-gene-capitulo-2974-nunca-lo-sabras/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2973-mito-de-la-sangre-azul/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2972-recursos-entregados/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2971-bueno-lotus/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2970-pozo-de-luz/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2969-rompiendo-poin/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2968-el-tiempo-vuelve/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2967-luchando-en-un-palacio-de-dios/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2966-dios-del-momento/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2965-destruido-o-no/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2964-tierras-del-palacio-de-dios/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2963-rompiendo-el-palacio-sagrado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2962-destino/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2961-el-unico-salvador/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2960-un-lider-y-cuatro-subordinados/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2959-linterna-de-raza-sagrada/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2958-que-quieres/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2957-subiendo-de-nivel-al-dios-verdadero/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2956-instrumen-astral/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2955-dentro-del-salon-sagrado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2954-encanto-espacial/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2953-padre-e-hija-luchando-contra-tres-bestias-brutales/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2952-tonto-y-torpe/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2951-apresurandose/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2950-romperlo/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2949-atmosfera-extrana/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2948-guardian-del-palacio-sagrado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2947-santo-kirin/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2946-vida-cara/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2945-llamada-del-destino/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2944-fate-monumen/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2943-una-vida-es-demasiado-corta/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2942-qin-xiu/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2941-un-segundo-son-mil-anos/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2940-han-yu-fei/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2939-ciclo-espacial/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2938-lider-sagrado-que-no-puede-ser-reemplazado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2937-hermana-del-lider-sagrado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2936-tres-preguntas/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2935/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2934-carne-en-el-po/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2933-pabellon/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2932-jardin-sagrado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2931-angel-de-la-muerte/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2930-un-lugar-oscuro/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2929-linterna-larga-y-brillante/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2928-ir-a-sagrado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2927-peor-que-los-animales/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2926-perro-hibrido/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2925-ruina-sagrada/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2924-matar-al-dragon-negro/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2923-linterna-de-piedra/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2922-luchando-contra-el-dragon/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2921-estatua-en-el-camino-de-la-montana/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2920-gafas-de-sol/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2919-flotante/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2918-un-pez-como-rehen/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2917-probador-304/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2916-mar-basura/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2915-gran-maestro-del-antiguo-abismo/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2914-espada-del-castigo-de-dios/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2913-alejarse-de-la-carretera/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2912-muneca/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2911-coche-fantasma/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2910-cortando-la-mesa-de-piedra/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2909-piedra-cortante/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2908-pajaro-de-la-tabla-de-piedra/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2907-extrano-xenogenico-deificado/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2906-yendo-al-area-de-dios-otra-vez/","https://tunovelaligera.com/super-gene/super-gene-capitulo-2905-atrapado-en-la-montana/"];
    let striong = '';
    console.log(arr[0]);
       for (var i=0; i<= arr.length;i++)
         striong = arr[i];
        getChapter(""+arr[i]+"");
}

f();*/