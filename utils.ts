import moment from "moment"

export const dateDDMMYYYToTimeSince = (date: string) => date == moment().format('DD-MM-YYYY') ? 'Today' : moment(date, 'DD-MM-YYYY').fromNow()
