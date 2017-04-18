$(function () {
	if (baseUrl && areas) {
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
				url: baseUrl + "/api/plugin/baby-compensation/city/" + citySelector.value + "/area/" + areaSelector.value,
				type: 'GET',
				success: function(data, textStatus) {
					var area = data.area;
					document.querySelector("#baby-compensation-result .pm-plugin-message-title").innerHTML = data.city.name + " " + area.name;
					if (area.babyCompensation) {
						$("#baby-compensation-content").removeClass("hidden");
						document.querySelector("#baby-compensation-content .content").innerHTML = area.babyCompensation;
					} else {
						$("#baby-compensation-content").addClass("hidden");
					}
					if (area.babyCompensationRestriction) {
						$("#baby-compensation-restriction").removeClass("hidden");
						document.querySelector("#baby-compensation-restriction .content").innerHTML = area.babyCompensationRestriction;
					} else {
						$("#baby-compensation-restriction").addClass("hidden");
					}


					var actionHTML = "";
					if (area.babyCompensationUrl) {
						actionHTML += '<a href="' + area.babyCompensationUrl + '" class="pm-btn sparse pm-btn-blue" target="_blank">查看網站</a>'
					}
					if (area.babyCompensationDMUrl) {
						actionHTML += '<a href="' + area.babyCompensationDMUrl + '" class="pm-btn sparse pm-btn-blue" target="_blank">下載文件</a>'
					}
					document.querySelector("#baby-compensation-actions").innerHTML = actionHTML;

					$("#pm-actions").removeClass("hidden");
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
