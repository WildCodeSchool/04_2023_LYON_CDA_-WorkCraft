import ApiHelper from "./apiHelper";

const loadData = (dataType, setState, dataId = "") => {
  ApiHelper(`${dataType}/${dataId}`, "get")
    .then((res) => {
      setState(res.data);
    })
    .catch((err) => {
      console.error(`Axios Error : ${err.message}`);
    });
};

export default loadData;
