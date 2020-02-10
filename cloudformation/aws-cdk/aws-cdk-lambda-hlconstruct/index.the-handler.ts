exports.handler = async function (event: any, context: any) {
  console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2))
  console.info("EVENT\r\n" + JSON.stringify(event, null, 2))
  console.warn("Event not processed.")
  return context.logStreamName
};
