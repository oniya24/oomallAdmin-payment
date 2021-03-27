import moment from 'moment';

export const format2Second = (time: any) => {
  return moment(time).format('YYYY-MM-DD hh:mm:ss');
};

export const format2Day = (time: any) => {
  return moment(time).format('YYYY-MM-DD');
};
