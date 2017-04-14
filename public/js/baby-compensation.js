$(function () {
	if (areas) {
		$(document).on("change", "#city-selector", function (e) {
			var selector = e.target;
			var cityId = selector.value;
			var selectedAreas = areas.filter(function (area) {
				return area.cityId == cityId;
			});
			var areaSelector = document.querySelector("#area-selector");
			var areaOptionsHtml = renderAreaOptions(selectedAreas);
			areaSelector.innerHTML = areaOptionsHtml;
		});

		$(document).on("click", "#submit-baby-compensation-btn", function (e) {
			var citySelector = document.querySelector("#city-selector");
			var areaSelector = document.querySelector("#area-selector");
			$.ajax({
				url: "/api/plugin/baby-compensation/city/" + citySelector.value + "/area/" + areaSelector.value,
				type: 'GET',
				success: function(data, textStatus) {
					document.querySelector("#baby-compensation-result .pm-plugin-message-title").innerHTML = data.city.name + " " + data.area.name;
					document.querySelector("#baby-compensation-result .pm-plugin-message-content").innerHTML = data.area.babyCompensation;
				},
				error: function (data, textStatus) {
					console.log("error to update baby-compensation", data);
				}
			});
		});
	}

	function renderAreaOptions(areas) {
		return areas.reduce(function (reduced, area) {
			var html = "<option value='" + area._id + "'>" + area.name + "</option>";
			return reduced + html;
		}, "");
	}
});
