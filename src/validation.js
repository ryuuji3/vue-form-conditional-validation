import Moment from "moment";
import { extend } from 'vee-validate'
import { required, between, min_value, max_value } from 'vee-validate/dist/rules'

// built-in rules
extend('required', required)
extend('between', between)
extend('min_value', min_value)
extend('max_value', max_value)

extend('min_date', {
    validate(value, { date }) {
        const parsedValue = Moment(value).startOf('day');
        const parsedDate = Moment(date).startOf('day');

        if (parsedValue.isValid && parsedDate.isValid) {
            return parsedValue.isSameOrAfter(parsedDate);
        } else {
            return false;
        }
    },
    params: ['date'],
    message(_fieldName, { date }) {
        return `must be after ${Moment(date).format('YYYY-MM-DD')}`;
    }
})
extend('max_date', {
    validate(value, { date }) {
        const parsedValue = Moment(value).startOf('day');
        const parsedDate = Moment(date).startOf('day');

        if (parsedValue.isValid && parsedDate.isValid) {
            return parsedValue.isSameOrBefore(parsedDate);
        } else {
            return false;
        }
    },
    params: ['date'],
    message(_fieldName, { date }) {
        return `must be before ${Moment(date).format('YYYY-MM-DD')}`;
    }
})