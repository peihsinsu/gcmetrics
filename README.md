Google Cloud Metrics Node.js CLI
====

This is a command line for interactive with google cloud platform - [cloud monitoring api](https://cloud.google.com/monitoring/docs). 

# Installation

```
npm install gcmetric -g
```

# Commands

## Auth

```
gcmetric -t auth -s 288173501788-9fh14iojjmehakjtgkhoubdiaguppn1h@developer.gserviceaccount.com -k /Users/peihsinsu/.gcpkeys/mitac-cp300-taipei101/mitac-cp300-taipei101-8c0662095ef9.pem -p mitac-cp300-taipei101
```

## Initial a lightweight  metric 

```
gcmetric -t init -n test 
```

## Write a lightweight metric 

```
gcmetric -t simple -n test -d 2000
```

## Initial a metric with descriptor

```
gcmetric -t init -n test -i firstid -d "test first id"
```

## Write a metric with descriptor

```
gcmetric -t delete -p mitac-cp300-taipei101 -n test 
```

## Get by metric

```
gcmetric -t get -p mitac-cp300-taipei101 -n test
```
