$(function () {

	if (cities && areas && accessLogs) {
		$(document).on("change", ".city-selector", function (e) {
			var selector = e.target;
			var cityId = e.target.value;
			var targetId = selector.dataset.for;
			var targetType = selector.dataset.fortype;
			var selectedAreas = areas.filter(function (area) {
				return area.cityId === cityId;
			});
			var areaOptionsHtml = renderAreaOptionsByType(targetType, selectedAreas);
			document.querySelector("#" + targetId).innerHTML = areaOptionsHtml;
		});

		$(document).on("click", ".update-statistic-btn", function (e) {
			var dataset = e.target.dataset;
			var category = dataset.category;
			var chartWrapperId = dataset.for;
			// var chartWrapper = document.querySelector("#" + dataset.for);
			var form = document.querySelector("#" + dataset.forform);
			var query = getQueryFromForm(form);

			var seriesList = getSeriesListFromAccessLog(category, query, accessLogs);
			drawDatetimeLineChart(chartWrapperId, "", seriesList);
		});
	}

	function getSeriesListFromAccessLog(category, query, accessLogs) {
		if (!query.area) return;
		var cityId = query.city;
		var areaIds = Array.isArray(query.area) ? query.area : [query.area];
		var getAccessLogsByGivenCategory = filterByCategory(category);
		var getAccessLogsByGivenCityId = filterByCityId(cityId);

		var filteredAccessLogs = [];
		filteredAccessLogs = getAccessLogsByGivenCategory(accessLogs);
		filteredAccessLogs = getAccessLogsByGivenCityId(filteredAccessLogs);
		var result = {};
		areaIds.reduce(function (reduced, areaId) {
			if (areaId === "all") {
				reduced[areaId] = filteredAccessLogs;
			} else {
				reduced[areaId] = filterByAreaName(areaId, filteredAccessLogs);
			}
			return reduced;
		}, result);

		var keys = Object.keys(result);
		var seriesList = keys.map(function (key) {
			var array = result[key];
			var series = getSeriesByAccessLogs(key, result[key]);
			return series;
		});
		return seriesList;
	}
	function getQueryFromForm(form) {
		if (Qs) {
			var serializedForm = $(form).serialize();
			return Qs.parse(serializedForm);
		} else {
			throw new Error("missing Qs library");
		}
	}
	function renderAreaOptionsByType(type, areas) {
		switch (type) {
			case "select":
				return renderAreaSelectOptions(areas);
			case "checkbox":
				return renderAreaCheckboxOptions(areas);
			default:
		}
	}
	function renderAreaSelectOptions(areas) {
		return areas.reduce(function (reduced, area) {
			var html = "<option name='area' value='" + area._id + "'>" + area.name + "</option>";
			return reduced + html;
		}, "");
	}
	function renderAreaCheckboxOptions(areas) {
		return areas.reduce(function (reduced, area) {
			var html = "<label class='checkbox-inline'><input type='checkbox' name='area' value='" + area.name + "'>" + area.name + "</label>";
			return reduced + html;
		}, "");
	}
	var filterByCategory = filterBy("content.category");
	var filterByCityId = filterBy("content.city._id");
	var filterByAreaId = filterBy("content.area._id");
	var filterByAreaName = filterBy("content.area.name");
});
