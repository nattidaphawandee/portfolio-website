import dayjs, { Dayjs } from 'dayjs';
export function formateDateTime(value: Dayjs, formate: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(formate);
}

export function ADformateDateTime(value: Dayjs|string, formate: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(formate);
}
export function BEformateDate(value: Dayjs, formate: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).add(543, 'year').format(formate);
}
export default {
  formateDateTime: formateDateTime,
  BEformateDate: BEformateDate,
  ADformateDateTime: ADformateDateTime
};
