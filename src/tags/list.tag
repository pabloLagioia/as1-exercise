<list>
  <form onsubmit={ add } class="row actions">
        <div class="col-xs-12 col-sm-7">
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-search"></i></span>
                <input type="text" class="form-control" placeholder="Search here..." aria-describedby="basic-addon1" name="input" onkeyup={ search }>
            </div>
        </div>
        <div class="col-xs-12 col-sm-5"> 
            <a data-toggle="modal" data-target="#modalForm" href="#" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New inspection & Report</a>
        </div>
  </form>
  
  <h2>Dashboard</h2>
  <p class="list-head">Viewing: {openOrdersCount(items)} vehicle(s)</p>
  
  <ul class="list-unstyled">
    <li class="clearfix" each={ items.filter(display) }>
        <ul class="ro-list list-unstyled">
            <li class="ro col-xs-6 col-sm-2">RO# { this.orderNumber }</li>
            <li class="vehicle col-xs-6 col-sm-4">{ fullVehicle(this.vehicle) }</li>
            <li class="type col-xs-12 col-sm-6"> <i class="glyphicon glyphicon-th-list"></i> { this.inspectionType } <i onclick={remove} class="pull-right glyphicon glyphicon-remove remove-btn"></i></li>
        </ul>
    </li>
  </ul>

 <script>

   var self = this;
  
    fullVehicle(vehicle) {
        return vehicle.year + " " + vehicle.make + " " + vehicle.model
    }
  
    this.on("mount listUpdated", function() {
        opts.api.orders.get()
            .done(function(res) {
                self.items = res.items
                self.update();
            });
    });
    
    remove(e) {
        opts.api.orders.put({"closed":true}, e.item.orderNumber )
            .done(function() {
                e.item.closed = true;
                self.update();
            });        
    };
    
    openOrdersCount(items) {
        var itemCount = 0;
        for( var i = 0, len = items.length ; i<len ; i++ ) {
            if( !items[i].closed ) {
                itemCount++;
            }
        }
        return itemCount;
    }

    search(e) {
      this.query = e.target.value;
      this.update();
    }

    display(item) {
        if ( this.query && !item.closed ) {
            var string = (item.orderNumber + " " + this.fullVehicle(item.vehicle) + " " + item.inspectionType).toLowerCase();
            return string.indexOf(this.query) != -1;
        }
        return !item.closed;
    }
    

  </script>

</list>