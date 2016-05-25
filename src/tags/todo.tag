<list>

  <h3>{ opts.title }</h3>

  <form onsubmit={ add }>
  
    <div class="row">
        <div class="col-md-5">
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Search here..." aria-describedby="basic-addon1" name="input" onkeyup={ search }>
            </div>
        </div>
        <div class="col-md-2">
            <a data-toggle="modal" data-target="#modalForm" href="#" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> New inspection and report</a>
        </div>
    </div>
  </form>

  <ul>
    <li each={ items.filter(whatShow) }>
        <div class="or">{ this.orderNumber }</div>
        <div class="vehicle">{ fullVehicle(this.vehicle) }</div>
        <div class="type" onclick={remove}>{ this.closed }</div>
    </li>
  </ul>

  <!-- this script tag is optional -->
  <script>


   var getList = function() {
        $.get("/api/orders", function(res) {
            self.items = res.items
            self.update();
        });
    }
    
    var self = this;
  
    fullVehicle(vehicle) {
        return vehicle.year + " " + vehicle.make + " " + vehicle.model
    }
  
    this.on("mount", function() {
        getList();
    });
  
    opts.sharer.on("listUpdated", function() {
        getList();
    })
  
    remove(e) {
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
    }

    overlay() {
        riot.mount("addForm");
    }

    whatShow(item) {
        var string = (item.orderNumber + " " + item.vehicle.year + " " + item.vehicle.make + " " + item.vehicle.model).toLowerCase();
        if ( this.text && !item.closed ) {
            return string.indexOf(this.text) != -1;
        }
        return !item.closed;
    }
    
    search(e) {
      this.text = e.target.value;
    }

  </script>

</list>
