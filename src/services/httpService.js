import axios from "axios"
import { toast } from "react-toastify";

const app = axios.create({
    baseURL:process.env.REACT_APP_BASE_API_URL,
    withCredentials:true
})

app.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      if (!toast.isActive('connectionError')) {
        toast.error('خطا در برقراری ارتباط با سرور', {
          toastId: 'connectionError',
        });
      }
    }
    return Promise.reject(error);
  }
);

const http = {
    get : app.get,
    post : app.post,
    put : app.put,
    delete : app.delete
}
export default http