import axios from "axios";

const ApiHelper = async (
  route,
  method,
  data = null,
  format = "application/json"
) => {
  return axios({
    method,
    url: `http://localhost/api/${route}`,
    data,
    headers: {
      "content-type": format,
      Accept: "application/json",
    },
  });
};

export default ApiHelper;
