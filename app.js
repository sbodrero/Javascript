
    // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }


    // Create Dino Objects
    const FetchDinosaurus = (function getDinosFromJson() {
        let allDinos = [];
        fetch('dino.json') // Call the fetch function passing the url of the API as a parameter
            .then(response => response.json())
            .then(dinos => {
                console.log(dinos.Dinos);
                allDinos = dinos.Dinos.map(dino => new Dino(dino))
            });
        return allDinos;
    })();

    console.log(FetchDinosaurus);

    // Create Human Object
    function Human(name) {
        this.name = name;
        function getName() {
            return this.name;
        }
    }
    // Use IIFE to get human data from form
    const getHumanData = (function() {

    })();

    // Create Dino Compare Method 1
    Dino.prototype.getWhere = function() {
        return this.where;
    };


    // Create Dino Compare Method 2
    Dino.prototype.getSpecies = function() {
        return this.species;
    };

    // Create Dino Compare Method 3
    Dino.prototype.getDiet = function() {
        return this.diet;
    };

    // Create Dino Compare Method 4
    Dino.prototype.getWhen = function() {
        return this.when;
    };

    // Create Dino Compare Method 5
    Dino.prototype.geFact = function() {
        return this.fact;
    };

    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic

    /* fetch data
    https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data


const dinos = [1,2,3,4,5,6,7,8];
const human = 'h';
const result = [];
for (let i = 0; i < 4; i++) {
  result.push(dinos[i]);
}
result.push(human);
for (let i = 4; i < 8; i++) {
  result.push(dinos[i]);
}

const result2 = dinos.slice(0,4).concat([human]).concat(dinos.slice(4,8))
console.log(result);
console.log(result2);

{
                // Your code for handling the data you get from the API
                console.log(dinos.json());
                dinos.json().map(
                    dino => {
                        allDinos.push(new Dino(dino));
                        console.log(allDinos);
                    }
                )
        }
    */
