"use strict";

import http from 'http';

const port = 9999;
const hostname = 'localhost';
const BASE_URL = `http://${hostname}:${port}`;

http.createServer(handleRequest)
    .listen(port, hostname, () => console.log(`Server running at ${BASE_URL}`));

const ANIMALS = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Armadillo",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Beluga Whale",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Cheetah",
    "Chimpanzee",
    "Chinchilla",
    "Chipmunk",
    "Cobra",
    "Condor",
    "Cougar",
    "Cow",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Deer",
    "Dingo",
    "Dolphin",
    "Donkey",
    "Dragonfly",
    "Duck",
    "Eagle",
    "Elephant",
    "Elk",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fox",
    "Frog",
    "Gazelle",
    "Giraffe",
    "Goat",
    "Goose",
    "Gorilla",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Hippopotamus",
    "Horse",
    "Hummingbird",
    "Hyena",
    "Iguana",
    "Impala",
    "Jackal",
    "Jaguar",
    "Jellyfish",
    "Kangaroo",
    "Koala",
    "Komodo Dragon",
    "Kookaburra",
    "Lemur",
    "Lion",
    "Lizard",
    "Llama",
    "Lynx",
    "Macaw",
    "Magpie",
    "Mantis",
    "Meerkat",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mouse",
    "Narwhal",
    "Newt",
    "Ocelot",
    "Octopus",
    "Okapi",
    "Opossum",
    "Orangutan",
    "Oryx",
    "Ostrich",
    "Otter",
    "Owl",
    "Panda",
    "Panther",
    "Parrot",
    "Penguin",
    "Pig",
    "Polar Bear",
    "Porcupine",
    "Puma",
    "Quokka",
    "Rabbit",
    "Raccoon",
    "Rat",
    "Raven",
    "Red Panda",
    "Rhinoceros",
    "Salmon",
    "Seagull",
    "Seahorse",
    "Seal",
    "Shark",
    "Sheep",
    "Sloth",
    "Snail",
    "Snake",
    "Spider",
    "Squirrel",
    "Starfish",
    "Stingray",
    "Swan",
    "Tiger",
    "Toucan",
    "Turtle",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Weasel",
    "Whale",
    "Wolf",
    "Wombat",
    "Woodpecker",
    "Yak",
    "Zebra"
  ].map(animal => animal.toLowerCase());
  

function handleRequest(req, res) {

    // const origin = req.Origin;
    // if origin is in the list of allowed origins
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

    switch ( req.method ) {
        case 'GET':
            // Get just the path from the URL
            const path = (new URL(req.url, BASE_URL)).pathname;
            console.log(req.method + " " + path);
            switch ( path ) {
                case '/theweather':
                    // make a request to cross-origin api
                    // forward response back to my client
                case '/sometext':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end("Just some text");
                    break;
                case '/somehtml':
                    setTimeout(() => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.end("<!doctype html><html><head><meta charset='UTF-8'><title>A web page</title></head><body><h1>Here's a web page</h1></body</html>");
                    }, 2000);

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
                    const animals = { animals: ANIMALS };
                    res.end(JSON.stringify(animals));
                    break;
                case '/suggest-animals':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    // Get the query string part of the URL
                    const query = (new URL(req.url, BASE_URL)).searchParams.get('q');

                    // If there is no query string, return an empty array
                    if ( ! query ) {
                        return res.end(JSON.stringify({suggestions: []}));
                    }
                    
                    let suggestions = ANIMALS.filter(animal => animal.startsWith(query.toLowerCase()));
                    
                    if ( suggestions.length < 10 ) {
                        // Improve suggestions by appending animals that contain the query string ANYWHERE
                        suggestions = suggestions.concat(ANIMALS.filter(animal => 
                            ! animal.startsWith(query.toLowerCase()) &&
                            animal.includes(query.toLowerCase())));
                    }

                    // Send back the first 10 suggestions
                    res.end(JSON.stringify({ suggestions: Array.from(suggestions).slice(0, 10) }));
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