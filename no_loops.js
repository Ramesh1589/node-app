const heroes = [
    {name: 'Hulk', strength: 90000, sex: 'm'},
    {name: 'Spider-Man', strength: 25000, sex: 'm'},
    {name: 'Hawk Eye', strength: 136, sex: 'm'},
    {name: 'Thor', strength: 100000, sex: 'm'},
    {name: 'Black Widow', strength: 136, sex: 'f'},
    {name: 'Vision', strength: 5000, sex: 'm'},
    {name: 'Scarlet Witch', strength: 60, sex: 'f'},
    {name: 'Mystique', strength: 120, sex: 'f'},
    {name: 'Namora', strength: 75000, sex: 'f'},
];  




function isFemaleHero(hero) {
    return (hero.sex === 'f');
}

function isSuperhuman(hero) {
    return (hero.strength >= 500);
}


const femaleHeroes = heroes.filter(isFemaleHero);

const superhumans  = heroes.filter(isSuperhuman);

console.log("23", femaleHeroes)

console.log("27", superhumans)



const data = [
    {name: 'Hulk', strength: 90000},
    {name: 'Spider-Man', strength: 25000},
    {name: 'Hawk Eye', strength: 136},
    {name: 'Thor', strength: 100000},
    {name: 'Black Widow', strength: 136},
    {name: 'Vision', strength: 5000},
    {name: 'Scarlet Witch', strength: 60},
    {name: 'Mystique', strength: 120},
    {name: 'Namora', strength: 75000},
];

function greaterStrength(champion, contender) {
    return (contender.strength > champion.strength) ? contender : champion;
}

function addStrength(tally, hero) {
    return tally + hero.strength;
}
const strongestHero = data.reduce(greaterStrength, {strength: 0});

console.log("56", strongestHero)
//Output:
// { name: 'Thor', strength: 100000 }

const combinedStrength = data.reduce(addStrength, 0);

console.log("62", combinedStrength)
//Output: 295452


// ********** Javascript Mapping **********
const fellowship = [
    'frodo',
    'sam',
    'gandalf',
    'aragorn',
    'boromir',
    'legolas',
    'gimli',
];

const band = [
    'John',
    'Paul',
    'George',
    'Ringo',
];

function map(f, a) {
    if (a.length === 0) { return []; }
    return [f(a[0])].concat(map(f, a.slice(1)));
}

function oodlify(s) {
    return s.replace(/[aeiou]/g, 'oodle');
}


let bandoodle     = band.map(oodlify);

console.log("92", bandoodle)

// let floodleship   = fellowship.map(oodlify);