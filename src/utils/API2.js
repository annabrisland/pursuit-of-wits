import axios from "axios";
const BASEURL = "https://the-trivia-api.com/api/questions?limit=1";

export default {
    search: function() {
        return axios.get(BASEURL);
    }
};