import axios from "axios";
const BASEURL = "https://opentdb.com/api.php?amount=1&category=";

export default {
    search: function(category) {
        return axios.get(BASEURL + category);
    }
};