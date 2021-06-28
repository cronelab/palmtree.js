let wsSignal = new WebSocket("ws://localhost:21100");
let wsEvents = new WebSocket("ws://localhost:21122");

wsSignal.onmessage = async (ev) => {
  const buffer = await ev.data.arrayBuffer();
  let dv = new DataView(buffer);
  let numChannels = dv.getUint8(0);
  let numSamples = dv.getUint8(1);
  let packageRate = dv.getUint8(2);
  // console.log(
  //   `
  //     numChannels: ${dv.getUint8(0)}
  //     numSamples: ${dv.getUint8(1)}
  //     packageRate: ${dv.getUint8(2)}
  //     `
  // );
  let dv2 = new DataView(buffer, 3, numChannels * numSamples);
  let data = [];
  let count = 0;
  for (let i = 0; i < numSamples; i++) {
    data[i] = [];

    for (let j = 0; j < numChannels; j++) {
      data[i].push(dv2.getUint8(count));
      count++;
    }
  }
  console.log(data);
};



wsEvents.onopen = (e) => {
  console.log("connected");
  wsEvents.send("Hello");
};
wsEvents.onmessage = (e) => {
  let data = e.data;
  let splitData = data.split(" ");
  let fileID = splitData[0];
  let timeElapsed = splitData[1];
  let srcSampleID = splitData[2];
  let datSampleID = splitData[3];
  let event = splitData[4];
  let eventCode = splitData[5];
  console.log(
    `
    "fileID: ${fileID}"
    "timeElapsed: ${timeElapsed}"
    "srcSampleID: ${srcSampleID}"
    "datSampleID: ${datSampleID}"
    "event: ${event}"
    "eventCode: ${eventCode}"
      `
  );
};

wsSignal.onmessage = async (ev) => {
  const buffer = await ev.data.arrayBuffer();
  let dv = new DataView(buffer);
  let numChannels = dv.getUint8(0);
  let numSamples = dv.getUint8(1);
  let packageRate = dv.getUint8(2);
  // console.log(
  //   `
  //     numChannels: ${dv.getUint8(0)}
  //     numSamples: ${dv.getUint8(1)}
  //     packageRate: ${dv.getUint8(2)}
  //     `
  // );
  let dv2 = new DataView(buffer, 3, numChannels * numSamples);
  let data = [];
  let count = 0;
  for (let i = 0; i < numSamples; i++) {
    data[i] = [];

    for (let j = 0; j < numChannels; j++) {
      data[i].push(dv2.getUint8(count));
      count++;
    }
  }
  console.log(data);
};