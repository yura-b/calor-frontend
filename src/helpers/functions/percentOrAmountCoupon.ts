export default function (amount_off: number | undefined, percent_off: number | undefined):string{
     return  `${(percent_off || amount_off)} ${percent_off ? '%' : '$'}`
}
