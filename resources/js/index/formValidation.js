
/*****************************************************************************************************************************

                                   Validating The form Format

******************************************************************************************************************************/

import { splitStrsIntoTwoParts, trimOneCharacterFromEdges } from './utils'

function getFormValidationErrorsBag (...fields)
{

  let errorsBag = []

  $.each(fields, function(index, field) {

    let field_input_value = field.element.val()

    let fieldErrors = []

    $.each(field.rules, function(index, rule) {

      let splitted_rule_array = splitStrsIntoTwoParts(rule, ':')

      let rule_name = splitted_rule_array[0]

      let rule_option = splitted_rule_array[1]

      switch (rule_name) {

        case 'required':

          if (isEmpty(field_input_value)) {

            fieldErrors.push(field.errorMessages[rule_name])

          }

          break;

        case 'regex':

          if (isFailedRegexTest(rule_option, field_input_value)) {



            fieldErrors.push(field.errorMessages[rule_name])

          }

          break;

        case 'between':

          if (isBeyondLengthRange(rule_option, field_input_value)) {

            fieldErrors.push(field.errorMessages[rule_name])

          }

          break;

        default:

      }

    })

    if (fieldErrors.length > 0) {

      errorsBag.push(fieldErrors)

    }

  })

  if (errorsBag.length > 0) {

    return errorsBag

  }

  else {

    return false

  }

}

function isValidEmailFormat(input)
{
  //对电子邮件的验证
  let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

  if(!myreg.test(input))
  {

    return false

  }

  return true

}

function isValidMobilePhoneFormat(input)
{
  //对手机号的验证，来自https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
  let myreg = /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/;

  if(!myreg.test(input))
  {

    return false

  }

  return true

}

function isEmpty(input)
{

  if(($.trim(input).length>0)){

    return false

  }

  return true

  }

function isFailedRegexTest(regex_expression, input)
{

  let trimmed_regex_expression = trimOneCharacterFromEdges(regex_expression)

  console.log(trimmed_regex_expression)

  let regex = new RegExp(trimmed_regex_expression)

  if(regex.test(input))
  {

    return false

  }
  else {

    return true

  }

}

function isBeyondLengthRange(length_range_strs, input)
{

  let length_range_array = splitStrsIntoTwoParts(length_range_strs, ',')

  let min_length = parseInt(length_range_array[0])

  let max_length = parseInt(length_range_array[1])

  if (input.length >= min_length && input.length <= max_length) {

    return false

  }

  return true

}

//window.isBeyondLengthRange = isBeyondLengthRange
window.isFailedRegexTest = isFailedRegexTest

export { isValidEmailFormat, isEmpty, isFailedRegexTest, isBeyondLengthRange, getFormValidationErrorsBag }
