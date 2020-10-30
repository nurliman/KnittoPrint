const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const JsBarcode = require('jsbarcode');
const { createCanvas } = require("canvas");

exports.testPrints = async (req, res, next) => {

    let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,                                  // Printer type: 'star' or 'epson'
        interface: 'tcp://192.168.21.99:9100',                       // Printer interface                              // Printer character set - default: SLOVENIA
        removeSpecialCharacters: false,                           // Removes special characters - default: false
        //lineCharacter: "=",                                       // Set character for lines - default: "-"
        options: {                                                 // Additional options
            timeout: 5000                                          // Connection timeout (ms) [applicable only for network printers] - default: 3000
        }
    });

    let isConnected = await printer.isPrinterConnected();

    const customer = 'ANAM SS.SABLON'
    const noTelp = '0821 4070 5811'
    const provinsi = 'Jawa Barat'
    const kota = 'Bandung'
    const kecamatan = 'Bandung Kulon'
    const kelurahan = 'Cibuntu'
    const ekspedisi = 'CUSTOMER - CUSTOMER'
    const alamat = 'Jl. Holis No.35, Cibuntu, Kec. Bandung Kulon, Kota Bandung, Jawa Barat 40212, Indonesia'
    const code = 'OR210720089B0'
    const jumlahPotong = '5'
    const jumlahBerat = '42.14'

    let canvas = createCanvas();

    JsBarcode(canvas, code);

    if (isConnected) {
        try {
            printer.println("barcode");
            console.log(result)
            await printer.printImageBuffer(canvas.toBuffer())



            let execute = await printer.execute();
            res.json(execute)
        } catch (error) {
            res.json(error)
        }

    } else {
        res.json('printer not connected')
    }
}