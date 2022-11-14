    // const URL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86cfqwpluv43cd&redirect_uri=http://localhost:3000&state=foobar&scope=r_liteprofile%20r_emailaddress";


export class LinkedInOAuth{
    constructor(csrfKey = "foobar") {
        this.baseurl = "https://www.linkedin.com/oauth/v2/authorization";
        this.queryParams = {
            response_type : "code",
            client_id : process.env.REACT_APP_LINKEDIN_CLIENT_ID,
            redirect_uri : "http://localhost:3000",
            scope: "r_liteprofile%20r_emailaddress",
            state : csrfKey
        }
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