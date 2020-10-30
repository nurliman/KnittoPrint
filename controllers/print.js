const escpos = require("escpos");
const JsBarcode = require('jsbarcode');
const { createCanvas } = require("canvas");

escpos.Network = require("escpos-network");

const device = new escpos.Network("192.168.21.99");
const options = { encoding: "GB18030" /* default */ };
const printer = new escpos.Printer(device, options);


exports.testPrints = (req, res, next) => {


  const customer = 'ANAM SS.SABLON'
  const noTelp = '0821 4070 5811'
  const provinsi = 'Jawa Barat'
  const kota = 'Bandung'
  const kecamatan = 'Bandung Kulon'
  const kelurahan = 'Cibuntu'
  const ekspedisi = 'CUSTOMER - CUSTOMER'
  const alamat = 'Jl. Holis No.35, Cibuntu, Kec. Bandung Kulon, Kota Bandung, Jawa Barat 40212, Indonesia'
  const code = 'OR210720089B01'
  const jumlahPotong = '5'
  const jumlahBerat = '42.14'

  let canvas = createCanvas();

  JsBarcode(canvas, code, { width: 3.2, height: 78, displayValue: false });

  escpos.Image.load(canvas.toDataURL('image/png', 1), (image) => {
    device.open(() => {

      printer
        .font("A")
        .align("CT")
        //
        .text('PT. KNITTO TEKSTIL INDONESIA')
        //
        .style("NORMAL")
        .text('JL. KEBON JUKUT NO. 15 KOTA BANDUNG')
        .text('(022) 4214962, (022) 4214963')
        .text('NPWP : 92.546.211.1-423.000')
        //
        .feed()
        .drawLine()
        .feed()
        //
        .text(customer)
        .feed()
        //
        .align("LT")
        //
        .text(`No Telepon	: ${noTelp}`)
        .text(`Provinsi	: ${provinsi}`)
        .text(`Kota		: ${kota}`)
        .text(`Kecamatan	: ${kecamatan}`)
        .text(`Kelurahan 	: ${kelurahan}`)
        .text(`Ekspedisi	: ${ekspedisi}`)
        //
        .feed()
        //
        .text(`Alamat : ${alamat}`)
        //
        .feed()
        .text(code)
        .feed()
        //
        .align('CT')
        //
        .text('- 1 : PACKING - 1 : ROLL -')
        .feed()
        .text(`Jumlah Potong: ${jumlahPotong}, Jml Berat: ${jumlahBerat}`)
        .feed()
        .image(image, 'D24').then(() => {
          printer.cut().feed(2).close();
        })

    })
  })
  res.json("go");
};