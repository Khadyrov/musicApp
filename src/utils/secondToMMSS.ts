import moment from 'moment'

export default (second:any) => moment.utc(second *1000).format('mm:ss')