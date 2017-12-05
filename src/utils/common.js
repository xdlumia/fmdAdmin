
import axios from 'axios'
import queryString from 'queryString'
axios.defaults.withCredentials=true;
let token = localStorage.token;
  
let companyType = 'fmd';  //fmd 为房脉动页面  /lmd 为楼脉动页面


let baseURL = "http://test.fangmaidong.com:7001"
if( companyType =='fmd'){
   baseURL="http://test.fangmaidong.com:7001"
}else if( companyType =='lmd'){
   baseURL="http://test.loumaidong.com:7001"
}
let HTTP = axios.create({
// baseURL:baseURL,
baseURL:baseURL,
responseType:'json',
headers:{
    // token:"123456789",
    'token':token,
    // 'Content-type': 'application/json'
  },
  // transformRequest:[function(data){
  //   // return queryString.stringify(data)
  //   return data
  // }],
})

HTTP.interceptors.response.use(
    response => {
         if(response.data.code =="401"){
            router.replace({
                path: '/login',
            })
         }
         return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: '/login',
                    })
            }
        }
    });


export {HTTP,companyType};




