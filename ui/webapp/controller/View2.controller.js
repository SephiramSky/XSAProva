sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("XSAprova.ui.controller.View2", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf XSAprova.ui.view.View2
		 */
		onInit: function () {
		var testData = [];
		var oModel = new sap.ui.model.json.JSONModel({
		data: testData
		});
		this.getView().setModel(oModel);
		},
		
		onAdd: function() {
		
		var eptit = this.getView().byId("input1").getValue();
		
		if (eptit === ""){
			var eptitmess = "Title cannot be blank";
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(eptitmess);
		} else {
		
		// Get the values of the header input fields
		var epi = this.getView().byId("input4").getValue();
		var sta = this.getView().byId("input5").getValue();
		var tit = this.getView().byId("input6").getValue();
		
		if (epi === "" || sta === ""){
			var titmess = "Episode and Season cannot be blank";
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(titmess);
		} else {
		
		// Push this entry into array and bind it to the table
		var itemRow = {
		Episodio: epi,
		Stagione: sta,
		Titolo: tit
		};
		
		var oModel = this.getView().byId("puntate").getModel();
		var itemData = oModel.getProperty("/data");
		// Append the data using .push
		itemData.push(itemRow);
		
		
		// Set Model
		oModel.setData({
		data: itemData
		});
		
		// Clear the input fields.
		this.getView().byId("input4").setValue("");
		this.getView().byId("input5").setValue("");
		this.getView().byId("input6").setValue("");
		}}
		},
		
		onDelete: function(){
			var oTable = this.getView().byId("puntate");
			var oModel2 = oTable.getModel();
			var aRows = oModel2.getData().data;
			var aContexts = oTable.getSelectedContexts();
			
// Loop backward from the Selected Rows
 
			for (var i = aContexts.length - 1; i >= 0; i--) {
// Selected Row
			var oThisObj = aContexts[i].getObject();
 
// $.map() is used for changing the values of an array.
// Here we are trying to find the index of the selected row
// refer - http://api.jquery.com/jquery.map/
			var index = $.map(aRows, function(obj, index) {
 
			if (obj === oThisObj) {
			return index;
			}
			});
 
// The splice() method adds/removes items to/from an array
// Here we are deleting the selected index row
// https://www.w3schools.com/jsref/jsref_splice.asp
 
			aRows.splice(index, 1);
			}
		// Set the Model with the Updated Data after Deletion
		oModel2.setData({
		data: aRows
		});
		// Reset table selection in UI5
		oTable.removeSelections(true);
		},

		onSave: function () {
			//Create all the records added to table via Json model
			var oTable = this.getView().byId("puntate");

			// Get the table Model
			var oModel = oTable.getModel();

			// Get Items of the Table
			var aItems = oTable.getItems();

			// Define an empty Array
			var itemData = [];

			for (var iRowIndex = 0; iRowIndex < aItems.length; iRowIndex++) {
				var l_episodio = oModel.getProperty("episodio", aItems[iRowIndex].getBindingContext());
				var l_stagione = oModel.getProperty("stagione", aItems[iRowIndex].getBindingContext());
				var l_titolo = oModel.getProperty("titolo", aItems[iRowIndex].getBindingContext());

				itemData.push({
					episodio: l_episodio,
					stagione: l_stagione,
					titolopuntata: l_titolo
				});
			}
			// Get the values of the header input fields
			var Titolo = this.getView().byId("input1").getValue();
			var Genere = this.getView().byId("input2").getValue();
			var Anno = this.getView().byId("input3").getValue();
			var Regista = this.getView().byId("input7").getValue();

			var oEntry1 = {};
			oEntry1.titoloserie = Titolo;
			oEntry1.genere = Genere;
			oEntry1.anno = Anno;
			oEntry1.regista = Regista;

			oEntry1.POHeader = itemData;

			var oModel1 = new sap.ui.model.odata.v2.ODataModel("/node_dest/serie.xsodata", false);
			this.getView().setModel(oModel1);

			oModel1.create("/POHeader", oEntry1, {
				method: "POST",
				success: function (oData, oResponse) {

					var successObj = oResponse.data.HandlingUnit;
					var message = "Batch : " + successObj + "  " + "updated successfully";

					jQuery.sap.require("sap.m.MessageBox");

					sap.m.MessageBox.show(message, {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Backend Table(s) Update Status",
						actions: [sap.m.MessageBox.Action.OK]
					});
				},
				error: function (oError) {}
			});
		},
		/**
		 *@memberOf XSAprova.ui.controller.View2
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});