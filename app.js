    /**
     * @description Represent an Animal
     * @constructor
     * @param {string} species
     */
    function Animal(species) {
        this.species = species;
    }

    /**
     * @description Represent a Dino
     * @constructor
     * @param {string} species
     * @param {number} weight
     * @param {number} height
     * @param {string} diet
     * @param {string} where
     * @param {string} when
     * @param {string} fact
     */
    function Dino(species, weight, height, diet, where, when, fact) {
        Animal.call(this, species);
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    /**
     * @description Extends Animal prototype
     * @type {Animal}
     */
    Dino.prototype = Object.create(Animal.prototype);

    /**
     * @constructor Represent a Human
     * @param {string} name
     */
    function Human(name) {
        Animal.call(this, 'Human');
        this.name = name;
        this.getName = function() {
            return this.name;
        };
    }

    /**
     * @description Human Extends Animal prototype
     * @type {Animal}
     */
    Human.prototype = Object.create(Animal.prototype);

    /**
     * @description Animal species getter
     * @returns {string}
     */
    Animal.prototype.getSpecies = function() {
        return this.species;
    };

    /**
     * @description Dino weight getter
     * @returns {string}
     */
    Dino.prototype.getWeight = function() {
        return "It's weight is " +  this.weight + " lbs";
    };

    /**
     * @description Dino height getter
     * @returns {string}
     */
    Dino.prototype.getHeight = function() {
        return "It's height is " + this.height + " feets";
    };

    /**
     * @description Dino diet getter
     * @returns {string}
     */
    Dino.prototype.getDiet = function() {
        return "It's diet is " + this.diet;
    };

    /**
     * @description Dino where getter
     * @returns {string}
     */
    Dino.prototype.getWhere = function() {
        return "It comes from " + this.where;
    };

    /**
     * @description Dino whn getter
     * @returns {string}
     */
    Dino.prototype.getWhen = function() {
        return "It leaves in " + this.when;
    };

    /**
     * @description Dino fact getter
     * @returns {string}
     */
    Dino.prototype.getFact = function() {
        return this.fact;
    };

    /**
     * @description Fetch a list odf Dinos from json file
     * @type {Array} allDinos
     */
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
            .catch((e) => { /* TODO print error but no console allowed by rubric */ } );
        return allDinos;
    })();

    /**
     * @description Build a random fact
     * @param {number} randomNumber
     * @param {object} item
     * @returns {string}
     */
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
            case 6:
                return item.getFact();
        }
    }

    /**
     * @description Get form name input value
     * @returns {string}
     */
    const getHumanData = function () {
        return document.getElementById('name').value
    };

    /**
     * @description Build a header node element
     * @param item
     * @returns {HTMLHeadingElement}
     */
    function buildHeaderNode(item) {
        const gridItemHeader = document.createElement('h3');
        gridItemHeader.innerText = item.hasOwnProperty('name') ? item.getName() : item.getSpecies();
        return gridItemHeader;
    }

    /**
     * @description Build a paragraphe node element
     * @param {string} innerText
     * @returns {HTMLParagraphElement}
     */
    function buildParagraphNode(innerText) {
        const paragraph = document.createElement('p');
        paragraph.innerText = innerText;
        return paragraph;
    }

    /**
     * @description Build an item grid element
     * @param {object} item
     * @returns {HTMLDivElement}
     */
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
        if(innerItemContent !== undefined) {
            gridItem.appendChild(innerItemContent);
        }
        return gridItem;
    }

    /**
     * @description Build a pigeon's fact
     * @param {object} pigeon
     * @returns {HTMLParagraphElement}
     */
    function buildPigeonItem(pigeon) {
        return buildParagraphNode(pigeon.fact);
    }

    /**
     * @description Build a random Dino's fact
     * @param {object} dino
     * @returns {HTMLParagraphElement}
     */
    function buildDinoItem(dino) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        return buildParagraphNode(getDinoRandomFact(randomNumber, dino));
    }

    /**
     * @description Build an empty Human's fact
     * @returns {undefined}
     */
    function buildHumanItem() {
        return undefined;
    }

    /**
     * @description Build html markup depending on object
     * @param {object} item
     * @returns {HTMLParagraphElement|*}
     */
    const buildMarkupFromSpecies = function(item) {
        switch (item.getSpecies()) {
            case 'Pigeon':
                return buildPigeonItem(item);
            case 'Human':
                return buildHumanItem();
            default:
                return buildDinoItem(item)
        }
    };

    /**
     * @description Generate ann Array of Dom grid item
     * @param {Array} data
     * @returns {HTMLDivElement[]}
     */
    const generateTiles = function(data){
        return data.map(item => buildBox(item))
    };

    /**
     * @description Attach grid elements to dom
     * @param {array} tiles
     */
    function addTilesToDom(tiles){
        const main = document.getElementById('grid');
        tiles.map(tile => main.appendChild(tile));
    }

    /**
     * @description Remove Form from dom
     */
    function removeFromOnSubmitButtonClick() {
        const form = document.getElementById('dino-compare');
        form.parentNode.removeChild(form);
    }

    /**
     *
     * @param {Array} array
     * @param {number} index
     * @param elementsArray
     */
    function insertAt(array, index, ...elementsArray) {
        array.splice(index, 0, ...elementsArray);
    }

    /**
     * @description Select button as dom element
     * @type {HTMLElement}
     */
    const button = document.getElementById('btn');

    /**
     * @descriptionAttach event on button click
     */
    button.addEventListener('click', function() {
        const human = new Human(getHumanData());
        insertAt(DinosList, 4, human);
        const tileObjects = generateTiles(DinosList);

        removeFromOnSubmitButtonClick();
        addTilesToDom(tileObjects);
    });
