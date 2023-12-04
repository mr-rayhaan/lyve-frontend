
import { DataService, MultiPartDataService } from "./AxiosHelper";

// This function will create APIS
export const generateAPI = function (data) {
    // console.log("generateAPI", data);
    switch (data["method"]) {
        case "GET":
            return DataService.get(data.url, data.id, data.params);
        case "POST":
            return DataService.post(data.url, data.data, {}, data.id);
        case "DELETE":
            return DataService.delete(data.url, data.id);
        case "PUT":
            return DataService.put(data.url, data.id, data.data);
        default:
            console.error("Invalid method");
    }
};

// This function will create APIS
export const generateMultipartAPI = function (data) {
    switch (data["method"]) {
        case "POST":
            return MultiPartDataService.post(data.url, data.data);
        case "PUT":
            return MultiPartDataService.put(data.url, data.id, data.data);
        default:
            console.error("Invalid method");
    }
};
