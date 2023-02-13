import React from 'react';
import 'devextreme/dist/css/dx.material.teal.dark.css';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import CustomStore from "devextreme/data/custom_store";

import Chart, {
  AdaptiveLayout,
  CommonSeriesSettings,
  Size,
  Tooltip,
} from 'devextreme-react/chart';

import PivotGrid, {
  FieldChooser,
} from 'devextreme-react/pivot-grid';

import {data, data2} from './utilities/data';
import dataFactory from './utilities/dataFactory/pivotGridDataFactory.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       pg1 : dataSource,
       pg2: dataSource2,
       pg3: dataSource3
     };
    this.pivotGrid1 = React.createRef();
    this.pivotGrid2 = React.createRef();
    this.pivotGrid3 = React.createRef();
    this.pivots = [this.pivotGrid1, this.pivotGrid2, this.pivotGrid3];
    this.chart = React.createRef();
    this.pivotReady = this.pivotReady.bind(this);
    this.optionChanged = this.optionChanged.bind(this);
  }

  pivotReady(e) {
    const stateEtalon = e.component.getDataSource().state();
    this.pivots
      .map((pivotRef) => pivotRef.current.instance)
      .forEach((pivot) => {
        if (pivot !== e.component) {
          const pivotState = pivot.getDataSource().state();
          if (JSON.stringify(pivotState) !== JSON.stringify(stateEtalon))
            pivot.getDataSource().state(stateEtalon);
        }
      });
    
  }

  optionChanged(e) {
    console.log("option changed: " + e.id);
    console.log(e.current.instance.getDataSource());
  }

  componentDidMount() {
    this.pivotGrid1.current.instance.bindChart(this.chart.current.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });

    let pg_data = this.state.pg1;
    console.log("pg1")
    console.log(pg_data);

    let pg2_data = this.state.pg2;
    console.log("pg2")
    console.log(pg2_data);

    let pg3_data = this.state.pg3;
    console.log("pg3")
    console.log(pg3_data);

    console.log("pg1 ref.current.instance.getDataSource()")
    console.log(this.pivotGrid1.current.instance.getDataSource());

    console.log("pg2 ref.current.instance.getDataSource()")
    console.log(this.pivotGrid2.current.instance.getDataSource());

    console.log("pg3 ref.current.instance.getDataSource()")
    console.log(this.pivotGrid3.current.instance.getDataSource());

    let columnFieldAreas = this.pivotGrid1.current.instance.getDataSource().getAreaFields('column', true);
    let rowFieldAreas = this.pivotGrid1.current.instance.getDataSource().getAreaFields('row', true)
    console.log(columnFieldAreas);
    console.log(rowFieldAreas);

    // let test_diff = dataFactory(this.pivotGrid1.current.instance.getDataSource(),
    //                             this.pivotGrid2.current.instance.getDataSource());
    // console.log("test diff with datafactory");
    // console.log(test_diff);
   
    // if (this.state.pg3 != {}) {
    //   console.log("state set");
    // }
    // console.log(this.pivotGrid1.current.instance.getDataSource());
    // this.pivotGrid.bindChart(this.chart, {
    //   dataFieldsDisplayMode: 'splitPanes',
    //   alternateDataFields: false,
    // });
    setTimeout(() => {
      dataSource.expandHeaderItem('row', ['North America']);
      dataSource.expandHeaderItem('column', [2013]);
    });
  }

  render() {
    return (<div>
      <React.Fragment>
        <Chart theme='generic.dark' ref={this.chart}>
          <Size height={200} />
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
          <CommonSeriesSettings type="area" />
          <AdaptiveLayout width={450} />
        </Chart>
        <PivotGrid
          id="pivotgrid1"
          dataSource={this.state.pg1}
          onContentReady={this.pivotReady}
          onOptionChanged={this.optionChanged}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={true}
          showColumnGrandTotals={true}
          showRowTotals={true}
          showRowGrandTotals={true}
          ref={this.pivotGrid1}
        >
          <FieldChooser enabled={true} height={400} />
        </PivotGrid>
        <PivotGrid
          id="pivotgrid2"
          dataSource={this.state.pg2}
          onContentReady={this.pivotReady}
          onOptionChanged={this.optionChanged}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={true}
          showColumnGrandTotals={true}
          showRowTotals={true}
          showRowGrandTotals={true}
          ref={this.pivotGrid2}
        >
          <FieldChooser enabled={true} height={400} />
        </PivotGrid>
        <PivotGrid
          id="pivotgrid3"
          dataSource={this.state.pg3}
          onContentReady={this.pivotReady}
          onOptionChanged={this.optionChanged}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={true}
          showColumnGrandTotals={true}
          showRowTotals={true}
          showRowGrandTotals={true}
          ref={this.pivotGrid3}
        >
          <FieldChooser enabled={true} height={400} />
        </PivotGrid>
      </React.Fragment>
      </div>
    );
  }
}

const dataSource = new PivotGridDataSource({
  fields: [
    {
      caption: "Organic",
      dataField: "organic",
      summaryType: "sum",
      customizeText: function (cellInfo) {
        if (cellInfo.value > 0) {
          return JSON.stringify(cellInfo.value) + " organic";
        }
      },
    },
    {
      caption: "Name",
      dataField: "name",
    },
    {
      caption: "Type",
      dataField: "type",
    },
    {
      groupName: "Farm Fresh Goods",
      area: "row"
    },
    {
      groupName: "Farm Fresh Goods",
      dataField: "type",
      groupIndex: 0,
    },
    {
      groupName: "Farm Fresh Goods",
      dataField: "name",
      groupIndex: 1,
    },
    {
      caption: "Price",
      dataField: "price",
      dataType: "number",
      area: "data",
      summaryType: "sum",
    },
    {
      dataField: "date",
      dataType: "date",
      area: "column"
    },
    {
      groupName: "date",
      groupInterval: "year",
      expanded: "true"
    },
    {
      groupName: "date",
      groupInterval: "quarter",
    },
    {
      groupName: "date",
      groupInterval: "month",
    }
  ],
  store: data
});

const dataSource2 = new PivotGridDataSource({
  fields: [
    {
      caption: "Organic",
      dataField: "organic",
      summaryType: "sum",
      customizeText: function (cellInfo) {
        if (cellInfo.value > 0) {
          return JSON.stringify(cellInfo.value) + " organic";
        }
      },
    },
    {
      caption: "Name",
      dataField: "name",
    },
    {
      caption: "Type",
      dataField: "type",
    },
    {
      groupName: "Farm Fresh Goods",
      area: "row"
    },
    {
      groupName: "Farm Fresh Goods",
      dataField: "type",
      groupIndex: 0,
    },
    {
      groupName: "Farm Fresh Goods",
      dataField: "name",
      groupIndex: 1,
    },
    {
      caption: "Price",
      dataField: "price",
      dataType: "number",
      area: "data",
      summaryType: "sum",
    },
    {
      dataField: "date",
      dataType: "date",
      area: "column"
    },
    {
      groupName: "date",
      groupInterval: "year",
      expanded: "true"
    },
    {
      groupName: "date",
      groupInterval: "quarter",
    },
    {
      groupName: "date",
      groupInterval: "month",
    }
  ],
  store: data2
});

const dataSource3 = new PivotGridDataSource({
  fields: [
    {
      caption: "Organic",
      dataField: "organic",
      summaryType: "sum",
      customizeText: function (cellInfo) {
        if (cellInfo.value > 0) {
          return JSON.stringify(cellInfo.value) + " organic";
        }
      },
    },
    {
      caption: "Name",
      dataField: "name",
    },
    {
      caption: "Type",
      dataField: "type",
    },
    {
      groupName: "Farm Fresh Goods",
      area: "row"
    },
    {
      groupName: "Farm Fresh Goods",
      dataField: "type",
      groupIndex: 0,
    },
    {
      groupName: "Farm Fresh Goods",
      dataField: "name",
      groupIndex: 1,
    },
    {
      caption: "Price",
      dataField: "price",
      dataType: "number",
      area: "data",
      summaryType: "sum",
    },
    {
      dataField: "date",
      dataType: "date",
      area: "column"
    },
    {
      groupName: "date",
      groupInterval: "year",
      expanded: "true"
    },
    {
      groupName: "date",
      groupInterval: "quarter",
    },
    {
      groupName: "date",
      groupInterval: "month",
    }
  ],

  store: new CustomStore({
    key: "id",
    load: function (loadOptions) {
      return new Promise(async function (resolve) {
        var ds1 = dataSource.createDrillDownDataSource();
        // console.log("ds1");
        // console.log(ds1);
        ds1.paginate(false);
        ds1.sort("month");

        var ds2 = dataSource2.createDrillDownDataSource();
        ds2.paginate(false);
        ds2.sort("month");
      

        var data1 = await ds1.load();
        console.log("data1: ");
        console.log(data1);

        // console.log("data1");
        // console.log(data1);
        let data2 = await ds2.load();
        console.log("data2: " )
        console.log(data2);

        // let keys = ["organic", "type", "name", "date", "month", "price", "source", "target"];

        let dat3 = groupDatByMonth(data1);
        dat3 = dat3.flat();
        console.log("dat1 grouped and flattened");
        console.log(dat3);

        let dat4 = groupDatByMonth(data2);
        dat4 = dat4.flat();
        console.log("dat2 grouped and flattened");
        console.log(dat4);

        let result = [];

        //how to organize data for parallelism
        dat3.forEach(function (data, index) {
          // console.log("data: " + data);
          // console.log("index: " + index);
          result.push({
            ...data,
            price: data.price - dat4[index].price
          });  
        });

        // let diff = dataFactory(ds1, ds2);
        resolve(result);

      });
    }
  })
});

let types = ['fruits', 'vegetables'];
let vegetable = ['lettuce', 'kale', 'carrot'];
let fruit = ['apple', 'banana', 'strawberry'];
let keys = ["organic", "type", "name", "date", "month", "quarter", "price", "source", "target"];
//fruits: 0, 1, 2, vegetables: 3, 4, 5
//test using dev extreme data filters data layer docs
function groupDatByMonth(data) {
  let month = 0;
  let months = [];

  
  for (let i = 0; i < 12; i++) {
    let new_month_obj = [];
    for (let k = 0; k < 12; k++) {
      let obj_template = makeObj(keys);
      new_month_obj.push(obj_template);
    }
      months.push(new_month_obj);
  }

  //aggregate on all kinds of thing in same month at the same time`
  data.forEach(d => {
    //handle organic later
    months[d.month]["organic"] = d["organic"];
    let k = (d.type == "fruits") ? (fruit.indexOf(d.name)) : (3 + vegetable.indexOf(d.name));
    if (d.organic == 1) k+=6
    //type specifier for fruit 
    
    //type specifier for vegetables
    keys.forEach(key => {
      if (key == "organic")
        months[d.month][k][key] = d[key];
      if (key == "price")
        months[d.month][k][key] += d[key];
      else if (key == "quarter")
        months[d.month][k][key] = d[key];
      else {
        if (months[d.month][k][key].length == 0) months[d.month][k][key] = d[key];
      }
    });
  
  })

  return months;
}

//separate by type, name for pivot grid, and organic so just do it twice for organic == 1, and organic == 0
//go back and set key flags for boolean fields such as labels * and obj with keys * n field groups
//labels * ({}) for each field = n0 * n1 * n2 ... * nk-1 * nk dependent fields | subfields 
//ie fruits or vegetables
function makeObj(keys) {
  let object = {}
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == "organic" || keys[i] == "price" || keys[i] == "quarter") object[keys[i]] = 0;
    else object[keys[i]] = "";
  }
  return object
}

const currencyFormatter = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  },
);

function customizeTooltip(args) {
  const valueText = currencyFormatter.format(args.originalValue);
  return {
    html: `${args.seriesName} | Total<div class="currency">${valueText}</div>`,
  };
}




export default App;
