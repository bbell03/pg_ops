import {assembleTableRecord} from './RecordsHelpers.js';

export function appendFields(O) {
    console.log("field active");
    console.log(O);
    if (O.children) {return [O.value, O.index, O.children.map(child => appendFields(child))]}
    else {return [O.value, O.index]}
}

//review
//in progress
export function assembleActiveFields(fields) {
    console.log("fields");
    console.log(fields);
    let fObj = {};
    let dimen = ["row", "column"];
    let activeDataFields = {};


    //mind caption vs groupName ...
    //parse on groups?
    let jsonRef1 = {'dataField': [], 'dataType': [], 
    'caption' : [], 'areaIndex' : [], 'index': [],
    'groupIndex' : [], 'groupName' : []};

    let jsonRef2 = {'dataField': [], 'dataType': [], 
    'caption' : [], 'areaIndex' : [], 'index': [],
    'groupIndex' : [], 'groupName' : []};
    let jsonRef3 = {'dataField': [], 'dataType': [], 
    'caption' : [], 'areaIndex' : [], 'index': [],
    'groupIndex' : [], 'groupName' : []};

    let reference = Object.keys(jsonRef1);
    // console.log('reference');
    // console.log(reference);
    fObj[dimen[0]] = jsonRef1;
    fObj[dimen[1]] = jsonRef2;
    activeDataFields = jsonRef3;
    console.log(fields[3]);
    // console.log('fields in assemble fields');
    // console.log(fields);
    fields.forEach(field => {
        // console.log("each field"); 
        // console.log(field);
        // if (field.areaIndex >= 0) {
            if (field.area == "data") {
                // console.log('print data field');
                // console.log(field);

                //if (typeof(field[r]) == string);
                reference.forEach(r => {if (field[r] != undefined) activeDataFields[r].push(field[r])})
            }
            //console.log(field); console.log(r); console.log(field[r]); 
            else if (field.area == dimen[0]) {
                reference.forEach(r => {if (field[r] != undefined) fObj[dimen[0]][r].push(field[r])})
            }
            else if (field.area == dimen[1]) {
                reference.forEach(r => {if (field[r] != undefined) fObj[dimen[1]][r].push(field[r])})
            }
        // }
    });

    console.log('fObj');
    console.log(fObj);
    console.log('activeDataFields');
    console.log(activeDataFields);
    return [fObj, activeDataFields];
}


export function getTableRecord(data, whichTable, fields, expandedFields) {
    let record = null;
    let recordRowIndices = {};
    let recordColIndices = {};
    let recordArrRow = [];
    let fieldArrRow = []; 
    let storeArrRow = [];
    let recordArrCol = [];
    let fieldArrCol = [];    
    let storeArrCol = [];
    let storeArr = [];

    storeArr = assembleTableRecord(data, whichTable, fields, expandedFields, recordRowIndices, recordColIndices, 
        recordArrRow, recordArrCol, fieldArrRow, fieldArrCol, storeArrRow, 
            storeArrCol, storeArr)
    // index values with [row][col]

    return storeArr;

}

