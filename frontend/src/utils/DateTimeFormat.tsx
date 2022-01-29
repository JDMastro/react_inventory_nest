import Moment from 'moment';
import 'moment/locale/es-us';


export function DateTimeFormat(date : string)
{
    return Moment(date).locale('es-us').format('YYYY-MM-DD, h:mm:ss a')
}