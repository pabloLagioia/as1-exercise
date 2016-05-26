var api = {
    orders: {
        get: function() {
            return $.get("/api/orders");
        },
        put: function(doc, orderNumber) {
            return $.ajax({
                        url: "/api/orders/"+orderNumber,
                        type: 'PUT',
                        contentType: "application/json",
                        data: JSON.stringify( doc )
                    }
            );
        },
        post: function(doc) {
            return $.ajax({
                url: "/api/orders/",
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify( doc )
            });
        }
    },
    types: {
        get: function() {
            return $.get("/api/inspectionTypes/")
        }
    }
} 


$(document).ready(function(){
   riot.mount( '*', { 
       events:riot.observable(),
       api: api 
    });
});