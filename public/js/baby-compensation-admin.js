$(function () {
	$(document).on("change", ".area-selection", function (e) {
		var select = e.target;
		var cityId = select.dataset.cityid;
		var areaId = select.value;
		$.ajax({
			url: "/api/plugin/baby-compensation/city/"+cityId+"/area/"+areaId,
			type: 'GET',
			success: function(data, textStatus) {
				var area = data.area;
				document.querySelector("#city_" + cityId + "_area").value = area.babyCompensation || "";
				document.querySelector("#city_" + cityId + "_area_url").value = area.babyCompensationUrl || "";
				document.querySelector("#city_" + cityId + "_area_dm_url").value = area.babyCompensationDMUrl || "";
			},
			error: function (data, textStatus) {
				console.log("error to update baby-compensation", data);
			}
		});
	});

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
	$(document).on("click", ".update-city-compensation-url-btn", function (e) {
		e.preventDefault();

		var input = document.querySelector("#"+e.target.dataset.for);
		var cityId = input.dataset.cityid;
		var url = input.value;

		if (url) {
			var data = {
				cityId: cityId,
				url: url
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
	$(document).on("click", ".update-city-compensation-dm-url-btn", function (e) {
		e.preventDefault();

		var input = document.querySelector("#"+e.target.dataset.for);
		var cityId = input.dataset.cityid;
		var dmUrl = input.value;

		if (dmUrl) {
			var data = {
				cityId: cityId,
				dmUrl: dmUrl
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

	$(document).on("click", ".update-area-compensation-url-btn", function (e) {
		e.preventDefault();

		var input = document.querySelector("#"+e.target.dataset.for);
		var select = document.querySelector("#"+e.target.dataset.forselect);
		var areaId = select.value;
		var url = input.value;
		var data = {
			areaId: areaId,
			url: url
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
	});

	$(document).on("click", ".update-area-compensation-dm-url-btn", function (e) {
		e.preventDefault();

		var input = document.querySelector("#"+e.target.dataset.for);
		var select = document.querySelector("#"+e.target.dataset.forselect);
		var areaId = select.value;
		var dmUrl = input.value;
		var data = {
			areaId: areaId,
			dmUrl: dmUrl
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
	});
});
