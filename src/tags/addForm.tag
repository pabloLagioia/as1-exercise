<addForm>
    <div onsubmit="{saveOrder}" id="modalForm" class="modal fade" tabindex="-1" role="dialog">
        <div class="{class} alert alert-{type}" role="alert">
            { message }
        </div>
        <form class="modal-dialog">
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
                    <input type="text" class="form-control" id="year" name="year">
                </div>
                <div class="form-group">
                    <label for="make">Make</label>
                    <input type="text" class="form-control" id="make" name="make">
                </div>
                <div class="form-group">
                    <label for="model">Model</label>
                    <input type="text" class="form-control" id="model" name="model">
                </div>
                <div class="form-group">
                    <label for="model">Model</label>
                    <select type="text" class="form-control" id="type" name="type">
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
           $.get("/api/inspectionTypes/", function(res) {
                self.items = res.items
                self.update();
            }); 
        });

        saveOrder(e) {
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
        }
    </script>
</addForm>