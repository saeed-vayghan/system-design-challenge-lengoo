'use strict';


const translator = async (message) => {
  const status = true;
  const error  = null;

  console.log('===> translator ===> message ==>', message);

  return {
    status,
    error
  }
};



module.exports = {
  translator
}