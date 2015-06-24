Metrics Example - Memory Usage
====

# Installation

```
npm install gcmetrics -g
```

# Auth

```
gcmetric -t auth -s 288173501788-9fh14iojjmehakjtgkhoubdiaguppn1h@developer.gserviceaccount.com \
  -k $HOME/.gcpkeys/mitac-cp300-taipei101/mitac-cp300-taipei101-8c0662095ef9.pem \
  -p mitac-cp300-taipei101
```

# Create a metric

```
gcmetric -t init -n mymetric -i firstid -d "test first id"
```

# Insert data to metric

```
while [ true ] ; do gcmetric -t simple -n mymetric -d `free | grep Mem | awk '{print $3}'`; sleep 3 ; done
```

# Add to Cloud Monitor

Cloud Monitor is made by StackDriver and integrated to Google Cloud Platform, we can easily integrate it with chart and alert...

Setting the dashboard chart...

![setup dashboard chart](http://3.bp.blogspot.com/-TmiXOkzK1uo/VYrNhuTsE2I/AAAAAAAAlBo/EN7SksvTdTk/s1600/image-741850.png)

The chart from custom metric...

![chart with custom metric](http://1.bp.blogspot.com/-NDBTte_w378/VYrNiP9s28I/AAAAAAAAlB0/UuappyYlA2M/s1600/%253D%253FUTF-8%253FB%253FQ3VzdG9tX01ldHJpY3NfRGFzaGJvYXJkX%252BKAk19EYXNoYm9hcmQucG5n%253F%253D-744557)


