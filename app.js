   const dinosJSON = {"Dinos":[{"species":"Triceratops","weight":13000,"height":114,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"First discovered in 1889 by Othniel Charles Marsh"},{"species":"Tyrannosaurus Rex","weight":11905,"height":144,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"The largest known skull measures in at 5 feet long."},{"species":"Anklyosaurus","weight":10500,"height":55,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"Anklyosaurus survived for approximately 135 million years."},{"species":"Brachiosaurus","weight":70000,"height":"372","diet":"herbavor","where":"North America","when":"Late Jurasic","fact":"An asteroid was named 9954 Brachiosaurus in 1991."},{"species":"Stegosaurus","weight":11600,"height":79,"diet":"herbavor","where":"North America, Europe, Asia","when":"Late Jurasic to Early Cretaceous","fact":"The Stegosaurus had between 17 and 22 seperate places and flat spines."},{"species":"Elasmosaurus","weight":16000,"height":59,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Elasmosaurus was a marine reptile first discovered in Kansas."},{"species":"Pteranodon","weight":44,"height":20,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Actually a flying reptile, the Pteranodon is not a dinosaur."},{"species":"Pigeon","weight":0.5,"height":9,"diet":"herbavor","where":"World Wide","when":"Holocene","fact":"All birds are living dinosaurs."}]}

    /**
     * @description Represent an Animal
     * @constructor
     * @param {string} species
     * @param {number} weight
     * @param {number} height
     * @param {string} diet
     */
    function Animal(species, weight, height, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
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
        Animal.call(this, species, weight, height, diet);
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
     * @param {number} weight
     * @param {number} height
     * @param {string} diet
     */
    function Human(name, weight, height, diet) {
        Animal.call(this, 'Human', weight, height, diet);
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
     * @description Animal weight getter
     * @returns {number}
     */
    Animal.prototype.getWeight = function() {
        return this.weight;
    };

    /**
     * @description Animal height getter
     * @returns {number}
     */
    Animal.prototype.getHeight = function() {
        return this.height;
    };

    /**
     * @description Animal diet getter
     * @returns {string}
     */
    Animal.prototype.getDiet = function() {
        return this.diet;
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
     * @description Fetch a list of Dinos from json object
     * @type {Array} allDinos
     */
    const DinosList = (function() {
        let allDinos = [];
        const { Dinos } = dinosJSON;
        Dinos.map(dino => {
            allDinos.push( new Dino(
                    dino.species,
                    dino.weight,
                    dino.height,
                    dino.diet,
                    dino.where,
                    dino.when,
                    dino.fact
                ))
            });
        return allDinos;
    })();

    /**
     * @description Build a random fact
     * @param {number} randomNumber
     * @param {object} item
     * @param {object} human
     * @returns {string}
     */
    function getDinoRandomFact(randomNumber, item, human) {
        switch (randomNumber) {
            case 1:
                return compareWeight(item.getWeight(), human.getWeight());
            case 2:
                return compareHeight(item.getHeight(), human.getHeight());
            case 3:
                return compareDiet(item.getDiet(), human.getDiet());
            case 4:
                return item.getWhere();
            case 5:
                return item.getWhen();
            case 6:
                return item.getFact();
        }
    }

    //const getHeight = function()

    /**
     * @description Get form name input value
     * @returns {object}
     */
    const getHumanData = function () {
        const name = document.getElementById('name').value || 'Nobody';
        const weight = document.getElementById('weight').value || 0;
        const heightInFeets = document.getElementById('feet').value || 0;
        const heightInInches = document.getElementById('inches').value || 0;
        const height = heightInFeets * 12 + heightInInches;
        const diet = document.getElementById('diet').value;
        return { name, weight, height, diet };
    };

    /**
     * @description Build sentence from equal property
     * @param {string} prop
     * @returns {string}
     */
    const getEqualSentence = function(prop){
        return `It has the same ${prop} as human`;
    };

    /**
     * @description Build sentence from diff property
     * @param {number} value
     * @param {string} prop
     * @param {string} comparator
     * @param {string} unit
     * @returns {string}
     */
    const getCompareSentence = function(value, prop, comparator, unit) {
        return `It's ${value} ${unit} ${comparator} ${prop} than human`
    };

    /**
     * @description Compare Dino and human weight
     * @param dinoWeigh
     * @param humanWeight
     * @returns {string}
     */
    const compareWeight = function(dinoWeigh, humanWeight) {
        let diff;
        if(dinoWeigh === humanWeight) {
            return getEqualSentence('weight');
        }
        if(dinoWeigh < humanWeight) {
            diff = humanWeight - dinoWeigh;
            return getCompareSentence(diff, 'weight', 'less', 'lbs');
        }
        diff = dinoWeigh - humanWeight;
        return getCompareSentence(diff, 'weight', 'more', 'lbs');
    };

    /**
     * @description Compare dino and human height
     * @param dinoHeight
     * @param humanHeight
     * @returns {string}
     */
    const compareHeight = function(dinoHeight, humanHeight){
        let diff;
        if(dinoHeight === humanHeight) {
            return getEqualSentence('height');
        }
        if(dinoHeight < humanHeight) {
            diff = humanHeight - dinoHeight;
            return getCompareSentence(diff, 'height', 'less', 'feets');
        }
        diff = dinoHeight - humanHeight;
        return getCompareSentence(diff, 'height', 'more', 'feets');
    };

    /**
     * @description Compare dino and human diet
     * @param dinoDiet
     * @param humanDiet
     * @returns {string}
     */
    const compareDiet = function(dinoDiet, humanDiet) {
        if(dinoDiet === humanDiet) {
            return getEqualSentence('diet');
        }
        return "It's diet is different of the human's" ;
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
     * @param {object} human
     * @returns {HTMLDivElement}
     */
    function buildBox(item, human) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const gridItemHeader = buildHeaderNode(item);
        gridItem.appendChild(gridItemHeader);

        const img = document.createElement('img');
        const imageName = item.species.toLowerCase();
        img.src = 'images/' + imageName +'.png';
        gridItem.appendChild(img);

        const innerItemContent = buildMarkupFromSpecies(item, human);
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
     * @param {object} human
     * @returns {HTMLParagraphElement}
     */
    function buildDinoItem(dino, human) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        return buildParagraphNode(getDinoRandomFact(randomNumber, dino, human));
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
     * @param {object} human
     * @returns {HTMLParagraphElement|*}
     */
    const buildMarkupFromSpecies = function(item, human) {
        switch (item.getSpecies()) {
            case 'Pigeon':
                return buildPigeonItem(item);
            case 'Human':
                return buildHumanItem();
            default:
                return buildDinoItem(item, human)
        }
    };

    /**
     * @description Generate ann Array of Dom grid item
     * @param {Array} data
     * @param {object} human
     * @returns {HTMLDivElement[]}
     */
    const generateTiles = function(data, human){
        return data.map(item => buildBox(item, human))
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
     * @description Attach event on button click
     */
    button.addEventListener('click', function() {
        const data = getHumanData();
        const { name, weight, height, diet } = data;
        const human = new Human(name, weight, height, diet);
        insertAt(DinosList, 4, human);
        const tileObjects = generateTiles(DinosList, human);

        removeFromOnSubmitButtonClick();
        addTilesToDom(tileObjects);
    });
