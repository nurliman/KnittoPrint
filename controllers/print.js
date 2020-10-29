const escpos = require("escpos");

escpos.Network = require("escpos-network");

exports.testPrints = (req, res, next) => {
  const device = new escpos.Network("192.168.0.103", 9100);

  //console.log(device);
  const options = { encoding: "GB18030" /* default */ };
  const printer = new escpos.Printer(device, options);

  device.open((error) => {
    printer
      //.font("a")
      .align("ct")
      //.size(1, 1)
      .drawLine()
      .style("B")
      .text("RECEIPT")
      .style("NORMAL")
      .drawLine()
      .text("text")
      .drawLine()
      .cut(true)
      .close()
      // .barcode("1234567", "EAN8")
      // .table(["One", "Two", "Three"])
      // .tableCustom(
      //   [
      //     { text: "Left", align: "LEFT", width: 0.33, style: "B" },
      //     { text: "Center", align: "CENTER", width: 0.33 },
      //     { text: "Right", align: "RIGHT", width: 0.33 },
      //   ],
      //   //{ encoding: "cp857", size: [1, 1] }
      // )
      // .cut(true)
      // .flush();
    // .qrimage("https://github.com/song940/node-escpos", function (err) {
    //   this.cut();
    //   this.close();
    // });
  });

  res.json("go");
};
