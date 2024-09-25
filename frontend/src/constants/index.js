

// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "NMB Covid19 command center";

// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";

// Division code
export const HTTP_DIVCODE_FETCHING = "HTTP_DIVCODE_FETCHING";
export const HTTP_DIVCODE_SUCCESS = "HTTP_DIVCODE_SUCCESS";
export const HTTP_DIVCODE_FAILED = "HTTP_DIVCODE_FAILED";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";




export const apiUrl = "http://localhost:2011/"; //localhost port 2010
export const Url = "http://localhost:3000/"; //Port frontend
export const apiUrl_python = "http://192.168.101.120:2028/"; //deploy บางปะอิน 

// SPD 
// export const apiUrl = "http://192.168.101.120:2026/"; //deploy บางปะอิน 
// export const Url = "http://192.168.101.120:2027/"; //deploy บางปะอิน 
// export const apiUrl_python = "http://192.168.101.120:2028/"; //deploy บางปะอิน 

//nmb 
// export const apiUrl = "http://10.120.122.28:2016/"; //deploy บางปะอิน 
// export const Url = "http://10.120.122.28:2017/"; //deploy บางปะอิน 
// export const apiUrl_python = "http://10.120.122.28:2012/"; //deploy บางปะอิน 



export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  LOGIN_URL: `api/authorize/login`,

  REGISTER_URL: `api/authorize/register`,
  FORGOTPASSWORD_URL: `api/authorize/forgot`,
  CHANGEPASSWORD_URL: `api/authorize/changePassword`,
  USER_URL: `api/authorize/user`,
  YIELD_URL: `api/production_result/yield`,


  /*********************************************************Engineer********************************************************************/






//Downtime
DOWNTIME_URL: `api/downtime`,
DOWNTIME_GETPROCESS: `api/downtime/process`,
DOWNTIME_GETLINE: `api/downtime/line`,


//Missing part 
MISSING_PART_URL: `api/missing_part`,
MISSING_PART_GETCOMPONENT: `api/missing_part/component`,
MISSING_PART_GETLINE: `api/missing_part/line`,



TEST_PART_URL: `api/test`,
// IMPORTMENT_DOWNTIME_DAILY_URL: `api/importment_downtime`,


//Master 

COMPONENT_URL: `api/component_part`,














};

export const key = {
  LOGIN_PASSED: `LOGIN_PASSED`,
  API_KEY: `API_KEY`,
  USER_LV: `USER_LV`,
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  JWT_TOKEN: "JWT_TOKEN",
};