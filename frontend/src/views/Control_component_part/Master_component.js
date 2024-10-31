import React from "react";

// reactstrap components
import { Card, Container, Row, Col } from "reactstrap";
import { server } from "constants";
import { httpClient } from "utils/HttpClient.js";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // moNumber: "",
      model: "",
      // iqcNumber: "",
      // qty: "",
      // vendor: "",
      // mold: "",
      scannedValue: "",
      limit: "",
      rackNumber: "",
      Issue_part_KitupF4: "",
      partname: "",
      part_number: "",
      vendor: "",
      mold: "",
      counter: 0, // Counter state
      customers: [], // Customers state for DataTable,
      models: [], // State to hold the model options
      partnames: [],
      vendors: [],
      part_numbers: [],
      molds: [], // State to hold the model options
      selectedModel: "", // State to hold the selected model value
      selectedpartname: "", // State to hold the selected model value
      selectedpart_numbers: "",
      selectevendor: "",
      selectemold: "",
      Raw_Dat: [], // Will store the processed raw data for the table
      report: null,
      isDisable: true,
    };
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.doGetDataReport();
  }
  // Async function to get the data and update state
  doGetDataReport = async () => {
    try {
      const result = await httpClient.get(
        server.MASTER_COMPONENT_URL + `/Data_master_part`
      );

      let rawData = result.data.listRawData;
      // console.log(rawData);
      // Process the raw data by merging arrays (as in your logic)
      for (let i = 1; i < rawData.length; i++) {
        rawData[0].push(...rawData[i]);
      }
      // Debugging: log the processed rawData
      // console.log("Processed rawData:", rawData[0]);
      // Store the processed data in state
      this.setState({
        Raw_Dat: rawData[0],
        report: result.data.result,
        isDisable: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
renderTable = () => {
  const { Raw_Dat } = this.state;

  // Check if Raw_Dat contains data
  if (Raw_Dat.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="card card-primary">
          <div className="row"></div>
          <div className="col-12">
            <div
              className="card-body"
              style={{
                height: "400px", // Set height for the scroll area
                overflowY: "auto", // Enable vertical scrolling
                overflowX: "auto", // Enable horizontal scrolling
              }}
            >
              <table
                className="table table-head-fixed text-nowrap table-hover"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr align="center">
                    <th style={styles.headerCell}>Model</th>
                    <th style={styles.headerCell}>Part_name</th>
                    <th style={styles.headerCell}>Supplier</th>
                    <th style={styles.headerCell}>Mold</th>
                    <th style={styles.headerCell}>Part_name</th>
                    <th style={styles.headerCell}>Part_number_NMB</th>
                    <th style={styles.headerCell}>Part_number_Seagate</th>
                    <th style={styles.headerCell}>Qty_per_pack</th>
                    <th style={styles.headerCell}>Qty_per_bundle</th>
      
                  </tr>
                </thead>
                <tbody>
                  {Raw_Dat.map((item, index) => (
                    <tr key={index}>
                      <td style={styles.cell}>{item.Model}</td>
                      <td style={styles.cell}>{item.Part_name}</td>
                      <td style={styles.cell}>{item.Supplier}</td>
                      <td style={styles.cell}>{item.Mold}</td>
                      <td style={styles.cell}>{item.Part_name}</td>
                      <td style={styles.cell}>{item.Part_number_NMB}</td>
                      <td style={styles.cell}>{item.Part_number_Seagate}</td>
                      <td style={styles.cell}>{item.Qty_per_pack}</td>
                      <td style={styles.cell}>{item.Qty_per_bundle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  render() {
    return (
      <>
        <DemoNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/master-data_file.png")}
                          />
                        </a>
                      </div>
                    </Col>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>Master control component part</h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Data master input by engineering section
                    </div>

                    <div className="mt-5 py-5 border-top text-center">
                      <Row className="justify-content-center">
                        <Col lg="9"></Col>
                      </Row>
                      <div> {this.renderTable()} </div>
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p></p>
                       
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

// Styling for table cells and headers
const styles = {
  headerCell: {
    borderBottom: "2px solid black",
    textAlign: "left",
    padding: "9px",
    backgroundColor: "#f2f2f2",
  },
  cell: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
  },
};
export default Profile;
