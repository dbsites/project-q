import * as XLSX from 'xlsx';
import * as moment from 'moment';

const sendMessage: any = self.postMessage;
// const XLSX_FILE_URL = './HistoricalDataTest.xlsx';
const XLSX_FILE_URL = './HistoricalDataFull.xlsx';

onmessage = (e) => {
  const { event, stocksList /*data,*/} = e.data;
  switch (event){
    case 'readData':

      /* set up async GET request */
      var req = new XMLHttpRequest();
      req.open("GET", XLSX_FILE_URL, true);
      req.responseType = "arraybuffer";

      req.onload = (_) => {
        const data = new Uint8Array(req.response);
        const workbook = XLSX.read(data, {type:"array"});
        // var workbook = XLSX.read(data, {type: 'binary'});
        const startDate = '01-01-2018';
        const endDate = '03-01-2019';
        const sp500 = XLSX.utils
          .sheet_to_json(workbook.Sheets.Sheet1)
          .map((ugly: any) => ({
            name: ugly.__EMPTY,
            lol: Object
              .keys(ugly)
              .map(k => ({date: k, value: ugly[k]}))
          }))
          .filter((el: any) => ~(stocksList.indexOf(el.name)))
          .map((el: any) => ({
            ...el,
            lol: el.lol
              .filter((ell: any) => moment(ell.date).isSameOrAfter(startDate)
                && moment(ell.date).isSameOrBefore(endDate))
          }));

        sendMessage({event: 'SUCCESS', data: sp500});
      }
      req.send();

    default:
      return;
  } 
}

