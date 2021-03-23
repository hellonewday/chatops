export function personalReport(data) {
  let statistics = data.map((item) => {
    return {
      type: item.actType,
      date: item.statistical.date,
      hour: item.statistical.hour,
    };
  });
  // console.log(statistics);

  // Problem 1: Count frequency in date.
  var a = statistics.reduce(function (acc, curr) {
    if (typeof acc[curr.date] == "undefined") {
      acc[curr.date] = 1;
    } else {
      acc[curr.date] += 1;
    }

    return acc;
  }, {});

  let dates = Object.keys(a);
  let typeFreq = [];
  dates.forEach((item) => {
    let fragment = statistics.filter((s) => {
      return s.date === item;
    });

    let redu = fragment.reduce(function (acc, curr) {
      if (typeof acc[curr.type] == "undefined") {
        acc[curr.type] = 1;
      } else {
        acc[curr.type] += 1;
      }
      return acc;
    }, {});

    let res = {
      date: item,
      activities: redu,
    };

    typeFreq.push(res);
  });

  return typeFreq;
}
