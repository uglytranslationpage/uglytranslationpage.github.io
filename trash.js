const langs = [
  {name: "Bulgarian", code: "bg"},
  {name: "Croatian", code: "hr"},
  {name: "Czech", code: "cs"},
  {name: "Dutch", code: "nl"},
  {name: "English", code: "en"},
  {name: "Esperanto", code: "eo"},
  {name: "French", code: "fr"},
  {name: "German", code: "de"},
  {name: "Greek", code: "el"},
  {name: "Icelandic", code: "is"},
  {name: "Irish", code: "ga"},
  {name: "Italian", code: "it"},
  {name: "Latin", code: "la"},
  {name: "Latvian", code: "lv"},
  {name: "Norwegian", code: "no"},
  {name: "Polish", code: "pl"},
  {name: "Portuguese", code: "pt"},
  {name: "Russian", code: "ru"},
  {name: "Serbian", code: "sr"},
  {name: "Slovak", code: "sk"},
  {name: "Slovenian", code: "sl"},
  {name: "Spanish", code: "es"},
  {name: "Ukrainian", code: "uk"}
];
function langCode(name) {
  let filtered = langs.filter(lang => lang.name.toLowerCase() === name.toLowerCase());
  let result = filtered[0];
  return result == undefined ? "shit" : result.code;
};
function langName(code) {
  let filtered = langs.filter(lang => lang.code === code.toLowerCase());
  let result = filtered[0];
  return result == undefined ? "shit" : result.name;
};
function rawRequest(text, code) {
  let url = "https://translate.googleapis.com/translate_a/single";
  let params = `client=gtx&sl=auto&t=${code}&hl=${code}&dt=t&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=7&q=${encodeURI(text)}`;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `${url}?${params}`, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
function translate(text, to) {
  let response = rawRequest(text, to);
  let json = JSON.parse(response);
  let first = json[0];
  let string = "";
  first.forEach((array) => {
    string += array[0];
  });
  return string.substring(0, string.length - 4);
}
let getTranslated = () => {
  let input = document.querySelector("#hell").value;
  let code = input.split(" ")[0];
  let text = input.substring(code.length);
  document.querySelector("#res").innerHTML = translate(text, code);
};
document.querySelector("button#aintgonnalive").onclick = getTranslated;
document.querySelector("textarea#hell").addEventListener('keydown', (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    getTranslated();
  }
});
