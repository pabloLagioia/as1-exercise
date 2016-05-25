riot.tag2('addform', '<div onsubmit="{saveOrder}" id="modalForm" class="modal fade" tabindex="-1" role="dialog"> <div class="{class} alert alert-{type}" role="alert"> {message} </div> <form class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">New inspection and report</h4> </div> <div class="modal-body"> <div class="form-group"> <label for="notes">Notes</label> <input type="text" class="form-control" id="notes" name="notes"> </div> <div class="form-group"> <label for="year">Year</label> <input type="text" class="form-control" id="year" name="year"> </div> <div class="form-group"> <label for="make">Make</label> <input type="text" class="form-control" id="make" name="make"> </div> <div class="form-group"> <label for="model">Model</label> <input type="text" class="form-control" id="model" name="model"> </div> <div class="form-group"> <label for="model">Model</label> <select type="text" class="form-control" id="type" name="type"> <option each="{items}" value="{this.name}">{this.name}</option> </select> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="submit" class="btn btn-primary">Save changes</button> </div> </div> </form> </div>', '', '', function(opts) {

        var self = this;
        this.class = "hidden";

        this.on("mount", function() {
           $.get("/api/inspectionTypes/", function(res) {
                self.items = res.items
                self.update();
            });
        });

        this.saveOrder = function(e) {
            var order = {
                inspectionType:e.target.type.value,
                note:e.target.notes.value,
                vehicle : {
                    year: e.target.year.value,
                    make: e.target.make.value,
                    model: e.target.model.value
                }
            }
            $.ajax({
                url: "/api/orders/",
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify( order ),
                success: function(result) {
                    riot.update();
                    opts.sharer.trigger("listUpdated");
                    self.message = "Order Saved";
                    self.type = "success";
                    self.class = ""
                    self.update();

                    setTimeout( function() {
                        self.update();
                    }, 5000);

                }
            });
        }.bind(this)
});
riot.tag2('alert', '', '', '', function(opts) {
        var self = this;
        this.class = "hidden";
        opts.sharer.on("alertUSer", function(type, message) {
            self.message = message;
            self.type = type;
            self.class = ""
            self.update();

            setTimeout( function() {
                self.class = "hidden";
                self.update();
            }, 5000);

        });
});

riot.tag2('list', '<h3>{opts.title}</h3> <form onsubmit="{add}"> <div class="row"> <div class="col-md-5"> <div class="input-group"> <span class="input-group-addon" id="basic-addon1">@</span> <input type="text" class="form-control" placeholder="Search here..." aria-describedby="basic-addon1" name="input" onkeyup="{search}"> </div> </div> <div class="col-md-2"> <a data-toggle="modal" data-target="#modalForm" href="#" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> New inspection and report</a> </div> </div> </form> <ul> <li each="{items.filter(whatShow)}"> <div class="or">{this.orderNumber}</div> <div class="vehicle">{fullVehicle(this.vehicle)}</div> <div class="type" onclick="{remove}">{this.closed}</div> </li> </ul>', '', '', function(opts) {


   var getList = function() {
        $.get("/api/orders", function(res) {
            self.items = res.items
            self.update();
        });
    }

    var self = this;

    this.fullVehicle = function(vehicle) {
        return vehicle.year + " " + vehicle.make + " " + vehicle.model
    }.bind(this)

    this.on("mount", function() {
        getList();
    });

    opts.sharer.on("listUpdated", function() {
        getList();
    })

    this.remove = function(e) {
        $.ajax({
            url: "/api/orders/"+e.item.orderNumber,
            type: 'PUT',
            contentType: "application/json",
            data: JSON.stringify( {"closed":true} ),
            success: function(result) {
                getList();
                self.update();
            }
        });
    }.bind(this)

    this.overlay = function() {
        riot.mount("addForm");
    }.bind(this)

    this.whatShow = function(item) {
        var string = (item.orderNumber + " " + item.vehicle.year + " " + item.vehicle.make + " " + item.vehicle.model).toLowerCase();
        if ( this.text && !item.closed ) {
            return string.indexOf(this.text) != -1;
        }
        return !item.closed;
    }.bind(this)

    this.search = function(e) {
      this.text = e.target.value;
    }.bind(this)

});

$(document).ready(function(){
      
   riot.mount( '*', { sharer:riot.observable() } );
});