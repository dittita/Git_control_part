import React, { Component } from "react";

import { server } from "constants";
import { httpClient } from "utils/HttpClient.js";
// import { ProductService } from './service/ProductService';

// npm install cdbreact

// reactstrap components
import {
  // CardBody,
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Profile extends Component {
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

  async dropdownmodel() {
    try {
      const {
        data: { result },
      } = await httpClient.get(server.MASTER_COMPONENT_URL + "/Model");
      this.setState({ models: result });
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }
  handleSelectChange2 = async (event) => {
    const selectedModel = event.target.value;
    this.setState({ selectedModel }, async () => {
      await this.dropdownpartname(selectedModel.trim());
    });
  };
  async dropdownpartname(model_txt) {
    try {
      const {
        data: { result },
      } = await httpClient.get(
        server.MASTER_COMPONENT_URL +
          "/partname/" +
          encodeURIComponent(model_txt)
      );
      this.setState({ partnames: result });
    } catch (error) {
      console.error("Error fetching part names:", error);
    }
  }
  handleSelectChange3 = async (event) => {
    const selectedpartname = event.target.value;
    const { selectedModel } = this.state;
    this.setState({ selectedpartname }, async () => {
      await this.dropdown_partnumber(
        selectedModel.trim(),
        selectedpartname.trim()
      );
    });
  };

  async dropdown_partnumber(model_txt, part_txt) {
    try {
      const {
        data: { result },
      } = await httpClient.get(
        server.MASTER_COMPONENT_URL +
          `/part_number/${encodeURIComponent(model_txt)}/${part_txt}`
      );
      this.setState({ part_numbers: result });
    } catch (error) {
      console.error("Error fetching part numbers:", error);
    }
  }
  handleSelectChange4 = (event) => {
    // dropdown_vendor
    const selectedpart_numbers = event.target.value;
    const { selectedModel } = this.state;
    const { selectedpartname } = this.state;
    this.setState({ selectedpart_numbers }, async () => {
      await this.dropdown_vendor(
        selectedModel.trim(),
        selectedpartname.trim(),
        selectedpart_numbers.trim()
      );
    });
    // this.setState({ selectedpart_numbers: event.target.value });
  };

  async dropdown_vendor(model_txt, part_txt, partnumber_txt) {
    try {
      const {
        data: { result },
      } = await httpClient.get(
        server.MASTER_COMPONENT_URL +
          `/vendor/${encodeURIComponent(
            model_txt
          )}/${part_txt}/${partnumber_txt}`
      );
      this.setState({ vendors: result });
      // console.log(result);
    } catch (error) {
      console.error("Error fetching vendor:", error);
    }
  }
  handleSelectChange5 = (event) => {
    const selectevendor = event.target.value;
    const { selectedpart_numbers } = this.state;
    const { selectedpartname } = this.state;
    const { selectedModel } = this.state;
    this.setState({ selectevendor }, async () => {
      await this.dropdown_mold(
        selectedModel.trim(),
        selectedpartname.trim(),
        selectedpart_numbers.trim(),
        selectevendor.trim()
      );
    });
    // this.setState({ selectevendor: event.target.value });
  };

  async dropdown_mold(model_txt, part_txt, partnumber_txt, vendor_txt) {
    try {
      const {
        data: { result },
      } = await httpClient.get(
        server.MASTER_COMPONENT_URL +
          `/Mold/${encodeURIComponent(
            model_txt
          )}/${part_txt}/${partnumber_txt}/${vendor_txt}`
      );
      this.setState({ molds: result });
      // console.log(result);
    } catch (error) {
      console.error("Error fetching mold:", error);
    }
  }
  handleSelectChange6 = (event) => {
    this.setState({ selectemold: event.target.value });
  };

  componentDidMount() {
    this.dropdownmodel();
    this.doGetDataReport();
  }
  dropdownOptions = {
    model: ["Model 1", "Model 2", "Model 3"],
    partName: ["Part A", "Part B", "Part C"],
    partNumber: ["PN 001", "PN 002", "PN 003"],
    vendor: ["Vendor 1", "Vendor 2", "Vendor 3"],
    mold: ["Mix mold", "1", "2", "3"],
    // rackNumber: ["Rack 001", "Rack 002", "Rack 003"],
    limit: ["1", "2", "3"],
  };

  handleSelectChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  clearInput = () => {
    this.setState({
      selectedModel: "", // State to hold the selected model value
      selectedpartname: "", // State to hold the selected model value
      selectedpart_numbers: "",
      selectevendor: "",
      selectemold: "",
      rackNumber: "",
      limit: "",
      Issue_part_KitupF4: "",
    });
  };

  // Async function to get the data and update state
  doGetDataReport = async () => {
    try {
      const result = await httpClient.get(
        server.MASTER_COMPONENT_URL + `/Data_master`
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
// Method to handle delete action
handleDelete = async (ID) => {
  try {
    // Send a DELETE request to your backend
    await httpClient.delete(`${server.MASTER_COMPONENT_URL}/delete-data/${ID}`);
    // console.log(result);
    // Optionally, refresh the data after deletion
    this.doGetDataReport();

    alert(`Record with ESL number ${ID} deleted successfully!`);
  } catch (error) {
    console.error('Error deleting data:', error);
    alert(`Error deleting data: ${error.message}`);
  }
};

  // Render method to display the table

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
              className="card-body table-responsive p-0"
              style={{ height: "100%" }}
            >
              <table
                className="table table-head-fixed text-nowrap table-hover"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr align="center">
                  <th style={styles.headerCell}>Actions</th> {/* New Actions column */}
                    <th style={styles.headerCell}>ESL_number</th>
                    <th style={styles.headerCell}>Part_number</th>
                    <th style={styles.headerCell}>Model</th>
                    <th style={styles.headerCell}>Mold</th>
                    <th style={styles.headerCell}>Part_name</th>
                    <th style={styles.headerCell}>Vendor</th>
                    <th style={styles.headerCell}>Updater</th>
                    <th style={styles.headerCell}>Rack_number</th>
                    <th style={styles.headerCell}>QTY</th>
                    <th style={styles.headerCell}>ID</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {Raw_Dat.map((item, index) => (
                    <tr key={index}>
                       <td style={styles.cell}>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(item.ID)} // Pass ESL_number to delete
                        >
                          Delete
                        </button>
                      </td>
                      <td style={styles.cell}>{item.ESL_number}</td>
                      <td style={styles.cell}>{item.Part_number}</td>
                      <td style={styles.cell}>{item.Model}</td>
                      <td style={styles.cell}>{item.Mold}</td>
                      <td style={styles.cell}>{item.Part_name}</td>
                      <td style={styles.cell}>{item.Vendor}</td>
                      <td style={styles.cell}>{item.Updater}</td>
                      <td style={styles.cell}>{item.Rack_number}</td>
                      <td style={styles.cell}>{item.QTY}</td>
                      <td style={styles.cell}>{item.ID}</td>
                     
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

  formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();
    const formattedTimeNow = this.formatDate(new Date());

    this.setState({ timenow: formattedTimeNow }, async () => {
      const {
        selectedpart_numbers,
        selectedModel,
        selectedpartname,
        selectevendor,
        selectemold,
        rackNumber,
        timenow,
        scannedValue,
        limit,
      } = this.state;

      

      // console.log("Data being sent to the server:", data); // Debugging log
  //  console.log(limit);
      try {
        for (let i = 1; i <= limit; i++) {

          const data = {
            ESL_number: scannedValue, // Ensure this is set
            Part_number: selectedpart_numbers,
            Model: selectedModel,
            Part_name: selectedpartname,
            Vendor: selectevendor,
            Mold: selectemold,
            Rack_number: rackNumber, // Check the correct case here
            Updater: "T7436",
            Timestamp: timenow, // Ensure this is correctly formatted
            Number_limit:i,
          };

          const response = await httpClient.post(
            server.MASTER_COMPONENT_URL + `/insert-data`,
            data
          );

          console.log("Response:", response.data); // Log the response from the server
          alert(`Rack number ${data.Rack_number} inserted successfully!`);
        }
        // Clear input fields
        this.clearInput();
        this.doGetDataReport();
      } catch (error) {
        console.error("Error inserting data:", error);
        if (error.response && error.response.status === 500) {
          alert("Server error (500): Internal server issue.");
        } else if (error.response) {
          alert(
            `Error inserting data: ${error.response.status} - ${error.response.statusText}`
          );
        } else {
          alert(`Error inserting data: ${error.message}`);
        }
      }
    });
  };

  // Handle input change and convert to uppercase
  handleInputChange = (e) => {
    const rackNumber = e.target.value.toUpperCase(); // Convert input to uppercase
    this.setState({ rackNumber }); // Update the state with the new value
  };

  render() {
    const { limit } = this.dropdownOptions;

    const {
      partnames,
      selectedpartname,
      models,
      selectedModel,
      part_numbers,
      selectedpart_numbers,
      vendors,
      selectevendor,
      molds,
      selectemold,
      // rackNumber,
    } = this.state;

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
                    <Col className="order-lg-0" lg="2">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/racks.png")}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-8">
                    <h3>Master rack and component part</h3>
                    <div
                      className="h6 font-weight-300"
                      style={{ fontSize: "18px" }}
                    >
                      <i className="ni location_pin mr-2" />
                      Please input master rack number .
                    </div>

                    {/* ESL Tag Input */}
                    <FormGroup>
                      <label
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          display: "block",
                        }}
                      >
                        Master ESL tag
                      </label>

                      <Input
                        className="form-control-alternative"
                        placeholder="Please input ESL tag"
                        type="text"
                        value={this.state.scannedValue}
                        onChange={(e) =>
                          this.setState({ scannedValue: e.target.value })
                        }
                        style={{ fontSize: "20px" }}
                      />
                    </FormGroup>

                    {/* Model Dropdown */}
                    <FormGroup>
                      <label
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          display: "block",
                        }}
                      >
                        Model
                      </label>

                      <Input
                        type="select"
                        name="model"
                        value={selectedModel}
                        onChange={this.handleSelectChange2}
                        style={{ fontSize: "20px" }}
                      >
                        {models.map((model, index) => (
                          <option key={index} value={model.Model}>
                            {model.Model}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>

                    {/* Part Number and Part name and vendor Dropdown */}
                    <FormGroup
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "20px",
                            textAlign: "left",
                            marginBottom: "5px",
                          }}
                        >
                          Part Name
                        </label>
                        <Input
                          type="select"
                          name="partname"
                          value={selectedpartname}
                          onChange={this.handleSelectChange3}
                          style={{ fontSize: "20px", width: "470px" }} // Adjust width as needed
                        >
                          <option value="">Select a Part Name</option>
                          {partnames.map((partname, index) => (
                            <option key={index} value={partname.Part_name}>
                              {partname.Part_name}
                            </option>
                          ))}
                        </Input>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "20px",
                            textAlign: "left",
                            marginBottom: "5px",
                          }}
                        >
                          Part Number
                        </label>
                        <Input
                          type="select"
                          name="past_numner"
                          value={selectedpart_numbers}
                          onChange={this.handleSelectChange4}
                          style={{ fontSize: "20px", width: "470px" }} // Adjust width as needed
                        >
                          <option value="">Select a Part Number</option>

                          {part_numbers.map((past_number, index) => (
                            <option
                              key={index}
                              value={past_number.Part_number_NMB}
                            >
                              {past_number.Part_number_NMB}
                            </option>
                          ))}
                        </Input>
                      </div>
                      {/* Vendor Dropdown */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "20px",
                            textAlign: "left",
                            marginBottom: "5px",
                          }}
                        >
                          Vendor
                        </label>
                        <Input
                          type="select"
                          name="vendor"
                          value={selectevendor}
                          onChange={this.handleSelectChange5}
                          style={{ fontSize: "20px", width: "470px" }}
                        >
                          <option value="">Select a Vendor</option>

                          {vendors.map((vendor, index) => (
                            <option key={index} value={vendor.Supplier}>
                              {vendor.Supplier}
                            </option>
                          ))}
                        </Input>
                      </div>
                      {/* Mold Dropdown */}

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "20px",
                            textAlign: "left",
                            display: "block",
                          }}
                        >
                          Mold
                        </label>

                        <Input
                          type="select"
                          name="mold"
                          value={selectemold}
                          onChange={this.handleSelectChange6}
                          style={{ fontSize: "20px", width: "470px" }}
                        >
                          <option value="">Select a Mold</option>

                          {molds.map((mold, index) => (
                            <option key={index} value={mold.Mold}>
                              {mold.Mold}
                            </option>
                          ))}
                        </Input>
                      </div>
                      {/* Rack Number Dropdown */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "20px",
                            textAlign: "left",
                            display: "block",
                          }}
                        >
                          Rack Number
                          <label
                            style={{
                              fontSize: "20px",
                              color: "red", // Use 'color' to set text color
                              marginLeft: "10px", // Add space to the left of (A11)
                            }}
                          >
                            (A11)
                          </label>
                        </label>

                        <Input
                          type="text" // `type="text"` is more appropriate for general text input
                          id="rackNumberInput"
                          name="rackNumber"
                          maxLength={4} // Limit input to 4 characters
                          value={this.state.rackNumber} // Controlled input with state
                          onChange={this.handleInputChange} // Update state on change
                          style={{ fontSize: "20px", width: "470px" }}
                        />
                      </div>
                      {/* Limit Dropdown */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "20px",
                            textAlign: "left",
                            display: "block",
                          }}
                        >
                          Limit
                        </label>

                        <Input
                          type="select"
                          name="limit"
                          value={this.state.limit}
                          onChange={this.handleSelectChange}
                          style={{ fontSize: "20px", width: "470px" }}
                        >
                          <option value="">Select a Limit</option>
                          {limit.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </FormGroup>

                    <Button
                      className="btn-1 ml-1"
                      color="success"
                      outline
                      type="button"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button
                      className="btn-1 ml-1"
                      color="warning"
                      outline
                      type="button"
                      onClick={this.clearInput}
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>Data master reack number</p>
                      </Col>
                    </Row>
                    <div> {this.renderTable()} </div>
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
