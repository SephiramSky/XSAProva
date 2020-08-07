sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("XSAprova.ui.controller.View3", {

		onInit: function () {

			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("View3").attachPatternMatched(this._onObjectMatched, this);
			
		},

// 		_onObjectMatched: function (oEvent) {

// 			var args = oEvent.getParameter("arguments");
// 			var modello = JSON.parse(args.modello);       
// 			var datiJSON = new JSONModel(modello);
// 			this.getView().setModel(datiJSON, "modello");

// 		},

// 		tableBind: function (oEvent) {

// 			var oModelTab = this.getView().byId("puntate").getModel();
// 			//var oModelSerie = _onObjectMatched();
			
// 			var itemRow = {
// 				Episodio: oModelTab.Episodio,
// 				Stagione: oModelTab.Stagione,
// 				Titoloepisodio: oModelTab.Titoloepisodio
// 			};
			
// 			this.getView().byId("input4").setValue(itemRow.Episodio);
// 			this.getView().byId("input5").setValue(itemRow.Stagione);
// 			this.getView().byId("input6").setValue(itemRow.Titoloepisodio);
			
// 		},

// 		updateSeriesDetails: function () {
			
// 			var TitoloSerie = this.getView().byId("input1").getValue();
// 			var Genere = this.getView().byId("input2").getValue();
// 			var Anno = this.getView().byId("input3").getValue();
// 			var Regista = this.getView().byId("input7").getValue();
			
// 			var TitoloPuntata = this.getView().byId("input6").getValue();
// 			var Episodio = this.getView().byId("input4").getValue();
// 			var Stagione = this.getView().byId("input5").getValue();
			
// 			var oEntryPuntata = {
// 				titolopuntata: TitoloPuntata,
// 				episodio: Episodio,
// 				stagione: Stagione
// 			};
			
// 			var oEntrySerie = {
// 				titoloserie: TitoloSerie,
// 				genere: Genere,
// 				anno: Anno,
// 				regista: Regista
// 			};
			
// 			var oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			
// 			oModel.update("/POHeader", oEntryPuntata, null, {
// 				success: function() {},
// 				error: function() {}
// 			});
			
// 			oModel.update("/POHeader('"+TitoloSerie+"')", oEntrySerie, null, {
// 				success: function() {},
// 				error: function() {}
// 			});

//		}

	});
});