export const CHANGE_LANG='CHANGE_LANG'

export const changeLang = (lang) => dispatch =>{
	document.cookie = "lang="+lang+";path=/"
  return dispatch({
    type:CHANGE_LANG,
    lang
  })
}

export const changeLangWithoutCookie = (lang) => dispatch =>{
  return dispatch({
    type:CHANGE_LANG,
    lang
  })
}
