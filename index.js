import express from "express";
import bodyParser from "body-parser";
import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs' //eslint-disable-line

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

const searches = ['funny+cats', 'cute+cats', 'angry-cats', 'cats']


const imgurUrl = "https://imgur.com/search/score?q="

const PORT = process.env.PORT || 4000;

/////////////////////////////////////////////////////////////////////LOADING SERVER/////////////////////////////////////////////////////////////////////


const format = (link) => `https:${link}`

const write = (data) =>
    fs.writeFile('./data.txt', JSON.stringify(data), (err) => err || console.log('saved'))



const scrapeImgur = () => searches.map(search => request(`${imgurUrl}${search}`, (error, response, html) => {
    if (error) {
        throw new Error('Issues fetching data')
    }

    const $ = cheerio.load(html);
    const links = []

    $('div .post').each((i, elem) => {
        const url = $(elem).find('img').attr('src')
        links[i] = format(url)
    })

    console.log(links.length);
    write(links)
}))






// Load Server
app.get("/", (req, res) => {
    res.send("Cat Scraper");
    scrapeImgur()
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