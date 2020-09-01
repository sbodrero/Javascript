

    function Animal(species) {
        this.species = species;
    }

    // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact) {
        Animal.call(this, species);
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    Dino.prototype = Object.create(Animal.prototype);

    // Create Human Object
    function Human(name) {
        Animal.call(this, 'Sapiens');
        this.name = name;
        this.getName = function() {
            return this.name;
        };
    }

    Human.prototype = Object.create(Animal.prototype);

    Animal.prototype.getSpecies = function() {
        return this.species;
    };

    Dino.prototype.getWeight = function() {
        return "It's weight is " +  this.weight + " lbs";
    };

    Dino.prototype.getHeight = function() {
        return "It's height is " + this.height + " feets";
    };

    Dino.prototype.getDiet = function() {
        return "It's diet is " + this.diet;
    };

    // Create Dino Compare Method 1
    Dino.prototype.getWhere = function() {
        return "It comes from " + this.where;
    };

    // Create Dino Compare Method 4
    Dino.prototype.getWhen = function() {
        return "It leaves in " + this.when;
    };

    // Create Dino Compare Method 5
    Dino.prototype.getFact = function() {
        return this.fact;
    };

    // Create Dino Objects
    const DinosList = (function getDinosFromJson() {
        let allDinos = [];
        fetch('dino.json') // Call the fetch function passing the url of the API as a parameter
            .then(response => response.json())
            .then(dinos => {
                dinos.Dinos.map(dino => {
                    allDinos.push( new Dino(
                            dino.species,
                            dino.weight,
                            dino.height,
                            dino.diet,
                            dino.where,
                            dino.when,
                            dino.fact
                        ))
                    })
            })
            .catch((e) => console.log(e.toString()));
        return allDinos;
    })();

    function getDinoRandomFact(randomNumber, item) {
        switch (randomNumber) {
            case 1:
                return item.getWeight();
            case 2:
                return item.getHeight();
            case 3:
                return item.getDiet();
            case 4:
                return item.getWhere();
            case 5:
                return item.getWhen();
            default:
                return item.getFact();
        }
    }

    const getHumanData = function () {
        return document.getElementById('name').value
    };

    function buildHeaderNode(item) {
        const gridItemHeader = document.createElement('h3');
        gridItemHeader.innerText = item.hasOwnProperty('name') ? item.getName() : item.getSpecies();
        return gridItemHeader;
    }

    function buildParagraphNode(innerText) {
        const paragraph = document.createElement('p');
        paragraph.innerText = innerText;
        return paragraph;
    }

    function buildBox(item) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const gridItemHeader = buildHeaderNode(item);
        gridItem.appendChild(gridItemHeader);

        const img = document.createElement('img');
        const imageName = item.species.toLowerCase();
        img.src = 'images/' + imageName +'.png';
        gridItem.appendChild(img);

        const innerItemContent = buildMarkupFromSpecies(item);
        if(Array.isArray(innerItemContent)) {
            innerItemContent.map(content => gridItem.appendChild(content));
        } else {
            gridItem.appendChild(innerItemContent);
        }
        return gridItem;
    }

    function buildPigeonItem(pigeon) {
        return buildParagraphNode(pigeon.fact);
    }

    function buildDinoItem(dino) {
        let randomUniqueNumbers = [];
        let facts = [];
        while (randomUniqueNumbers.length < 2) {
            const randomNumber = Math.floor(Math.random() * 5) + 1;
            if (!randomUniqueNumbers.includes(randomNumber)) {
                randomUniqueNumbers.push(randomNumber);
                facts.push(buildParagraphNode(getDinoRandomFact(randomNumber, dino)));
            }
        }
        facts.push(buildParagraphNode(dino.getFact()))
        return facts;
    }

    function buildHumanItem(human) {
        return buildHeaderNode(human.getName())
    }

    const buildMarkupFromSpecies = function(item) {
        switch (item.getSpecies()) {
            case 'Pigeon':
                return buildPigeonItem(item);
            case 'Sapiens':
                return buildHumanItem(item);
            default:
                return buildDinoItem(item)
        }
    };


    // Generate Tiles for each Dino in Array
    const generateTiles = function(data){
        return data.map(item => buildBox(item))
    };

    // Add tiles to DOM
    function addTilesToDom(tiles){
        const main = document.getElementById('grid');
        tiles.map(tile => main.appendChild(tile));
    }

    // Remove form from screen
    function removeFromOnSubmitButtonClick() {
        const form = document.getElementById('dino-compare');
        form.parentNode.removeChild(form);
    }

    // On button click, prepare and display infographic
    const button = document.getElementById('btn');


    button.addEventListener('click', function() {
        const human = new Human(getHumanData());
        const tileObjects = generateTiles(DinosList);
        removeFromOnSubmitButtonClick();
        addTilesToDom(tileObjects);
    });

    /* fetch data
    https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data


const result2 = dinos.slice(0,4).concat([human]).concat(dinos.slice(4,8))
    */
