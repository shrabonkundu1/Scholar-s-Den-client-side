import axios from "axios";


const axiosPublic = axios.create({
    baseURL: "https://scholar-s-den-server-side.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;