import * as XLSX from 'xlsx';
import * as moment from 'moment';

onmessage = (e) => {
  const { event, /*data,*/ rABS } = e.data;
  switch (event){
    case 'readData':
      const data = XLSX.readFile('./assets/HistoricalDataTest.xlsx');

      const startTime: any = new Date();
      const workbook = XLSX
        .read(data, {type: rABS ? 'binary' : 'array'});
      const startDate = '01-01-2018';
      const endDate = '03-01-2019';
      // moment1.isSameOrAfter(moment2)
      // moment1.isSameOrBefore(moment2)

      const sp500 = XLSX.utils
        .sheet_to_json(workbook.Sheets.Sheet1)
        .map((ugly: any) => ({
          name: ugly.__EMPTY,
          lol: Object
            .keys(ugly)
            .map(k => ({date: k, value: ugly[k]}))
        }))
        .filter((el: any) => ~([
          "S&P 500",
          'AAPL',
          // 'ABC',
          // 'A'
        ].indexOf(el.name)))
        .map((el: any) => ({
          ...el,
          lol: el.lol
            .filter((ell: any) => moment(ell.date).isSameOrAfter(startDate)
              && moment(ell.date).isSameOrBefore(endDate))
        }));
      const endTime: any = new Date();
      console.log(`Done in ${endTime - startTime} ms!`);
      console.log(sp500);
      return postMessage({event: 'SUCCESS', data: sp500}, '');
    default:
      return;
  } 
}

