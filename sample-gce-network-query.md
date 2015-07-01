Compute Engine Network Traffic Query
====

You can use gmetrics for query a interval of GCE instance network traffic. See the query example.


## Auth：

Before using gmetric, you should install and auth the tool...

```
gcmetric -t auth -s 288173501788-9fh14iojjmehakjtgkhoubdiaguppn1h@developer.gserviceaccount.com \
  -k $HOME/.gcpkeys/mitac-cp300-taipei101/mitac-cp300-taipei101-8c0662095ef9.pem \
  -p mitac-cp300-taipei101
```

## Query compute engine network相關metrics name：

Before you query, you should know the metric name first..., you can use list command and grep to check the compute engine network related metric.

```
gcmetric -t list -p mitac-cp300-taipei101 | grep 'compute.googleapis.com/instance/network'
   "name": "compute.googleapis.com/instance/network/received_bytes_count",
   "name": "compute.googleapis.com/instance/network/received_packets_count",
   "name": "compute.googleapis.com/instance/network/sent_bytes_count",
   "name": "compute.googleapis.com/instance/network/sent_packets_count",
```

## Query the network using interval：

In the query command, you can use the full name of the GCE default network metric name and time interval for query the project network traffic.

```
gcmetric -t get -p mitac-cp300-taipei101 -n compute.googleapis.com/instance/network/sent_packets_count -d '{"youngest":"2015-6-22 23:18","oldest":"2015-6-22 23:15"}'

{
 "kind": "cloudmonitoring#listTimeseriesResponse",
 "youngest": "2015-06-22T15:18:00.000Z",
 "oldest": "2015-06-22T15:15:00.000Z",
 "timeseries": [
  {
   "timeseriesDesc": {
    "project": "288173501788",
    "metric": "compute.googleapis.com/instance/network/sent_packets_count",
    "labels": {
     "cloud.googleapis.com/service": "compute.googleapis.com",
     "compute.googleapis.com/resource_type": "instance",
     "cloud.googleapis.com/location": "asia-east1-a",
     "compute.googleapis.com/resource_id": "5364950244253746101",
     "compute.googleapis.com/instance_name": "simon-debian6",
     "compute.googleapis.com/loadbalanced": "false"
    }
   },
   "points": [
    {
     "start": "2015-06-22T15:16:13.000Z",
     "end": "2015-06-22T15:17:13.000Z",
     "int64Value": "144"
    },
    {
     "start": "2015-06-22T15:15:13.000Z",
     "end": "2015-06-22T15:16:13.000Z",
     "int64Value": "144"
    },
    {
     "start": "2015-06-22T15:14:13.000Z",
     "end": "2015-06-22T15:15:13.000Z",
     "int64Value": "144"
    }
   ]
  },
  {
   "timeseriesDesc": {
    "project": "288173501788",

    "metric": "compute.googleapis.com/instance/network/sent_packets_count",
    "labels": {
     "cloud.googleapis.com/service": "compute.googleapis.com",
     "compute.googleapis.com/resource_type": "instance",
     "cloud.googleapis.com/location": "asia-east1-a",
     "compute.googleapis.com/resource_id": "5364950244253746101",
     "compute.googleapis.com/instance_name": "simon-debian6",
     "compute.googleapis.com/loadbalanced": "true"
    }
   },
   "points": [
    {
     "start": "2015-06-22T15:16:13.000Z",
     "end": "2015-06-22T15:17:13.000Z",
     "int64Value": "0"
    },
    {
     "start": "2015-06-22T15:15:13.000Z",
     "end": "2015-06-22T15:16:13.000Z",
     "int64Value": "0"
    },
    {
     "start": "2015-06-22T15:14:13.000Z",
     "end": "2015-06-22T15:15:13.000Z",
     "int64Value": "0"
    }
   ]
  }
 ]
}
```
 
