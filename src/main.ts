import './style.css'

console.log("test");
//html elements
const moviesNavLink = document.querySelector('#movies-link') as HTMLAnchorElement;
const charactersNavLink = document.querySelector('#characters-link') as HTMLAnchorElement;
const planetsNavLink = document.querySelector('#planets-link') as  HTMLAnchorElement;
const outputSection = document.querySelector('#output-section') as HTMLElement;

console.log(moviesNavLink,charactersNavLink,planetsNavLink,outputSection);

// api url & endpoints

const BASE_URL = "http https://swapi.dev/api/"

const MOVIES_URL = `${BASE_URL}films/`

const CHARACTERS_URL =  `${BASE_URL}people/`

const PLANETS_URL = `${BASE_URL}planets/`