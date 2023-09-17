import LuckyExcel from 'luckyexcel'

export class ExcelUtility {

    static load(file) {
        return new Promise((resolve, reject) => {
            ExcelUtility.readFileAsUint8Array(file).then((a) => {
                LuckyExcel.transformExcelToLucky(a,
                    function (exportJson, luckysheetfile) {
                        resolve(exportJson);
                    },
                    function (error) {
                        reject(error);
                    }
                )
            }, (e) => {
                reject(e);
            });
        });
    }

    static loadFromUrl(url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open("GET", url);
            req.responseType = "arraybuffer";
            req.onload = (d) => {
                console.log(req.response);
                LuckyExcel.transformExcelToLucky(req.response,
                    function (exportJson, luckysheetfile) {
                        resolve(exportJson);
                    },
                    function (error) {
                        reject(error);
                    }
                )
            };
            req.send();
        });
    }

    // static save(workbook) {
    //     return new Promise((resolve, reject) => {
    //         const opt = new WorkbookSaveOptions();
    //         opt.type = "blob";

    //         workbook.save(opt, (d) => {
    //             resolve(d);
    //         }, (e) => {
    //             reject(e);
    //         });
    //     });
    // }

    static readFileAsUint8Array(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onerror = (e) => {
                reject(fr.error);
            };

            if (fr.readAsBinaryString) {
                fr.onload = (e) => {
                    const rs = fr.resultString;
                    const str = rs != null ? rs : fr.result;
                    const result = new Uint8Array(str.length);
                    for (let i = 0; i < str.length; i++) {
                        result[i] = str.charCodeAt(i);
                    }
                    resolve(result);
                };
                fr.readAsBinaryString(file);
            } else {
                fr.onload = (e) => {
                    resolve(new Uint8Array(fr.result));
                };
                fr.readAsArrayBuffer(file);
            }
        });
    }
}
