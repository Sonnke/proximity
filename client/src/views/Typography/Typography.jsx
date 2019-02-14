import React, { Component } from "react";
import { Grid, Row, Col,Table} from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import axios from "axios";
class Typography extends Component {
  constructor(prop){
    super(prop)
    this.state = {
      tdArray:[]
    }
    this.graphStyle = {width: "100%",height: "600px"}
    this.thArray = ["DATE", "DEVICE MAC", "TIME IN VENUE"];
   
  }

  async componentDidMount(){
    const res = await axios.get("http://localhost:8080/api/raw/bydate/2018-01-01/10");
    const pie = await axios.get('http://localhost:8080/api/pie');
    const vals = res.data.map((i)=>[i.date,i.device_mac,i.time_in_venue])
    this.setState({tdArray:vals});
    //console.log(pie.data)
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                plain
                title="Raw Data"
                category="Limited By 50"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
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

export default Typography;
