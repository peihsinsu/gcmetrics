gmetric API document
====

# Installation

You can use this module in your project...

```
npm install gcmetrics
```

# Auth

In the auth method, it will save the related token information in "/tmp" path.

```
var metric = require('gmetrics')
metric.init({
      scope: 'https://www.googleapis.com/auth/monitoring',
      client_email: "your-service-account-email",
      key_pem: "your-pem-file-path"
    });
```

# Create metrics and write data

## Create lightweight metric

```
metric.createMetricDescriptor(project, metric_name, null, function(err, req, doc){
  if(err) console.log('ERROR:', e);
  console.log(doc);
});
```

## Create labeled metric

```
var id = process.argv[3];
var labelscfg = [{
	 "key": "custom.cloudmonitoring.googleapis.com/" + id,
	 "description": "A store ID."
	},{
	 "key": "custom.cloudmonitoring.googleapis.com/test" ,
	 "description": "A test ID."
	}]
metric.createMetricDescriptor(project, metric_name, labelscfg, function(err, req, doc){
  if(err) console.log('ERROR:', e);
  console.log(doc);
});
```


## Write data to metric - lightweight metric

```
metric.writeTimeSeries(metric_name, value);
```

## Write data to metric - labeled metric

```
metric.writeTimeSeries(
        project_id,
        metric_name,
        value,
        {"custom.cloudmonitoring.googleapis.com/" + metricid : catelogid},
        null,
        null,
        function(err, req, doc){
					if(err) console.log('ERROR:', err);
					console.log(doc);
				});
```

## Get the metric data

You can also get the metric data that already input.

```
var opts = {"youngest":"2015-6-22 23:18","oldest":"2015-6-22 23:15"}; //option
metric.getMetric(project_id,
        metric_name,
        opts ? opts : null,
        function(err, req, doc){
          if(err) console.log('ERROR:', err);
          console.log(doc);
        });
```

## Delete metric

```
metric.deleteMetric(project_id , metric_name, function(err, req, doc){
  if(err) console.log('ERROR:', err);
  console.log(doc);
});
```
