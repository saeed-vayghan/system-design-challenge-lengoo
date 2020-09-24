'use strict';


const reporter = async (message) => {
  const status = true;
  const error  = null;

  console.log('===> reporter ===> message ==>', message);

  return {
    status,
    error
  }
};



module.exports = {
  reporter
}