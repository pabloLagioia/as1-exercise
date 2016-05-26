riot.tag2('addform', '<div id="modalForm" class="modal fade" tabindex="-1" role="dialog"> <div class="{class} alert alert-{type}" role="alert"> {message} </div> <form class="modal-dialog" onsubmit="{saveOrder}"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">New inspection and report</h4> </div> <div class="modal-body"> <div class="form-group"> <label for="notes">Notes</label> <input type="text" class="form-control" id="notes" name="notes"> </div> <div class="form-group"> <label for="year">Year</label> <input type="text" class="form-control" id="year" name="year" required pattern="\\d*"> </div> <div class="form-group"> <label for="make">Make</label> <input type="text" class="form-control" id="make" name="make" required> </div> <div class="form-group"> <label for="model">Model</label> <input type="text" class="form-control" id="model" name="model" required> </div> <div class="form-group"> <label for="model">Inspection type</label> <select type="text" class="form-control" id="type" name="type" required> <option each="{items}" value="{this.name}">{this.name}</option> </select> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="submit" class="btn btn-primary">Save changes</button> </div> </div> </form> </div>', '', '', function(opts) {

        var self = this;
        this.class = "hidden";

        this.on("mount", function() {
           opts.api.types.get()
               .done(function(res) {
                    self.items = res.items
                    self.update();
                }).
                fail(function() {
                    alert("mal");
                })
        });

        this.showAlert = function(type, message) {
            self.message = message;
            self.type = type;
            self.class = "";
            self.update();
            setTimeout( function() {
                self.class = "hidden"
                self.update();
            }, 4000);
        }.bind(this);

        this.saveOrder = function(e) {
            if( !e.target.year.value || !e.target.make.value || !e.target.model.value ) {
                self.showAlert( "danger", "Theres a problem!" );
            } else {
                var order = {
                    inspectionType:e.target.type.value,
                    note:e.target.notes.value,
                    vehicle : {
                        year: e.target.year.value,
                        make: e.target.make.value,
                        model: e.target.model.value
                    }
                }

                opts.api.orders.post( order )
                    .done(function(res) {
                        opts.events.trigger("listUpdated");
                        self.showAlert( "success", "Order Saved" );
                        riot.update();
                    })
                    .fail(function() {
                        self.showAlert( "danger", "Theres a problem!" );
                    });
            }
        }.bind(this)
});
riot.tag2('list', '<form onsubmit="{add}" class="row actions"> <div class="col-xs-12 col-sm-7"> <div class="input-group"> <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-search"></i></span> <input type="text" class="form-control" placeholder="Search here..." aria-describedby="basic-addon1" name="input" onkeyup="{search}"> </div> </div> <div class="col-xs-12 col-sm-5"> <a data-toggle="modal" data-target="#modalForm" href="#" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New inspection & Report</a> </div> </form> <h2>Dashboard</h2> <p class="list-head">Viewing: {openOrdersCount(items)} vehicle(s)</p> <ul class="list-unstyled"> <li class="clearfix" each="{items.filter(display)}"> <ul class="ro-list list-unstyled"> <li class="ro col-xs-6 col-sm-2">RO# {this.orderNumber}</li> <li class="vehicle col-xs-6 col-sm-4">{fullVehicle(this.vehicle)}</li> <li class="type col-xs-12 col-sm-6"> <i class="glyphicon glyphicon-th-list"></i> {this.inspectionType} <i onclick="{remove}" class="pull-right glyphicon glyphicon-remove remove-btn"></i></li> </ul> </li> </ul>', '', '', function(opts) {

   var self = this;

    this.fullVehicle = function(vehicle) {
        return vehicle.year + " " + vehicle.make + " " + vehicle.model
    }.bind(this)

    this.on("mount listUpdated", function() {
        opts.api.orders.get()
            .done(function(res) {
                self.items = res.items
                self.update();
            });
    });

    this.remove = function(e) {
        opts.api.orders.put({"closed":true}, e.item.orderNumber )
            .done(function() {
                e.item.closed = true;
                self.update();
            });
    }.bind(this);

    this.openOrdersCount = function(items) {
        var itemCount = 0;
        for( var i = 0, len = items.length ; i<len ; i++ ) {
            if( !items[i].closed ) {
                itemCount++;
            }
        }
        return itemCount;
    }.bind(this)

    this.search = function(e) {
      this.query = e.target.value;
      this.update();
    }.bind(this)

    this.display = function(item) {
        if ( this.query && !item.closed ) {
            var string = (item.orderNumber + " " + this.fullVehicle(item.vehicle) + " " + item.inspectionType).toLowerCase();
            return string.indexOf(this.query) != -1;
        }
        return !item.closed;
    }.bind(this)

});
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