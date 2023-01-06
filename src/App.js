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
    // this.state = {
    //   pg1 : dataSource,
    //   pg2: dataSource,
    //   pg3: dataSource3
    // };
    this.pivotGrid1 = React.createRef();
    this.pivotGrid2 = React.createRef();
    this.pivotGrid3 = React.createRef();
    this.chart = React.createRef();
    this.onOptioning = this.onOptioning.bind(this);
  }

  async onOptioning(e) {
    // if (this.state.pg1 != {}) console.log(this.state.pg1);
    // this.state.pg3 = dataFactory(this.state.pg1, this.state.pg2);
    // console.log('result_dataObj');
    // console.log(this.state.pg3);

    // if (e.element.id == 'pivotgrid1') {
    //   let topTableState = this.state.pivotGrid1.dataSource.state();
    //   console.log(topTableState);
    // }
    // return;
  }

  componentDidMount() {
    this.pivotGrid1.current.instance.bindChart(this.chart.current.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });

    // this.state.pg1 = this.pivotGrid1.current.dataSource;
   
    // if (this.state.pg3 != {}) {
    //   console.log("state set");
    //   this.onOptioning();
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
          dataSource={dataSource}
          onOptionChanged={this.onOptioning()}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={false}
          showColumnGrandTotals={false}
          showRowTotals={false}
          showRowGrandTotals={false}
          ref={this.pivotGrid1}
        >
          <FieldChooser enabled={true} height={400} />
        </PivotGrid>
        <PivotGrid
          id="pivotgrid2"
          dataSource={dataSource2}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={false}
          showColumnGrandTotals={false}
          showRowTotals={false}
          showRowGrandTotals={false}
          ref={this.pivotGrid2}
        >
          <FieldChooser enabled={true} height={400} />
        </PivotGrid>
        <PivotGrid
          id="pivotgrid3"
          dataSource={dataSource3}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={false}
          showColumnGrandTotals={false}
          showRowTotals={false}
          showRowGrandTotals={false}
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
      format: "currency",
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
      format: "currency",
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
      format: "currency",
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

        var ds2 = dataSource2.createDrillDownDataSource();
        ds2.paginate(false);

        var data1 = await ds1.load();
        // console.log("data1");
        // console.log(data1);
        var data2 = await ds2.load();

        var result = [];
        data1.forEach(function (data, index) {
          console.log(data.price);
          console.log(data1[index].price);
          result.push({
            ...data,
            price: Math.round(data.price - data2[index].price)
          });  
        });

        // let diff = dataFactory(ds1, ds2);
        resolve(result);

      });
    }
  })
});

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
