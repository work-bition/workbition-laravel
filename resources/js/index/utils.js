
/*****************************************************************************************************************************

                                   Utils

******************************************************************************************************************************/

/** splitStrsIntoTwoParts('between:8,16',':') will be split into ['between', '8,16']**/
/** splitStrsIntoTwoParts('abcdef',':') will return ['abcdef']**/

function splitStrsIntoTwoParts(splitStrs,indicator) {

  let strs_array = splitStrs.split(indicator)

  if (strs_array.length === 1) {

    return strs_array

  }

  let first_part_strs = strs_array.shift()

  let second_part_strs = strs_array.join(indicator)

  let two_parts_array = []

  if (first_part_strs !== '') {

    two_parts_array.push(first_part_strs)

  }

  if (second_part_strs !== '') {

    two_parts_array.push(second_part_strs)

  }

  return two_parts_array

}

function  trimOneCharacterFromEdges(trimmingStrs)
{

  let trimmedStrs = trimmingStrs.substr(1)

  trimmedStrs = trimmedStrs.substr(0,trimmedStrs.length - 1)

  return trimmedStrs

}

window.trimOneCharacterFromEdges = trimOneCharacterFromEdges

//window.splitStrsIntoTwoParts = splitStrsIntoTwoParts

export { splitStrsIntoTwoParts, trimOneCharacterFromEdges }
