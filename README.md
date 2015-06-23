Google Cloud Metrics Node.js CLI
====

This is a command line for interactive with google cloud platform - [cloud monitoring api](https://cloud.google.com/monitoring/docs).

# Installation

```
npm install gcmetric -g
```

# Commands

## Auth gcmetric command

In the auth flow, it needs service account for implement Oauth2.0 authentication. Here, we need to prepare the account email and the pem key for auth. And the project id also need to specify in the auth command.


```
gcmetric -t auth \
  -s 288173501788-9fh14iojjmehakjtgkhoubdiaguppn1h@developer.gserviceaccount.com \
  -k /Users/peihsinsu/.gcpkeys/mitac-cp300-taipei101/mitac-cp300-taipei101-8c0662095ef9.pem \
  -p mitac-cp300-taipei101
```

In the command, the parameters are:
* -s: the service account email
* -k: the service account pem key
* -p: the interactive project

## Lightweight metric

### Initial a lightweight  metric

```
gcmetric -t init -n mymetric
```

* -n: the metric name

### Write a lightweight metric

```
gcmetric -t simple -n mymetric -d 2000
```

* -n: the metric name
* -d: the metric data

## Metric Descriptor - Simple id

### Initial a metric with descriptor

```
gcmetric -t init -n mymetric2 -i firstid -d "test first id"
```

* -n: the metric name
* -i: the metric id
* -d: the description txt

### Write a metric with descriptor

```
gcmetric -t labeled -n mymetric2 -d 1234
```

* -n: metric name
* -d: the data write to the metric

## Metric Descriptor - Multiple id

### Initial a multiple metric descriptor

You can create a multiple metric descriptor into a custom metric:

```
gcmetric -t init -n mymetric3 -j '[{
     "key": "custom.cloudmonitoring.googleapis.com/id1",
     "description": "This is ID1."
    },{
     "key": "custom.cloudmonitoring.googleapis.com/id2" ,
     "description": "This is ID2."
    }]'
```

In this case, you can write the id1 and id2 type of data into the metric: mymetric3.

### Write data to multiple metric descriptor

Write data with specify the metric descriptor.

```
gcmetric -t labeled \
  -j '{"custom.cloudmonitoring.googleapis.com/id2":"id222"}' \
  -n mymetric3 \
  -d 1230
```

* -n: metric name
* -d: the metric value
* -j: the metric descriptor

### Write customize metric data

You can also write your custom json data as input to cloud monitoring.

```
gcmetric -t custw \
  -j '{
  "timeseries":[
    {
      "timeseriesDesc":{
        "project":"mitac-cp300-taipei101",
        "metric":"custom.cloudmonitoring.googleapis.com/mymetric3",
        "labels":{
          "custom.cloudmonitoring.googleapis.com/id2":"id222"
        }
      },
      "point":{
        "start":"2015-06-23T11:31:23.781Z",
        "end":"2015-06-23T11:31:23.781Z",
        "doubleValue":"1230"
      }
    }
  ]
}'
```

In the write customize metric data sample, you can write more timeseries in the array in one request. It helps for the performance.

* -j: the json data that you want to input

## Delete a metric

You can also delete the metric by using delete like:

```
gcmetric -t delete -p mitac-cp300-taipei101 -n mymetric
```

* -n: metric name
* -p: project name

## Retrieve metric data

For some reason, you may need to retrieve the metric data from the project. You can use the following sample for retrieve the data from command line.

### Get by metric

```
gcmetric -t get -p mitac-cp300-taipei101 -n mymetric
```

* -n: the metric name

You can also specify the youngest and oldest in the option json data for restrict the interval.

```
gcmetric -t get -p mitac-cp300-taipei101 -n mymetric -d '{"youngest":"2015-6-22 23:18","oldest":"2015-6-22 23:15"}'
```

* -n: the metric name
* -d: the options for restrict the data

## Help Page

```
gcmetric -h

  Usage: gcmetric [options]

  Options:

    -h, --help                               output usage information
    -V, --version                            output the version number
    -p, --project <project>                  google cloud platform project id
    -s, --service_account <service_account>  service account email
    -k, --key <key>                          service account pem key
    -t, --type <type>                        auth | init | simple | labeled
    -n, --name <name>                        metric name
    -i, --id <id>                            metrics id
    -d, --data <data>                        metrics data value
    -j, --jsondata <jsondata>                metrics original json data
    -l, --loglevel <loglevel>                log level
```


## Hint

* If you input json data, please make sure the txt is json format.
* Auth keeps the config data in /tmp, you can find:
  * auth.cfg: the cache project and related setting.
  * gtoken.json: the Oauth2 token related information.
