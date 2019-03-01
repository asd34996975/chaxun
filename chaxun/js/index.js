
var curpage = document.querySelector('.curren')
var input= document.querySelectorAll('input')
var shoplist=$('#shoplist')
var boolean=true     
var index=''
var t=true    
var n =0
var singlePageStrip=20 //每页渲染条数
var  pageNum = Math.floor(data.length/singlePageStrip) //总共多少条
// $.ajax({
//   url:'',
//   type:'GET',
//   success: datas=> {
//     data=datas
//   }
// })

if(data.length%singlePageStrip==0){
  $('.zongpage').text(pageNum)
  t=false
}else{
  $('.zongpage').text(pageNum+1)
  t=true
}

$('.num').text(data.length)
function asd(n,data){
  var str=''
  var page=Math.floor(data.length/singlePageStrip)
  curpage.innerHTML=n+1

  if(n<page){
    for(var i=n*singlePageStrip;i<n*singlePageStrip+singlePageStrip;i++){
      str+= `<li>
            <span>${data[i].no}</span>
            <span>${data[i].sno}</span>
            <span>${data[i].loc}</span>
            <span>${data[i].addr}</span>
            <span>${data[i].tel}</span>
      </li>`
    }
  }else{
  
    for(var i=page*singlePageStrip;i<page*singlePageStrip+data.length%singlePageStrip;i++){
      str+= `<li>
            <span>${data[i].no}</span>
            <span>${data[i].sno}</span>
            <span>${data[i].loc}</span>
            <span>${data[i].addr}</span>
            <span>${data[i].tel}</span>
        </li>`
    }
    
  }
  
  shoplist.html(str)
}

function pageTurning(data,e){
  var  pagenum = Math.floor(data.length/singlePageStrip)
  switch(e){
    case 'next' :
      if(t?n<pagenum:n<pagenum-1){
        n++
      }
      
      asd(n,data)
    break;
    case 'pre' :
        if(n>0){
          n--
        }
        asd(n,data)  
    break;
    case 'last' :
        n=t?pagenum:pagenum-1
        asd(n,data)
    break;
    case 'one' :
        n=0
        asd(n,data)
    break;
  }
}



asd(n,data)

$('.btn').click(()=>{
  var n=0
  var newdata=[]
  boolean=false
  input.forEach((item,index)=>{ //拿到输入框的值
    if(index==0){
        val1 = item.value;
    }else if(index==1){
        val2 = item.value;
    }else if(index==2){
        val3 = item.value;
    }else if(index==3){
        val4 = item.value;
    }
  })
  data.forEach((i)=>{
    if(i.sno.indexOf(val1)!==-1&&i.loc.indexOf(val2)!==-1&&i.addr.indexOf(val3)!==-1&&i.tel.indexOf(val4)!==-1){
      newdata.push(i)       
    }
  })
  if(newdata.length==0){
    alert('查无结果')
  }
  if(newdata.length!=0){
    
    var  pageNum = Math.floor(newdata.length/singlePageStrip)
    
    if(newdata.length%singlePageStrip==0){
      $('.zongpage').text(pageNum)
      t=false
    }else{
      $('.zongpage').text(pageNum+1)
      t=true
    }
    $('.num').text(newdata.length)
    asd(n,newdata)
    $('.shoplist-footer').click(e=>{
      pageTurning(newdata,e.target.id)
      
    })

  
 }
 
 if(input[0].value==''&&input[1].value==''&&input[2].value==''&&input[3].value==''){
  boolean=true 
  
 }

})

$('.shoplist-footer').click(e=>{
  if(boolean){
    pageTurning(data,e.target.id)
  }
})



