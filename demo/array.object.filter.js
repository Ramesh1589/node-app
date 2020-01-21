
//Generic Array Of Object with Filter
let value = 0
let field= 'quantity'
const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5},
    {name: 'cherries', quantity: 10}

  ];
  
  function isCherries(inventory, field, value) { 
    return inventory.filter((fruit) => fruit[field] === value)
  }
  
  const array = isCherries(inventory,field, value)

  console.log('Filterd Array --->', array)