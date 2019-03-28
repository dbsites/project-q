import * as XLSX from 'xlsx';
import * as moment from 'moment';

const sendMessage: any = self.postMessage;
// const XLSX_FILE_URL = './HistoricalDataTest.xlsx';
const XLSX_FILE_URL = './HistoricalDataFull.xlsx';

onmessage = (e) => {

  const _getMaxDate = (filteredRaw: any) => {
    const moments: any = filteredRaw
      .map((el: any) => el.lol.map((ell: any) => ell.date))
      .map((el: any) => new Date(el[1]));

    return new Date(Math.max.apply(null, moments));
  }

  const { event, stocksList /*data,*/} = e.data;
  switch (event){
    case 'readData':

      /* set up async GET request */
      let req = new XMLHttpRequest();
      req.open("GET", XLSX_FILE_URL, true);
      req.responseType = "arraybuffer";

      req.onload = () => {
        const data = new Uint8Array(req.response);
        const workbook = XLSX.read(data, {type:"array"});
        // const workbook = XLSX.read(data, {type: 'binary'});
        // const startDate = '01-01-2015';
        // const endDate = '03-01-2019';
        const raw = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
        // console.log(raw, 'raw');
        const raw2 = raw
          .map((ugly: any) => ({
            name: ugly.__EMPTY,
            lol: Object
              .keys(ugly)
              .map(k => ({date: k, value: ugly[k]}))
          }));
        // console.log(raw2, 'raw2');
        const filteredRaw = raw2.filter((el: any) => ~(stocksList.indexOf(el.name)));

        const startDate = _getMaxDate(filteredRaw);
        // console.log(startDate, 'startDate');

        const sp500 = filteredRaw
          .map((el: any) => ({
            ...el,
            lol: el.lol
              .filter((ell: any) => moment(ell.date).isSameOrAfter(startDate))
                // && moment(ell.date).isSameOrBefore(endDate))
          }));

        sendMessage({event: 'SUCCESS', data: sp500});
      }
      req.send();

    default:
      return;
  } 
}

