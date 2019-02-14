import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col,Table} from "react-bootstrap";
import { thArray, tdArray } from "variables/Variables.jsx";

import { Card } from "../../components/Card/Card.jsx";
import axios from "axios";

import AmCharts from "@amcharts/amcharts3-react";
class Dashboard extends Component {
  constructor(prop){
    super(prop)
    this.state = {
      tdArray:[],
      processed:0,
      raw:0,
    }
    this.graphStyle = {width: "100%",height: "600px"}
    this.thArray = ["DATE", "DEVICE MAC", "TIME IN VENUE"];
   
  }

  async componentDidMount(){
    const res = await axios.get("/api/raw/bydate/2018-01-01/10");
    const pie = await axios.get('/api/pie');
    const vals = res.data.map((i)=>[i.date,i.device_mac,i.time_in_venue])
    this.setState({tdArray:vals});
    this.setState({processed:pie.data.processed[0].total})
    this.setState({raw:pie.data.raw_data[0].total})
    //console.log(pie.data)
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    //console.log(this.state);
    return (
      <div className="content">
        <Grid fluid>
          
          <Row>
            <Col md={12}>
            <AmCharts.React
                    style={this.graphStyle}
                    options={{
                      "type": "pie",
                      "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                      "titleField": "category",
                      "valueField": "column-1",
                      "theme": "light",
                      "allLabels": [],
                      "balloon": {},
                      "legend": {
                        "enabled": true,
                        "align": "center",
                        "markerType": "circle"
                      },
                      "titles": [],
                      "dataProvider": [
                        {
                          "category": "Processed Data",
                          "column-1": this.state.processed
                        },
                        {
                          "category": "Raw Data",
                          "column-1": this.state.raw
                        }
                      ]
                    }} />
            </Col>
            <Col md={12}>
              <Card
                title="Recently added"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {this.thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>

          
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
