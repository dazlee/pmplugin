import React, { PropTypes } from "react";
import Highcharts from 'highcharts/highstock';
import { Map, is } from "immutable";
import uuid from "node-uuid";


const StockChart = React.createClass({
    propTypes: {
        _id: PropTypes.string.isRequired,
        series: PropTypes.object.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
    },
    getInitialState () {
        return {
            _id: this.props._id + "-" + uuid.v1(),
        };
    },
	componentWillMount() {
		console.log("componentWillMount");
		console.dir(Highcharts.StockChart);
		this.renderStockChart(this.props.series);
	},
    renderStockChart (series) {
        const { width, height } = this.props;
        const { _id } = this.state;
        var chart = new Highcharts.StockChart(_id, {
          rangeSelector: {
              selected: 4
          },
          chart: {
              width: width || 500,
              height: height || 300,
          },
		  xAxis: {
			  type: 'datetime',
			  title: "日期"
		  },
          yAxis: {
              labels: {
                  formatter: function () {
                      return (this.value > 0 ? ' + ' : '') + this.value + '%';
                  }
              },
              plotLines: [{
                  value: 0,
                  width: 2,
                  color: 'silver'
              }]
          },
		  lang: {
			  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
		  },
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2
          },
          series: [series]
       });
    },
    render () {
        const { _id } = this.state;
        return (
            <div id={_id}></div>
        );
    }
});

export default StockChart;
