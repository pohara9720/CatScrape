import express from "express";
import bodyParser from "body-parser";
import request from 'request';
import cheerio from 'cheerio';
// import fs from 'fs'


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Authorization,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const giphyUrl = "https://giphy.com/search/funny-cats"
// const imgurUrl = "https://imgur.com/search?q=funny%20cats"

const PORT = process.env.PORT || 4000;

/////////////////////////////////////////////////////////////////////LOADING SERVER/////////////////////////////////////////////////////////////////////


// const format = (link) => `https:${link}`

// const write = (data) => fs.writeFile('data.js', data, (err) => err || console.log('saved'));


// const scrapeImgur = () => {

//     request(`${imgurUrl}`, (error, response, html) => {
//         if (error) {
//             throw new Error('Issues fetching data')
//         }

//         const $ = cheerio.load(html);
//         const links = []

//         $('div .post').each((i, elem) => {
//             const url = $(elem).find('img').attr('src')
//             links[i] = format(url)
//         })

//         return links
//     });
// }

// const scrapeGiphy = () => {
//     request(`${giphyUrl}`, (error, response, html) => {
//         if (error) {
//             throw new Error('Issues fetching data')
//         }

//         const $ = cheerio.load(html);
//         const links = []

//         $('#content').find('div > img').each((index, element) => {
//             links.push($(element).attr('src'));
//         });

//         console.log(links);
//     });
// }

// Load Server
app.get("/", (req, res) => {
    res.send("Cat Scraper");

    // const data = []
    // const imgur = scrapeImgur()
    // const giphy = scrapeGiphy()

    // data.push(imgur)
    // data.push(giphy)

    // write(data)

});




/////////////////////////////////////////////////////////////////////RUNNING SERVER ON PORT/////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    //eslint-disable-next-line
    console.log(`
*****************************
*****************************
=============================
App listening on PORT ${PORT}
=============================
*****************************
*****************************`);
});