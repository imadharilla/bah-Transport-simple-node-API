/**
 * @param {Date} date
 * this function take Date object and return string of it yyyy/mm/dd
 * example of output: 1998/04/28
 */
exports.getStringDate = date => {
  const day = date.getDate() < 10 ? '0' + String(date.getDate()) : String(date.getDate())
  const month = date.getMonth() + 1 < 10 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1)
  return String(date.getFullYear()) + '/' + month + '/' + day
}
