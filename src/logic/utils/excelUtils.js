import { Workbook, WorkbookFormat, WorkbookLoadOptions, WorkbookSaveOptions } from 'igniteui-react-excel';
import { IgrExcelXlsxModule, IgrExcelCoreModule, IgrExcelModule } from 'igniteui-react-excel';
import LuckyExcel from 'luckyexcel'

IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();

export class ExcelUtility {
    static getExtension(format) {
        // eslint-disable-next-line default-case
        switch (format) {
            case WorkbookFormat.StrictOpenXml:
            case WorkbookFormat.Excel2007:
                return ".xlsx";
            case WorkbookFormat.Excel2007MacroEnabled:
                return ".xlsm";
            case WorkbookFormat.Excel2007MacroEnabledTemplate:
                return ".xltm";
            case WorkbookFormat.Excel2007Template:
                return ".xltx";
            case WorkbookFormat.Excel97To2003:
                return ".xls";
            case WorkbookFormat.Excel97To2003Template:
                return ".xlt";
        }
    }

    static load(file) {
        return new Promise((resolve, reject) => {
            ExcelUtility.readFileAsUint8Array(file).then((a) => {
                LuckyExcel.transformExcelToLucky(a,
                    function (exportJson, luckysheetfile) {
                        console.log("exportJson", exportJson);
                    },
                    function (error) {
                        console.log(error);
                    }
                )
                Workbook.load(a, new WorkbookLoadOptions(), (w) => {
                    resolve(w);
                }, (e) => {
                    reject(e);
                });
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
                const data = new Uint8Array(req.response);
                Workbook.load(data, new WorkbookLoadOptions(), (w) => {
                    resolve(w);
                }, (e) => {
                    reject(e);
                });
            };
            req.send();
        });
    }

    static save(workbook) {
        return new Promise((resolve, reject) => {
            const opt = new WorkbookSaveOptions();
            opt.type = "blob";

            workbook.save(opt, (d) => {
                resolve(d);
            }, (e) => {
                reject(e);
            });
        });
    }

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
