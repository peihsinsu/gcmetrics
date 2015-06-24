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


