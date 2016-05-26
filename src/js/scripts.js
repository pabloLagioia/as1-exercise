$(document).ready(function(){
   riot.mount( '*', { 
       events:riot.observable(),
       api: api 
    });
});