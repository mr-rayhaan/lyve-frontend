import axios from "axios";

const API_ENDPOINT = "http://localhost:3001/api";

const client = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const client_multipart = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

/*eslint-disable */
class DataService {
  static get(path = "", id = null, params = "") {
    return client({
      method: "GET",
      url: path + `${id ? id : ""}`,
      params,
    });
  }

  static multipartPost(path = "", data = {}, optionalHeader = {}) {
    return client_multipart({
      method: "POST",
      url: path,
      data,
    });
  }

  static post(path = "", data = {}, optionalHeader = {}, id = null) {
    // console.log(path, data);
    return client({
      method: "POST",
      url: path + `${id ? id : ""}`,
      data,
    });
  }

  static patch(path = "", id = null, data = {}) {
    return client({
      method: "PATCH",
      url: path + `${id ? id : ""}`,
      data: JSON.stringify(data),
    });
  }

  static delete(path = "", id = null, data = {}) {
    return client({
      method: "DELETE",
      url: path + `${id ? id : ""}`,
      data: JSON.stringify(data),
    });
  }

  static put(path = "", id = null, data = {}) {
    return client({
      method: "PUT",
      url: path + `${id ? id : ""}`,
      data: JSON.stringify(data),
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;

  const token = "Bearer ";//+ getCookie("key"); //JSON.parse(localStorage.getItem("key"));
  // console.log("axios file", token);
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return;
    ("");
  }

  requestConfig.headers = {
    ...headers,
    Authorization: token,
  };
  // store.dispatch("api/make_loader_active");
  return requestConfig;
});

client.interceptors.response.use(
  (response) => {
    // store.dispatch("api/make_loader_inactive");
    return response;
  },
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */

    const { response } = error;
    const originalRequest = error.config;
    // if (response) {
    //     if (response.status === 500) {
    //         // do something here
    //     } else {
    //         return originalRequest;
    //     }
    // }
    // store.dispatch("api/make_loader_inactive");
    return Promise.reject(response);
  }
);

class MultiPartDataService {
  static post(path = "", form = null) {
    return client({
      method: "POST",
      url: path,
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data', // Important for handling FormData
    },
    });
  }
  static put(path = "", id = null, data) {
    return client({
      method: "PUT",
      url: path + `${id ? id : ""}`,
      data: data,
    });
  }
}

/*eslint-enable */
export { DataService, MultiPartDataService };
