import { URL_LOGIN_CALLBACK } from "../constants";

export class LinkedInOAuth{
    constructor(csrfKey, redirect_uri) {
        this.baseurl = "https://www.linkedin.com/oauth/v2/authorization";
        this.queryParams = {};
        this.queryParams.response_type = "code";
        this.queryParams.client_id = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
        this.queryParams.redirect_uri = redirect_uri + URL_LOGIN_CALLBACK;
        this.queryParams.scope = "r_liteprofile"; // "r_liteprofile%20r_emailaddress"
        this.queryParams.state = csrfKey;
    }
    getUrl(){
        let URL = this.baseurl;
        let isFirst = true;
        for (const key in this.queryParams) {
            URL = `${URL}${isFirst ? "?" : "&"}${key}=${this.queryParams[key]}`;
            isFirst =false;
        }
        return URL;
    }
};