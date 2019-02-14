import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";
import axios from "axios";
class TableList extends Component {
  constructor(prop){
    super(prop)
    this.state = {
      tdArray:[],
    }
    this.graphStyle = {width: "100%",height: "600px"}
    this.thArray = ["DATE", "DEVICE MAC","VENDOR/MANUFACTURE","TIME IN VENUE"];
   
  }

  async componentDidMount(){
    const res = await axios.get("/api/processed/50");
    const vals = res.data.map((i)=>[i.date,i.device_mac,i.vendor,i.time_in_venue])
    this.setState({tdArray:vals});
    
  }


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Processed Data"
                category="Limited By 50"
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

export default TableList;
