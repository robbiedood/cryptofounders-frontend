import BigNumber from 'bignumber.js';

export const addressTrim = (address:string) => {
  let firstFew = address.substring(0, 6);
  let lastFew = address.substring(address.length - 5);
  return (firstFew + "..." + lastFew)
}

export const ensTrim = (ens:string) => {
  if(ens.length>13){
    let firstFew = ens.substring(0, 4);
    let lastFew = ens.substring(ens.length - 7);
    return (firstFew + "..." + lastFew)
  }else{
    return ens
  }
}

export const nameTrim = (name:string) => {
/**
 * sometimes, name is look like
 * https://www.linkedin.com/in/sandylu1108/ from Linkedin
 * www.facebook.com/sunshine.flowing from Facebook
 * 
 * so we need to trim the name to make it look better.
 * - detect if name contain url (start with https:// or www.)
 * - if yes, check if it ending with /
 * - if yes, remove the last /
 * - the only keep the name after the last /
 * - if no, then return the name
 */

  if(name.startsWith("https://") || name.startsWith("www.")){
    let firstHalf = name.split("from")[0].replace(/\s/g, '');
    let secondHalf = name.split("from")[1].replace(/\s/g, '');
    if(firstHalf.endsWith("/")) firstHalf = firstHalf.substring(0, firstHalf.length-1)
    let lastSlash = firstHalf.lastIndexOf("/")
    firstHalf = firstHalf.substring(lastSlash+1)
    return (firstHalf + " from " + secondHalf)
  }else{
    return name
  }

}

export const Wei2ETH = (wei:string) => {
  let weiNum = BigNumber(wei)
  let ethNum = weiNum.dividedBy(10**18)
  return ethNum.toString()
}

export const formValidation = (form:any) => {
  let isValid = true
  Object.keys(form).forEach((key) => {
    if(form[key] === "" && key !== "addendum"){
      isValid = false
    }
  })
  return isValid
}

export const dateTimeTrim = (dateTime:string) => {
  let currentYear = new Date().getFullYear()
  let year = dateTime.substring(0, 4)
  let date = dateTime.substring(5, 10)
  let time = dateTime.substring(11, 16) // skip T
  
  // if the year is current year, then only show date and time
  if(year === currentYear.toString()){
    return (date + " " + time)
  }else{
    return (year + " " + date)
  }
}

