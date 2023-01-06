var merge = require('lodash.merge');

function makeRecord(Field, SubField) {
    return {[Field]: SubField};
}

function recurseRecord(field, subField, k, recordIndices) {
    let recordArr = [];
    // console.log('field');
    // console.log(field);
    // console.log('subField');
    // console.log(subField);    
    for (let i = 0; i < subField.length; i++) {
        if (subField[i].length == 3) {
            let record1 = makeRecord(field[k], subField[i][0])

            if (!recordIndices[subField[i][0]]) {recordIndices[subField[i][0]] = []};
            recordIndices[subField[i][0]].push(subField[i][1]);
            // console.log(subField[i][1]);
            // console.log('record Indices step');
            // console.log(recordIndices);

            k = k+1;
            let record2 = recurseRecord(field, subField[i][2], k, recordIndices);
            k = k-1;
            recordArr.push(merge(record1, record2));
        }

        else {
            recordArr.push(makeRecord(field[k], subField[i][0]));
            if (!recordIndices[subField[i][0]]) {recordIndices[subField[i][0]] = []};
            recordIndices[subField[i][0]].push(subField[i][1]);
            // console.log(subField[i][1]);
            // console.log('record Indices step');
            // console.log(recordIndices);
        }
    }
    return recordArr;
}

function compileRecord(objList, fieldList) {
    // console.log('in compileRecord');
    // console.log(objList);
    // console.log(fieldList);
    let outputArr = [];
    objList.forEach(obj => {
        if (Object.keys(obj).length > 1) {
            let currentObj = {};
            currentObj[fieldList[0]] = obj[fieldList[0]];
            let numKeys = Object.keys(obj).length - 1;
            let newObjList = [];

            for (let i = 0; i < numKeys; i++) {
                newObjList.push(obj[i]);
            }
            let output = compileRecord(newObjList, fieldList.slice(1, fieldList.length));
            
            output.forEach(o => {
                let currentRecord = [];
                currentRecord.push(currentObj);
                currentRecord.push(o);
                outputArr.push(currentRecord.flat());
            });
        }    
        else {
            let newArr = [];   
            newArr.push(obj);
            for (let i = 1; i < fieldList.length; i++) {
                let currentObj = {};
                currentObj[fieldList[i]] = 'All';
                newArr.push(currentObj);
            }
            outputArr.push(newArr);
        }
    });
    // console.log('outputArr');
    // console.log(outputArr);
    return outputArr;
}

function jsonAndFlatten(index) {
    if (index.length == 1) {
        return index[0];
    }
    else if (index.length > 1) {
        return(merge(index[0], jsonAndFlatten(index.slice(1, index.length))));
    }
    return;
}

function convertToJSONString(list) {
    let returnList = [];
    for (let i = 0; i < list.length; i++) {
        let fieldCombo = jsonAndFlatten(list[i]);
        returnList.push(JSON.stringify(fieldCombo));
    }
    return returnList;
}

function parseJSON(JSONStringArr) {
    for (let i = 0; i < JSONStringArr.length; i++) {
        JSONStringArr[i] = JSON.parse(JSONStringArr[i]);
    }
    return JSONStringArr;
}


//revise to include unique
function addIndex(storeArr, indices, whichIndex, dimen){
    // console.log('indices');
    // console.log(JSON.stringify(indices));

    let indexLog = {};

    for (let i = 0; i < storeArr.length; i++) {
        // console.log('storeArr[i]');
        // console.log(storeArr[i]);
        let recordKeys = Object.keys(storeArr[i]);
        // console.log('recordKeys');
        // console.log(recordKeys);
        for (let k = 0; k < recordKeys.length; k++) {
            let currValue = storeArr[i][recordKeys[k]];
            // console.log('currValue:' + currValue);
            // console.log(currValue);
            if (currValue != 'All') {
                // console.log('currValue');
                // console.log(currValue);
                let currIndex = indices[currValue].shift();
                // console.log('currIndex');
                // console.log(currIndex);

                //index handling
                if (currIndex) {
                    storeArr[i][whichIndex + dimen + 'Index'] = currIndex;
                    if (indexLog[currValue]) {
                        indexLog[currValue].push(currIndex);
                    }
                    else {
                        indexLog[currValue] = [];
                        indexLog[currValue].push(currIndex);
                    }

                    // console.log('indexLog:' + JSON.stringify(indexLog));
                }
                else {
                    storeArr[i][whichIndex + dimen + 'Index'] = indexLog[currValue].pop();
                }
                
            }
        }
    }
    return storeArr;
}

function mergeListOfJSON(list) {
    let accumulator = [{}];
    for (let i = 0; i < list.length; i++) {
        accumulator[0] = merge(accumulator[0], list[i]);
    }
    return accumulator;
}

function mergeRecords(recordOne, recordTwo) {
    let keys1 = Object.keys(recordOne);
    let keys2 = Object.keys(recordTwo);
    let masterRecord = [];

    let count = 0;

    for (let i = 0; i < keys1.length; i++) {

        for (let k = 0; k < keys2.length; k++) {
            // console.log(keys1[i]);
            // console.log(keys2[k]);
            let obj = (Object.assign({}, recordOne[i], recordTwo[k]));
            masterRecord.push(obj);
        }

    }

    return masterRecord;
}

function getValues(fieldRecords, dataObj, whichTable, caption) {
    // console.log('dataObj');
    // console.log(dataObj);
    let returnObj = [];
    let fieldRecordKeys = Object.keys(fieldRecords);
    for (let i = 0; i < fieldRecordKeys.length; i++) {
        let newRecord = fieldRecords[i];
        let rowIndex = whichTable + 'RowIndex';
        // console.log(rowIndex);
        let colIndex = whichTable + 'ColIndex';
        // console.log(colIndex);
        // console.log('RowIndex' + newRecord[whichTable + 'RowIndex']);
        // console.log('ColIndex' + newRecord[whichTable + 'ColIndex']);
        newRecord[whichTable + caption] = dataObj[newRecord[whichTable + 'RowIndex']][newRecord[whichTable + 'ColIndex']];
        returnObj.push(newRecord);
    }

    return returnObj;
}

export function assembleTableRecord(data, whichTable, fields, expandedFields, recordRowIndices, recordColIndices, 
                        recordArrRow, recordArrCol, fieldArrRow, fieldArrCol, storeArrRow, 
                            storeArrCol, storeArr) {
    let field = fields[0].row.dataField;
    let subField = expandedFields['rows'];
    recordArrRow = recurseRecord(field, subField, 0, recordRowIndices);
    // console.log('recordArrRow: ' + JSON.stringify(recordArrRow));
    // console.log('recordRowIndices: ' + JSON.stringify(recordRowIndices));
    // recordRowIndices = mergeListOfJSON(recordRowIndices);

    fieldArrRow = compileRecord(recordArrRow, field);
    // console.log('fieldArrRow after compileRecord' + JSON.stringify(fieldArrRow));

    storeArrRow = parseJSON(convertToJSONString(fieldArrRow));
    // console.log('storeArrRow after parse and convert:'+ JSON.stringify(storeArrRow));
    // console.log(JSON.stringify(recordRowIndices));

    storeArrRow = addIndex(storeArrRow, recordRowIndices, whichTable, 'Row');
    // console.log('storeArrRow after Index added');
    // console.log(storeArrRow);

    field = fields[0].column.dataField;
    subField = expandedFields['columns'];
    recordArrCol = recurseRecord(field, subField, 0, recordColIndices);
    // console.log('recordArrCol: ' + JSON.stringify(recordArrCol));
    // console.log('recordColIndices: ' + JSON.stringify(recordColIndices));
    
    // recordColIndices = mergeListOfJSON(recordColIndices);

    fieldArrCol = compileRecord(recordArrCol, field);
    // console.log('fieldArrCol after compileRecord' + JSON.stringify(fieldArrCol));

    storeArrCol = parseJSON(convertToJSONString(fieldArrCol));
    // console.log('storeArrCol after parse and convert:' + JSON.stringify(storeArrCol));
    // console.log(JSON.stringify(recordColIndices));

    storeArrCol = addIndex(storeArrCol, recordColIndices, whichTable, 'Col');
    // console.log('storeArrCol after Index added');
    // console.log(storeArrCol);

    storeArr = mergeRecords(storeArrCol, storeArrRow);
    // // console.log('storeArr: ' + JSON.stringify(storeArr));

    //storeArr = removeFlaggedFields()

    let recordIndices = merge(recordColIndices, recordRowIndices);
    // console.log(fields[1].caption);
    storeArr = getValues(storeArr, data.values, whichTable, fields[1].caption);

    return [storeArr, fields[1].caption, recordIndices];
}
