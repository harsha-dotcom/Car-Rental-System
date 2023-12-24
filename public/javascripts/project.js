$(document).ready(function(){
  
    $.getJSON('/call/fetch_car_name',function(data){
        var data=data.result;
     
        data.map((item,i)=>{
            
            $('#CID').append($('<option>').text(item.carname).val(item.CID))
        });
    });
    $.getJSON('/call/displaycarforautofilling',function(data){
        var data=data.result;
     
        data.map((item,i)=>{
            
            $('#CID').append($('<option>').text(item.carname).val(item.CID))
        });
    });
})