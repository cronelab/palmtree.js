var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let wsSignal = new WebSocket("ws://localhost:21100");
wsSignal.onmessage = (ev) => __awaiter(this, void 0, void 0, function* () {
    const buffer = yield ev.data.arrayBuffer();
    let dv = new DataView(buffer);
    let numChannels = dv.getUint8(0);
    let numSamples = dv.getUint8(1);
    let packageRate = dv.getUint8(2);
    let configLength = 3;
    // console.log(
    //   `
    //     numChannels: ${numChannels}
    //     numSamples: ${numSamples}
    //     packageRate: ${packageRate}
    //     `
    // );
    let dv2 = new DataView(buffer, configLength);
    let data = [];
    let count = 0;
    for (let i = 0; i < numSamples; i++) {
        data[i] = [];
        for (let j = 0; j < numChannels; j++) {
            data[i].push(dv2.getFloat64(count * 8, true));
            count++;
        }
    }
    // console.log(data);
    // console.log(dv2)
});
let wsEvents = new WebSocket("ws://localhost:21122");
wsEvents.onopen = (e) => {
    console.log("Connected to event layer");
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
    console.log(`
    "fileID: ${fileID}"
    "timeElapsed: ${timeElapsed}"
    "srcSampleID: ${srcSampleID}"
    "datSampleID: ${datSampleID}"
    "event: ${event}"
    "eventCode: ${eventCode}"
      `);
};
window.onload = () => {
    document.getElementById('button').onclick = () => {
        wsEvents.send(JSON.stringify({
            'eventState': 'buttonClicked',
            'eventCode': 1
        }));
        console.log(JSON.stringify({
            'eventState': 'buttonClicked',
            'eventCode': 1
        }));
    };
};
//# sourceMappingURL=index.js.map