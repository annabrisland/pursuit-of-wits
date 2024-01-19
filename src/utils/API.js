import axios from "axios";
const BASEURL = "https://opentdb.com/api.php?amount=1&encode=url3986&category=";

export default {
    search: function(category) {
        return axios.get(BASEURL + category);
    }
};