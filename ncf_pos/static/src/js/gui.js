odoo.define('ncf_pos.gui', function (require) {

    var gui = require('point_of_sale.gui');
    var Model = require('web.DataModel');

    gui.Gui.include({

        show_screen_ncf: function(){
            this.show_screen("ncf", undefined, undefined)
        },
        show_screen: function (screen_name, params, refresh) {

            if(screen_name == "ncf") {
                this._super("receipt", params, refresh);
            }
            else if (screen_name === "receipt" || screen_name === "bill") {
                var self = this;
                var order = this.pos.get_order();
                new Model('pos.order').call("get_fiscal_data", [order.name]).then(function (result) {
                    order.set_ncf(result.ncf);
                    order.set_fiscal_type_name(result.fiscal_type_name);
                    console.log("get_fiscal_data");
                }).done(function () {
                    self.show_screen_ncf()
                });
            } else {
                console.log("super from child")
                this._super(screen_name, params, refresh);
            }
        }
    });


});

