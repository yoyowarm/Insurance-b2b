export const formatDate = (date) => {
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + (date.getDate())).slice(-2);
  var year = date.getFullYear();
  var hour = ("0" + (date.getHours())).slice(-2);
  var min = ("0" + (date.getMinutes())).slice(-2);
  var seg = ("0" + (date.getSeconds())).slice(-2);
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seg;
}