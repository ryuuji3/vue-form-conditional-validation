import { extend } from 'vee-validate'
import { required, between, min_value, max_value } from 'vee-validate/dist/rules'

// built-in rules
extend('required', required)
extend('between', between)
extend('min_value', min_value)
extend('max_value', max_value)