import httpClient from "./httpClient";

const finalReportApi = {
  create: (data) =>
  httpClient.post("/Finalreport/create", data),
};

export default finalReportApi;
