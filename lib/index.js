var request = require('request')
  , _ = require('underscore')
	, log = require('nodeutil').simplelog;
var auth = require('google-api-utility')
  , request = auth.request
  , util = require('util')

//let client can control the request
exports.request = request;

var url = {
  writeTimeSeries: 'https://www.googleapis.com/cloudmonitoring/v2beta2/projects/%s/timeseries:write',
  writeMetricsDescriptor: 'https://www.googleapis.com/cloudmonitoring/v2beta2/projects/%s/metricDescriptors',
	deleteMetric: 'https://www.googleapis.com/cloudmonitoring/v2beta2/projects/%s/metricDescriptors/%s',
	getMetric: 'https://www.googleapis.com/cloudmonitoring/v2beta2/projects/%s/timeseries/%s'
}

exports.init = init;
function init(opts) {
	log.trace('init with opts: ', opts);
	auth.init(opts);
}

exports.generateTSData = generateTSData;
function generateTSData(project, name, value, labels, start, end) {
	var ts = new Date().toISOString();
	var data = {
	 "timeseries": [
		 {
		   "timeseriesDesc": {
			   "project": project,
			   "metric": "custom.cloudmonitoring.googleapis.com/" + name
		   },
		   "point": { }
		 }
	 ]
	}

  if(start || end) {
    data.timeseries[0]['point'] = {
			 "start": start.toISOString(),
			 "end": end ? end.toISOString() : start.toISOString(),
			 "doubleValue": value
		 }
  } else {
	  var ts = new Date().toISOString();
    data.timeseries[0]['point'] = {
			 "start": ts,
			 "end": ts,
			 "doubleValue": value
		 }
  }

  if(labels) {
    data.timeseries[0]['timeseriesDesc']['labels'] = labels
  }
	log.trace('Request data:', JSON.stringify(data));
	return data;
}

exports.createMetricDescriptor = createMetricDescriptor;
function createMetricDescriptor(project, name, labels, callback) {
  var data = {
	 "name": "custom.cloudmonitoring.googleapis.com/" + name,
	 "labels": [
	 ],
	 //"description": "create by gcmetrics",
	 "typeDescriptor": {
		"metricType": "gauge",
		"valueType": "double"
	 },
	 "project": project
	}
	if(labels) {
    data.labels = _.union(data.labels, labels);
	}
	var opts = {
		url: util.format(url.writeMetricsDescriptor, project),
		json: data,
		method: 'POST'
	};

	log.trace('Create option:', opts);
  request(opts, callback);
}

exports.listMetricDescriptors = listMetricDescriptors;
function listMetricDescriptors(projectId, callback) {
  var opts = {
		url: 'https://www.googleapis.com/cloudmonitoring/v2beta2/projects/' + projectId + '/metricDescriptors',
		method: 'GET'
	}

	request(opts, callback);
}

exports.writeTimeSeries = writeTimeSeries;
function writeTimeSeries(project, name, value, labels, start, end, callback) {
	var opts = {
		url: util.format(url.writeTimeSeries, project),
		json: generateTSData(project, name, value, labels, start, end),
		method: 'POST'
	};
  log.debug('create timeseries metric with:', JSON.stringify(opts));
	request(opts, callback);
}

exports.writeCustTimeSeriesData = writeCustTimeSeriesData;
function writeCustTimeSeriesData(project, data, callback) {
	var opts = {
		url: util.format(url.writeTimeSeries, project),
		json: data,
		method: 'POST'
	};
  log.debug('create cust. timeseries metric with:', JSON.stringify(opts));
	request(opts, callback);
}

exports.deleteMetric = deleteMetric;
function deleteMetric(projectId, name, callback) {
  request({
    url: util.format(url.deleteMetric, projectId,
					 encodeURIComponent('custom.cloudmonitoring.googleapis.com/' + name)),
		method: 'DELETE'
	}, callback);
}

exports.getMetric = getMetric;
function getMetric(projectId, name, opts, callback) {
	var opt = {
    url: util.format(url.getMetric, projectId,
					 encodeURIComponent(name.indexOf('googleapis.com') > 0?
							 name:('custom.cloudmonitoring.googleapis.com/' + name))),
		method: 'GET',
		qs: {
      youngest: new Date().toISOString(),
      oldest: new Date(new Date().getTime() - 1*24*60*60*1000).toISOString()
		}
	}
	if(opts) {
		try {
		  opts = JSON.parse(opts);
		} catch(e) {
			return log.error('The input option data should be json text');
		}
		opt.qs = opts;
		if(opts.youngest) opt.qs.youngest = new Date(opts.youngest).toISOString();
		if(opts.oldest) opt.qs.oldest = new Date(opts.oldest).toISOString();
	}
  request(opt, callback);
}
