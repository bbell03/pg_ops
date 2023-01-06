import {assembleTableRecord} from './RecordsHelpers.js';

export function appendFields(O) {
    if (O.children) {return [O.value, O.index, O.children.map(child => appendFields(child))]}
    else {return [O.value, O.index]}
}

//review
export function assembleActiveFields(fields) {
    let fObj = {};
    let dimen = ['row', 'column'];
    let activeDataFields = {};
    let jsonRef1 = {'dataField': [], 'dataType': [], 
    'caption' : [], 'areaIndex' : []};
    let jsonRef2 = {'dataField': [], 'dataType': [], 
    'caption' : [], 'areaIndex' : []};
    let jsonRef3 = {'dataField': [], 'dataType': [], 
    'caption' : [], 'areaIndex' : []};
    let reference = Object.keys(jsonRef1);
    fObj[dimen[0]] = jsonRef1;
    fObj[dimen[1]] = jsonRef2;
    activeDataFields = jsonRef3;

    // console.log('fields in assemble fields');
    // console.log(fields);
    fields.forEach(field => {
        // console.log(field);
        if (field.areaIndex >= 0) {
            if (field.area == "data") {
                // console.log('print data field');
                // console.log(field);
                reference.forEach(r => {activeDataFields[r].push(field[r]);})
            }
            else if (field.area == dimen[0]) {
                reference.forEach(r => {fObj[dimen[0]][r].push(field[r]);})
            }
            else if (field.area == dimen[1]) {
                reference.forEach(r => {fObj[dimen[1]][r].push(field[r]);})
            }
        }
    });

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

