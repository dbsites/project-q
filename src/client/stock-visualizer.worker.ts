import * as XLSX from 'xlsx';
import * as moment from 'moment';

const sendMessage: any = self.postMessage;
// const XLSX_FILE_URL = '/UpdatedHistoricalDataFull4.xlsx';
const XLSX_FILE_URL = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/UpdatedHistoricalDataFull4.xlsx';

onmessage = (e) => {

  const _getStartDateCompany = (filteredRaw: any) => {
    return filteredRaw
      .map((el: any) => ({n: el.name, fullName: el.fullName, date: new Date(el.lol[1].date)}))
      .sort((a: any, b: any) => b.date - a.date)[0];
  }

  const _getMaxDate = (filteredRaw: any) => {
    const moments: any = filteredRaw
      .map((el: any) => el.lol.map((ell: any) => ell.date))
      .map((el: any) => new Date(el[1]));

    return new Date(Math.max.apply(null, moments));
  }

  const { event, stocksList, /*topStocksFilter data,*/} = e.data;
  switch (event){
    case 'readData':
      let req = new XMLHttpRequest();
      req.open("GET", XLSX_FILE_URL, true);
      req.responseType = "arraybuffer";

      req.onload = () => {
        if(req.status !== 200) {
          return sendMessage({
            event: 'ERROR',
            data: `Error. ${req && req.statusText}`
          });
        }

        const data = new Uint8Array(req.response);
        const workbook = XLSX.read(data, {type:"array"});
        const raw = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

        const raw2 = raw.map((ugly: any) => ({
          fullName: ugly['Company Names'],
          name: ugly.__EMPTY,
          lol: Object
            .keys(ugly)
            .map(k => ({date: k, value: ugly[k]}))
        }));

        const filteredRaw = raw2.filter((el: any) => ~(stocksList.indexOf(el.name)));

        const rawLengthWithoutSp500 = (filteredRaw.length - 1);

        if(!rawLengthWithoutSp500) {
          return sendMessage({
            event: 'ERROR',
            data: `Error. Companies with such names not found.`
          });
        }

        const startDate = _getMaxDate(filteredRaw);
        const startDateCompany = _getStartDateCompany(filteredRaw);

        const sp500 = filteredRaw
          .map((el: any) => ({
            ...el,
            lol: el.lol
              .filter((ell: any) => moment(new Date(ell.date)).isSameOrAfter(new Date(startDate)))
                // && moment(ell.date).isSameOrBefore(endDate))
          }));

        sendMessage({
          event: 'SUCCESS',
          data: sp500,
          companiesCount: rawLengthWithoutSp500,
          startDateCompanyName: startDateCompany
            && `${startDateCompany.fullName} (${startDateCompany.n})`
        });
      }
      req.send();

    default:
      return;
  } 
}
