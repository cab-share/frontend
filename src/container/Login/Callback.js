import { useSearchParams } from "react-router-dom";

function Callback(){


    const [searchParams] = useSearchParams();

    console.log(searchParams.get("code"));
    console.log(searchParams.get("state"));

    return <div></div>
}

export default Callback;

// http://localhost:3000/login/callback?
// code=AQTwU6H4SpHKB9qY-M2NAKbsVb00PcEBe1XkH5Cp0vpDReVZ8GkQZB6IyWwjmMHuZsLA4uebNfMtHB9Pq7b6zEvJSuBE9aKYDwA_pka-iht8jHzALMH0YW_jBa9vG_NzgyQ1aDznQUkX4UbK8Wn1cew_6Ov3SE9mbflbEMOkX_6NDl35tXSjcnVou3d5V5_-xZGE1QfG8VDL_6tlmpA
// &state=foobar