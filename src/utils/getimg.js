// 获取房源列表页图片
const getImg = function(dataJson){
  var url = dataJson.url
  var list=dataJson.fyList;
  var fyId=dataJson.fyListId
  var companyId = dataJson.companyId
  var watermark = dataJson.watermark
  var watermarkText = dataJson.watermarkText
  var moRenPic = dataJson.moRenPic
  var ids=[]; //图片id
  for(var i=0;i<list.length;i++){
    ids.push(list[i][fyId]);
  }
  var json={
    ids:ids,
    access_secret:access_secret,
    company_id:companyId
  };
  if(watermark=="1"){
    json.watermark=watermarkText;
  }
  
    axios({  
         url: imgUrl+url ,  
         method:"POST",
         responseType: false, 
         data:JSON.stringify(json),  
    })
    .then( (response) => {
             if(resimg.err_msg=="success"){
               var imgs=resimg.data;
               for( var i = 0; i<list.length;i++){
                list[i].imgSrc = "";
                         A:for(var k=0;k<imgs.length;k++){
                            if(list[i][fyId] ==imgs[k].id && imgs[k].orderNumber!=0 ){
                              list[i].imgSrc =imgs[k].path;
                              
                              if(imgs[k].zhutuZt==0){
                                list[i].imgSrc=imgs[k].path;
                                break A;
                              }
                            }
                          }
                         
                         if(list[i].imgSrc==undefined || list[i].imgSrc==""){
                    list[i].imgSrc = moRenPic;
                   }
               }
               return list; 
             }
          
         })
      
}

export default getImg;






