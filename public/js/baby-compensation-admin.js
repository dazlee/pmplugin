$(function () {
	$(document).on("click", ".update-city-compensation-btn", function (e) {
		e.preventDefault();

		var input = document.querySelector("#"+e.target.dataset.for);
		var cityId = input.dataset.cityid;
		var amount = input.value;

		if (amount) {
			var data = {
				cityId: cityId,
				amount: amount
			};
			$.ajax({
				url: "/api/plugin/baby-compensation/city",
				type: 'POST',
				contentType: "application/json",
				data: JSON.stringify(data),
				success: function(data, textStatus) {
					location.reload();
				},
				error: function (data, textStatus) {
					console.log("error to update baby-compensation", data);
				}
			});
		}
	});

	$(document).on("click", ".update-area-compensation-btn", function (e) {
		var input = document.querySelector("#"+e.target.dataset.for);
		var select = document.querySelector("#"+e.target.dataset.forselect);
		var areaId = select.value;
		var amount = input.value;

		if (amount) {
			var data = {
				areaId: areaId,
				amount: amount
			};

			$.ajax({
				url: "/api/plugin/baby-compensation/area",
				type: 'POST',
				contentType: "application/json",
				data: JSON.stringify(data),
				success: function(data, textStatus) {
					location.reload();
				},
				error: function (data, textStatus) {
					console.log("error to update baby-compensation", data);
				}
			});
		}
	});
});
