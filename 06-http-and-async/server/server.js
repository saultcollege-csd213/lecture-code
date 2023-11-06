"use strict";

import http from 'http';

const port = 9999;
const hostname = 'localhost';

http.createServer(handleRequest)
    .listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`));


function handleRequest(req, res) {

    // const origin = req.Origin;
    // if origin is in the list of allowed origins
    res.setHeader('Access-Control-Allow-Origin', '*');

    switch ( req.method ) {
        case 'GET':
            switch ( req.url ) {
                case '/theweather':
                    // make a request to cross-origin api
                    // forward response back to my client
                case '/sometext':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end("Just some text");
                    break;
                case '/somehtml':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end("<!doctype html><html><head><meta charset='UTF-8'><title>A web page</title></head><body><h1>Here's a web page</h1></body</html>");
                    break;
                case '/somejson':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    const jsonObject = {
                        a: 1,
                        b: 2,
                        c: 3
                    }
                    res.end(JSON.stringify(jsonObject));
                    break;
                case '/animals-as-list-items':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end("<li>Cat</li><li>Dog</li><li>Horse</li><li>Pig</li><li>Liger</li>");
                    break;
                case '/animals-as-json':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    const animals = { animals: ['Cat', 'Dog', 'Horse', 'Pig', 'Liger'] };
                    res.end(JSON.stringify(animals));
                    break;
                default:
                    fail(res);
                    break;
            }
            break;
        case 'POST':
            switch ( req.url ) {
                case '/query':
                    let postData = ""
                    req.on("data", (chunk) => postData += chunk )
                    req.on("end", () => {
                        const query = (new URLSearchParams(postData)).get('query');

                        res.setHeader('Content-Type', 'application/json');
                        const suggestions = { suggestions: [ query + '1', query + '2', query + '3' ] };
                        res.end(JSON.stringify(suggestions));
                    })
                    break;
                default:
                    fail(res);
                    break;
            }
            break;
        default:
            fail(res);
            break;
    }
}

function fail(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end("Not found");
}