//Usuários Logados

from(bucket: "mybucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "rick-and-morty")
  |> filter(fn: (r) => r["_field"] == "user_token")
  |> filter(fn: (r) => r["host"] == "host1")
  |> distinct(column: "_value")
  |> count()
  

  //Número de Pesquisas por nome

 from(bucket: "mybucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "rick-search")
  |> filter(fn: (r) => r["_field"] == "name")
  |> filter(fn: (r) => r["host"] == "host1")
  |> count()
  
//Quantidade de Pesquisas por nome

   from(bucket: "mybucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "rick-search")
  |> filter(fn: (r) => r["_field"] == "name")
  |> filter(fn: (r) => r["_value"] != "")
  |> group(columns: ["_value"])
  |> drop(columns: ["_measurement"])
  |> drop(columns: ["host"])
  |> drop(columns: ["_start"])
  |> drop(columns: ["_stop"])
  |> rename(columns: {_field: ""})


//Quantidade de Pesquisas por Parametros
 from(bucket: "mybucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "rick-search")
  |> filter(fn: (r) => r["host"] == "host1")
  |> rename(columns: {_field: ""})
  |> drop(columns: ["_measurement"])
  |> drop(columns: ["host"])
  |> drop(columns: ["_start"])
  |> drop(columns: ["_stop"])
  |> count()

