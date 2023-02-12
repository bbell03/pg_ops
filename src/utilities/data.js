import {ArrayGenerator, ArrayGenerator_Month} from './data_gen_ex.js';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function pg_to_sankey(obj) {

    let result = [];

    for (let i = 0; i < obj.length; i++) {
        var new_obj = {source: "", target: "", weight: 0};
        var found = false;

        for (var k = 0; k < result.length; k++) {
            if (result[k]["source"] == obj[i]["source"] &&
                result[k]["target"] == obj[i]["target"]) {
                result[k]["weight"]+=obj[i]["price"];
                found = true;
            }
        }

        if (found == false) {
            new_obj["source"] = obj[i]["source"];
            new_obj["target"] = obj[i]["target"];
            new_obj["weight"] = obj[i]["price"];
            result.push(new_obj);
        }

    }
    // console.log("sankey data");
    // console.log(result);
    return result;
}

function pg_to_polar(obj) {
    let new_obj = {};
    let result = [];

    for (let i = 0; i < monthNames.length; i++) {
        new_obj[i] = {};
        new_obj[i]["arg"] = monthNames[i];
        new_obj[i]["fruits"] = 0;
        new_obj[i]["vegetables"] = 0;
    }
    for (let i = 0 ; i < obj.length ; i++) {
        let index = obj[i]["date"].getMonth();
        let type = obj[i]["type"];
        new_obj[index][type]++; 

    }
    //flatten structure...
    for (let i = 0 ; i < 12 ; i++) {
        result.push(new_obj[i]);
    }

    return result;
}

export const types = ['scatter', 'line', 'area', 'bar', 'stackedbar'];
const data = ArrayGenerator(1000);
const data2 = ArrayGenerator(1000);
console.log("data");
console.log(data);
console.log("data2");
console.log(data2);
const polar_data = pg_to_polar(data);
const sankey_data = pg_to_sankey(data);
export {polar_data};
export {sankey_data};
export {data};
export {data2};



