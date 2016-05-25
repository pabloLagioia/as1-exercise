<alert>

  

  <script>
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
  </script>

</alert>
