<addForm>
    <div id="modalForm" class="modal fade" tabindex="-1" role="dialog">
        <div class="{class} alert alert-{type}" role="alert">
            { message }
        </div>
        <form class="modal-dialog" onsubmit="{saveOrder}">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">New inspection and report</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="notes">Notes</label>
                    <input type="text" class="form-control" id="notes" name="notes">
                </div>
                <div class="form-group">
                    <label for="year">Year</label>
                    <input type="text" class="form-control" id="year" name="year" required pattern="\d*">
                </div>
                <div class="form-group">
                    <label for="make">Make</label>
                    <input type="text" class="form-control" id="make" name="make" required>
                </div>
                <div class="form-group">
                    <label for="model">Model</label>
                    <input type="text" class="form-control" id="model" name="model" required>
                </div>
                <div class="form-group">
                    <label for="model">Inspection type</label>
                    <select type="text" class="form-control" id="type" name="type" required>
                        <option each={ items } value="{this.name}">{this.name}</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
            </div><!-- /.modal-content -->
        </form><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <script>
        
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

        showAlert(type, message) {
            self.message = message;
            self.type = type;
            self.class = "";
            self.update();          
            setTimeout( function() { 
                self.class = "hidden"
                self.update();          
            }, 4000);
        };

        saveOrder(e) {           
            if( !e.target.year.value || !e.target.make.value || !e.target.model.value ) {
                self.showAlert( "danger", "Theres a problem!" );
            } else {
                var order = {
                    inspectionType:e.target.type.value,
                    note:e.target.notes.value,
                    vehicle : {
                        year: parseInt(e.target.year.value),
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
        }
    </script>
</addForm>