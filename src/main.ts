import { IMovieResult } from './contracts/IMovie';
import { IPeopleResult } from './contracts/IPeople';
import { IPlanetResult } from './contracts/IPlanet';
import './style.css'

console.log("test");
//html elements
const moviesNavLink = document.querySelector('#movies-link') as HTMLAnchorElement;
const charactersNavLink = document.querySelector('#characters-link') as HTMLAnchorElement;
const planetsNavLink = document.querySelector('#planets-link') as  HTMLAnchorElement;
const outputSection = document.querySelector('#output-section') as HTMLElement;

console.log(moviesNavLink,charactersNavLink,planetsNavLink,outputSection);

// api url & endpoints

const BASE_URL = "https://swapi.dev/api/"

const MOVIES_URL = `${BASE_URL}films/`

const CHARACTERS_URL =  `${BASE_URL}people/`

const PLANETS_URL = `${BASE_URL}planets/`


//fetching characters on nav link click

moviesNavLink?.addEventListener('click', async() => {
  try {
    const response = await fetch(MOVIES_URL);
    const data = await response.json();

    outputSection.innerHTML = "";
    console.log(data.results);
    
    data.results.forEach((result: IMovieResult) => {
      const movieList = document.createElement('ul') as HTMLUListElement;
      movieList.className = "movie-list-style"
      movieList.innerHTML = displayMovieList(result) ;
      outputSection.appendChild(movieList)
    });
  } catch (error) {
    console.error("fetch failed!", error)
  }
})

//function to display list

function displayMovieList (movie: IMovieResult):string {
  const resultAsString = `
  <li><span>Title: </span> ${movie.title}</li>
  <li><span>Characters: </span> ${movie.characters}</li>
  <li><span>Director: </span> ${movie.director}</li><span>
  <li><span>Producer: </span> ${movie.producer}</li>
  <li><span>Release Date: </span> ${movie.release_date}</li>
  `
  return resultAsString;
}

//fetch characters
charactersNavLink?.addEventListener('click', async() => {
  try {
    const response = await fetch(CHARACTERS_URL);
    const data = await response.json()
    console.log(data.results);
    
    outputSection.innerHTML = "";
    data.results.forEach(async (result: IPeopleResult) => {
      const characterList = document.createElement('ul') as HTMLUListElement;
      characterList.className = "character-list-style"
      characterList.innerHTML = await displayCharacterList(result);
      outputSection.appendChild(characterList)
    });

  } catch (error) {
    console.error('fetch failed', error)
  }
})

//display in html

async function displayCharacterList(character: IPeopleResult){
  const useInternalLink = await internalPlanetLink(character.homeworld) //necessary to get & show info behind the link in homeworld value
  const resultAsString = `
   <li><span>Name: </span> ${character.name}</li>
   <li><span>Birthyear: </span> ${character.birth_year}</li>
   <li><span>Gender: </span> ${character.gender}</li><span>
   <li><span>Homeworld: </span> ${useInternalLink}</li>
  `
  return resultAsString;
}

//necessary to get info behind link of homeland value, calling in line 83
async function internalPlanetLink(homeworld:string):Promise<string> {
  const response:Response = await fetch(homeworld);
  const data:IPlanetResult = await response.json();
  return data.name;
}

// fetch planets

planetsNavLink?.addEventListener('click', async() => {
  try {
    const response = await fetch (PLANETS_URL);
    const data = await response.json();
    console.log(data.results);
    
    outputSection.innerHTML = "";
    data.results.forEach(async(result: IPlanetResult) => {
      const planetList = document.createElement('ul') as HTMLUListElement;
      planetList.className = "planet-list-style";
      planetList.innerHTML = await displayPlanetsList(result);
      outputSection.appendChild(planetList);
    })
  } catch (error) {
    console.error('fetch failed', error)
  }
})

async function displayPlanetsList(planet: IPlanetResult){
  const useInternalLink = await internalResidentLink(planet.residents)
  const resultAsString = `
  <li><span>Name: </span> ${planet.name}</li>
  <li><span>Terrain: </span> ${planet.terrain}</li>
  <li><span>Climate: </span> ${planet.climate}</li><span>
  <li><span>Diameter: </span> ${planet.diameter}</li>
  <li><span>Population: </span> ${planet.population}</li>
  <li><span>Residents: </span> ${useInternalLink}</li>
  `
  return resultAsString;
}

/* async function internalResidentLink(residents : string[]): Promise<string[]> {
  residents.forEach(async(resident)=> {
    const response = await fetch(resident);
    const data = await response.json();
    return data.residents
  })
} */

  async function internalResidentLink(residents: string[]): Promise<string[]> { // Verwende Promise.all, um alle Residents-URLs zu fetchen 
    const residentNames = await Promise.all(residents.map(async (resident) => { 
      const response = await fetch(resident); 
      const data = await response.json(); 
      return data.name; 
      // Angenommen, dass das Feld "name" im Response vorhanden ist
       })); return residentNames; }