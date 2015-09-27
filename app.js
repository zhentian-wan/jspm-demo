/**
 * Created by Answer1215 on 9/27/2015.
 */

import moment from 'moment';
import _ from 'lodash';

let date = moment().format();

_.forEach(date, char => console.log(char));