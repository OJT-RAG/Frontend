import httpClient from "./httpClient";

const finalReportApi = {
  create: (data) =>
    httpClient.post("/Finalreport/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default finalReportApi;
