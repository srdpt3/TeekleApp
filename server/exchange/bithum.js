import request from "request";
import cryptojsHmacSHA512 from "crypto-js/hmac-sha512";

const app_base = "https://api.bithumb.com";
const api_private_info = {
  api_key: "7fa2aab17d68b65b43f25b1bd6227bc3",
  api_secret: "ba3b3143d5851711c9624ab94e5e1142"
};

const req_query = {
  end_point: "/info/balance",
  currency: "BCH"
//   order_currency: "bch",
//   payment_currency: "KRW"
};

const make_header = obj => {
  let output_string = [];
  Object.keys(obj).forEach(val => {
    let key = val;

    key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
	let value = encodeURIComponent(obj[val].replace(/[!'()*]/g, escape));
	

    output_string.push(key + "=" + value);
  });

  return API_Sign(output_string.join("&"), obj["end_point"]);
};

const API_Sign = (str_q, endPoint) => {
  let now = new Date().getTime() / 1000;
  let s = parseInt(now, 10);

  now = String(Math.round((now - s) * 1000) / 1000);
  //   let nNonce = Number(
  //     String(s) + String(Math.round((now - s) * 1000) / 1000).substr(2, 3)
  //   );
  let nNonce = new Date().getTime();
  let spliter = String.fromCharCode(0);
  console.log(endPoint);

  return {
    "Api-Key": api_private_info.api_key,
    "Api-Sign": base64_encode(
      cryptojsHmacSHA512(
        endPoint + spliter + str_q + spliter + nNonce,
        api_private_info.api_secret
      ).toString()
    ),
    "Api-Nonce": nNonce
  };
};

request(
  {
    method: "POST",
    uri: app_base + req_query["end_point"],
    headers: make_header(req_query),
    formData: req_query
  },
  (err, res, result) => {
    if (err) {
      console.log(err);
      return;
    }
	let data = JSON.parse(result).data
    console.log(data);
	
  }
);



//console.log(make_header(req_query));

console.log("done");

function base64_encode(data) {
  // discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Rafał Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  // example 1: base64_encode('Kevin van Zonneveld');
  // returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // example 2: base64_encode('a');
  // returns 2: 'YQ=='

  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do {
    // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = (o1 << 16) | (o2 << 8) | o3;

    h1 = (bits >> 18) & 0x3f;
    h2 = (bits >> 12) & 0x3f;
    h3 = (bits >> 6) & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] =
      b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join("");

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
}
