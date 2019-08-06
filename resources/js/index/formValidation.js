
/*****************************************************************************************************************************

                                   Validating The form Format

******************************************************************************************************************************/

import { splitStrsIntoTwoParts, trimOneCharacterFromEdges } from './utils'



function isEmpty(input){

  if(($.trim(input).length>0)){

    return false

  }

  return true

  }

function isFailedRegexTest(regex_expression, input){

  let trimmed_regex_expression = trimOneCharacterFromEdges(regex_expression)

  let regex = new RegExp(trimmed_regex_expression)

  if(regex.test(input))
  {

    return false

  }
  else {

    return true

  }

}

function isBeyondLengthRange(length_range_strs, input){

  let length_range_array = splitStrsIntoTwoParts(length_range_strs, ',')

  let min_length = parseInt(length_range_array[0])

  let max_length = parseInt(length_range_array[1])

  if (input.length >= min_length && input.length <= max_length) {

    return false

  }

  return true

}



function getFormValidationErrorsBag (targetForm, fields){

  let errorsBag = []

  $.each(fields, function(index, field) {

    let field_input_value = targetForm.find(field.element).val()

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

function validateFormLocally (validation_options){

  let errorsBag = getFormValidationErrorsBag(validation_options.targetForm, validation_options.fields)

  if (errorsBag) {

    validation_options.callbacks.failed(errorsBag)

  }

  else {

    validation_options.callbacks.succeeded()

  }


}



export { validateFormLocally }
