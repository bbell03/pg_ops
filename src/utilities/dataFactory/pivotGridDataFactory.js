import {assembleActiveFields, appendFields, getTableRecord} from './RecordsAndFields.js';

//dataFactory for Dev Extreme Pivot Grid
//gets fields and data from object to create a JSON record for each obj
//in dev extreme datasource format ready for loading into new component

//REMOVE UNNECESSARY PARAMS AND RETURN VALUES
export default function dataFactory(topDatObj, middleDatObj) {
    // console.log('topDatObj:');
    // console.log(topDatObj);

    // console.log('middleDatObj');
    // console.log(middleDatObj);

    //retrieves data fields
    console.log("top fields before assembly");
    console.log(topDatObj._fields);
    let Fields1 = assembleActiveFields(topDatObj._fields);
    // console.log('assembledFields');
    // console.log(Fields1);

    console.log("mid fields before assembly")
    console.log(middleDatObj._fields);
    let Fields2 = assembleActiveFields(middleDatObj._fields);
    // console.log('assembledFields2');
    // console.log(Fields2);
    //make step to continuity check fields
    // check all fields and return flagged field list of fields unique to top or middle
    let valueFields1 = getFieldExpansion(topDatObj._data)
    // console.log('valueFields1');
    // console.log(valueFields1);

    let valueFields2 = getFieldExpansion(middleDatObj._data)
    // console.log('valueFields2');
    // console.log(valueFields2);

    let options = ['Top', 'Middle'];

    //assembles fields into records complete with data points 
    //according to row and column indices
    let Obj1 = getTableRecord(topDatObj._data, options[0], Fields1, valueFields1);
    // console.log('storeArr1 values: ' + JSON.stringify(Obj1[0]));
    let Obj2 = getTableRecord(middleDatObj._data, options[1], Fields2, valueFields2);
    // console.log('storeArr2 values: ' + JSON.stringify(Obj2[0]));

    //get fields unique to either object to discount during diff
    let fieldRef = parseUniqueFields(Obj1[2], Obj2[2]);
    // console.log('recordIndices1: ' + JSON.stringify(Obj1[2]));
    // console.log('recordIndices2: ' + JSON.stringify(Obj2[2]));
    // console.log('commonFields: ' + JSON.stringify(fieldRef[0]));
    // console.log('uniqueFields: ' + JSON.stringify(fieldRef[1]));

    let Obj1Trim = trimObj(Obj1[0], fieldRef[1], []);

    // console.log('newObj1: ' + JSON.stringify(Obj1Trim[0]));
    // console.log('trim1: ' + JSON.stringify(Obj1Trim[1]));

    let Obj2Trim = trimObj(Obj2[0], fieldRef[1], Obj1Trim[1]);

    let trim = cleanValueField(Obj2Trim[1], Obj1[1]);

    // console.log('newObj2: ' + JSON.stringify(Obj2Trim[0]));
    // console.log('trim2: ' + JSON.stringify(Obj2Trim[1]));

    let diffStore = diffObjs(Obj1Trim[0], Obj2Trim[0], options[0], options[1], Obj1[1]);
    // console.log('diffStore: ' + JSON.stringify(diffStore));

    diffStore = diffStore.concat(trim);
    // console.log('diffStore w Trim: ' + JSON.stringify(diffStore));
    return diffStore;
}

function getFieldExpansion(data) {
    // console.log("in getFieldExpansion");
    // console.log(data);
    // console.log(JSON.stringify(data));
    // console.log(typeof(data));
    // console.log(data.columns[0].value);
    // console.log(data.rows);
    let rowOptions = data.rows.map(x => appendFields(x));
    // console.log("rowOptions");
    // console.log(rowOptions);
    let colOptions = data.columns.map (y => appendFields(y));
    let expandedFields = {'rows': rowOptions, 'columns': colOptions};
    // console.log("expanded fields");
    // console.log(expandedFields);
    return expandedFields;
}

function cleanValueField(Obj, valueField) {
    let string1 = 'Top';
    let string2 = 'Middle';
    // console.log('string1: ' + JSON.stringify(string1));
    // console.log('string2: ' + JSON.stringify(string2));
    // console.log('valueField:' + JSON.stringify(valueField));
    for (let i = 0; i < Obj.length; i++) {
        if (Obj[i][(string1 + valueField)]) {
            Obj[i][valueField] = Obj[i][(string1 + valueField)][0];
            delete(Obj[i][(string1 + valueField)]);
        }
        else if (Obj[i][(string2 + valueField)]) {
            Obj[i][valueField] = Obj[i][(string2 + valueField)][0];
            delete(Obj[i][(string2 + valueField)]);
        }
    }

    return Obj;
}

function parseUniqueFields(recordIndex1, recordIndex2) {
    // console.log('inUniqueFields');
    // console.log(recordIndex1);
    // console.log(recordIndex2);
    let uniqueFields = [];
    let commonFields = [];

    let keyFound = false;
    let keys1 = Object.keys(recordIndex1);
    let keys2 = Object.keys(recordIndex2);

    for (let i = 0; i < keys1.length; i++) {
        keyFound = false;
        for (let k = 0; k < keys2.length; k++) {
            if (keys1[i] == keys2[k]) {
                keyFound = true;
                commonFields.push(keys1[i]);
            }
            // console.log(keys1[i]);
            // console.log(keyFound);
        }
        if (!keyFound) {
            uniqueFields.push(keys1[i]);
        }
    }

    //could make more compact -> modulate
    for (let i = 0; i < keys2.length; i++) {
        keyFound = false;
        for (let k = 0; k < keys1.length; k++) {

            if (keys2[i] == keys1[k]) {
                keyFound = true;
            }
            // console.log(keys2[i]);
            // console.log(keyFound);
        }
        if (!keyFound) {
            uniqueFields.push(keys2[i]);
        }
    }

    return [commonFields, uniqueFields];
}

function trimObj(Obj, uniqueFields, trim) {
    // console.log('uniqueFields: ' + JSON.stringify(uniqueFields));
    let trimmedObj = [];
    let isUnique = false;

    for (let i = 0; i < Obj.length; i++) {
        let currRecord = Obj[i];
        let keys = Object.keys(Obj[i]);
        // console.log('currKeys: ' + JSON.stringify(keys));

        for (let k = 0; k < keys.length; k++) {
            for (let c = 0; c < keys.length; c++) {
              if (currRecord[keys[k]] == uniqueFields[c]) {
                //   console.log('currRecordKeys: ' + JSON.stringify(currRecord[keys[k]]))
                //   console.log('uniqueFieldStep: ' + JSON.stringify(uniqueFields[c]));
                  isUnique = true;
                  trim.push(currRecord)
              }
            }
        }

        if (!isUnique) {
            trimmedObj.push(currRecord);
        }

        isUnique = false;
    }

    return [trimmedObj, trim];
}


function diffObjs(Obj1, Obj2, top, middle, fieldCaption) {
    let Obj3 = [];

    if (Obj1.length == Obj2.length) {
        for(let i = 0; i < Obj1.length; i++) {
            // console.log('fieldcaption')
            // console.log(top+fieldCaption);
            // console.log(middle+fieldCaption);
            // console.log(Obj3[middle+fieldCaption]);
            // console.log('Obj1');
            // console.log(Obj1[i]);
            // console.log('Obj2');
            // console.log(Obj2[i]);
            Obj3[i] = Obj1[i]

            delete Obj3[(middle+fieldCaption)];
            //finnicky
            Obj3[i][fieldCaption] = Obj2[i][middle+fieldCaption][0] - Obj1[i][top+fieldCaption][0];
            delete Obj3[i][(top+fieldCaption)];
        }
    }

    return Obj3; 
}