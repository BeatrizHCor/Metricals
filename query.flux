from(bucket: "mybucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "rick-and-morty")
  |> filter(fn: (r) => r["_field"] == "user_token")
  |> filter(fn: (r) => r["host"] == "host1")
  |> distinct(column: "_value")
  |> count()
  