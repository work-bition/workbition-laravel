
/*****************************************************************************************************************************

                                   Validating The Email Format

******************************************************************************************************************************/



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

function isEmpty(input)
{

  if(!($.trim(input).length>0)){

    return false

  }

  return true

  }

export { isValidEmailFormat, isEmpty }
