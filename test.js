let x = [
  {
    id: "60545503ad02871e9c939d84",
    actType: "Intention",
    content: "Test Intention data",
    createdAt: "thứ sáu, 19 tháng 3 năm 2021 14:38",
    statistical: {
      date: "19/03/2021",
      hour: "14:38",
    },
  },
  {
    id: "6054550cad02871e9c939d85",
    actType: "Correction",
    content: "Test correction data",
    createdAt: "thứ sáu, 19 tháng 3 năm 2021 14:38",
    statistical: {
      date: "19/03/2021",
      hour: "14:38",
    },
  },
  {
    id: "60546172242a662bac68e4c3",
    actType: "Correction",
    content: "Train data 1",
    createdAt: "thứ sáu, 19 tháng 3 năm 2021 15:31",
    statistical: {
      date: "19/03/2021",
      hour: "15:31",
    },
  },
  {
    id: "605844590a698c231c612bfa",
    actType: "Correction",
    content: "Newspaper is a good job.",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:16",
    statistical: {
      date: "22/03/2021",
      hour: "14:16",
    },
  },
  {
    id: "605844fd0a698c231c612bfb",
    actType: "Correction",
    content: "Jennyy",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:19",
    statistical: {
      date: "22/03/2021",
      hour: "14:19",
    },
  },
  {
    id: "6058453e0a698c231c612bfc",
    actType: "Correction",
    content: "Test data 3",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:20",
    statistical: {
      date: "22/03/2021",
      hour: "14:20",
    },
  },
  {
    id: "6058457d0a698c231c612bfd",
    actType: "Correction",
    content: "Hello Vietnam",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:21",
    statistical: {
      date: "22/03/2021",
      hour: "14:21",
    },
  },
  {
    id: "605845a10a698c231c612bfe",
    actType: "Correction",
    content: "Hello Many more",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:22",
    statistical: {
      date: "22/03/2021",
      hour: "14:22",
    },
  },
  {
    id: "605845a70a698c231c612bff",
    actType: "Correction",
    content: "Hello Many more",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:22",
    statistical: {
      date: "22/03/2021",
      hour: "14:22",
    },
  },
  {
    id: "605845ad0a698c231c612c00",
    actType: "Correction",
    content: "Hello Many more",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:22",
    statistical: {
      date: "22/03/2021",
      hour: "14:22",
    },
  },
  {
    id: "605845b90a698c231c612c01",
    actType: "Correction",
    content: "Hello Many more",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:22",
    statistical: {
      date: "22/03/2021",
      hour: "14:22",
    },
  },
  {
    id: "605845d50a698c231c612c02",
    actType: "Intention",
    content: "Hello Many more",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:23",
    statistical: {
      date: "22/03/2021",
      hour: "14:23",
    },
  },
  {
    id: "605845ef0a698c231c612c03",
    actType: "Intention",
    content: "CMC Telecom",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:23",
    statistical: {
      date: "22/03/2021",
      hour: "14:23",
    },
  },
  {
    id: "6058466b0a698c231c612c04",
    actType: "Correction",
    content: "Hello World",
    createdAt: "thứ hai, 22 tháng 3 năm 2021 14:25",
    statistical: {
      date: "22/03/2021",
      hour: "14:25",
    },
  },
];

let statistics = x.map((item) => {
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

// console.log(typeFreq);

console.log(
  typeFreq.map((item) => {
    return item.date;
  })
);

console.log(
  typeFreq.map((item) => {
    return item.activities["Intention"];
  })
);

console.log(
  typeFreq.map((item) => {
    return item.activities["Correction"];
  })
);
