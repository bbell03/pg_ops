// function stringGen(length) {
//   return Math.random().toString(20).substr(2, length);
// }

//
// const short = (dateString) => dateString.toLocaleDateString('en-US', {
//   day: '2-digit',
//   month: '2-digit',
//   year: 'numeric',
// });
let types = ['fruits', 'vegetables'];
let vegetable = ['lettuce', 'kale', 'carrot'];
let fruit = ['apple', 'strawberry', 'banana'];
let continents_source = ["Asia", "Africa", "South America", "Europe", "Australia"];
let continents_target = ["North_America"]
var keys = ["organic", "type", "name", "date", "price", "source", "target"];

let _start = new Date('January 1, 1953 03:24:00');
let _end = new Date('December 31, 1953 04:32:00');


function numGen(range) {
  return Math.floor(Math.random() * range);
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

function JSONFactory(keys) {
  let obj = {}
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == "type") {
      obj["type"] = types[Math.floor(Math.random() * 2)];
    }
    else if (keys[i] == "name") {
      if (obj["type"] == 'vegetables') {
        obj[keys[i]] = vegetable[Math.floor(Math.random() * vegetable.length)];
      }
      else if (obj["type"] == 'fruits') {
        obj[keys[i]] = fruit[Math.floor(Math.random() * fruit.length)];
      }
    }
    else if (keys[i] == "date") {
        obj[keys[i]] = randomDate(_start, _end);
    }
    else if (keys[i] == "organic") {
        obj[keys[i]] = Math.round(Math.random() * 1);
    }
    else if (keys[i] == "price") {
      if (obj["type"] == "vegetables") {
        obj["price"] = (Math.random() + 0.4);
      }
      else if (obj["type"] == "fruits") 
        obj["price"] = (Math.random() + 0.6);
    }
    else if (keys[i] == "source") {
      obj["source"] = continents_source[Math.floor(Math.random() * continents_source.length)];
    }
    else if (keys[i] == "target") {
      obj["target"] = continents_target[Math.floor(Math.random() * continents_target.length)];
      // while(obj["target"] == obj["source"]) {
      //   obj["target"] = continents[Math.floor(Math.random() * continents_target.length)];
      // }
    }
  }

  return obj;
}

export function ArrayGenerator(length) {
  let json_store = []
  for (let i = 0; i < length; i++) {
    json_store.push(JSONFactory(keys));
  }
  return json_store;
}


export {keys};
