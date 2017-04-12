import React, { PropTypes } from "react";
import ReactDOM from "react-dom";

import { convertPercentage } from "../../shared/lib/general-utils";
import StockChart from "./stock-chart.jsx";

const StockModule = React.createClass({
    propTypes: {
		stock: PropTypes.object,
		series: PropTypes.object,
    },
    renderDifference(difference) {
        const percentage = convertPercentage(difference);
        if (isNaN(percentage)) {
            return (
                <span className="trend green"><i className="caret minus icon"></i>{difference}</span>
            );
        }
        if (difference < 0) {
            return (
                <span className="trend green"><i className="caret down icon"></i>{percentage}%</span>
            );
        } else {
            return (
                <span className="trend red"><i className="caret up icon"></i>{percentage}%</span>
            );
        }
    },
    render() {
        const { stock, series } = this.props;
		const difference = (stock.latest_price - stock.yesterday_price)/stock.yesterday_price;
        return (
            <div className="stock-module product-module message-module ui card" ref="stockModule">
                <div className="content">
                    <div className="header">{stock.name}
                        <span className="price red">{stock.latest_price}</span>
                        {this.renderDifference(difference)}
                    </div>
                    <div>
                        <div className="ui four item menu">
                            <a className="item active" data-tab="trend">今日走勢</a>
                            <a className="item" data-tab="analysis">技術分析</a>
                            <a className="item" data-tab="best">最佳價量</a>
                            <a className="item" data-tab="news">最近新聞</a>
                        </div>
                        <div className="ui tab segment p-0 active" data-tab="trend">
                            <StockChart
                                _id={stock.number}
                                series={series}
                                width={470}
                                height={200}/>
                        </div>
                    </div>
                    <div className="assistance">
                        <button className="ui grey basic tiny button">MACD</button>
                        <button className="ui grey basic tiny button">五線譜分析</button>
                        <button className="ui grey basic tiny button">+</button>
                    </div>
                </div>
            </div>
        );
    }
});

export default StockModule;
