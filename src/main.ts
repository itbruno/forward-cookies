import { ForwardCookies } from "./lib/ForwardCookies";

var pageCookie = new ForwardCookies("user", true);

var btnGet = document.querySelector(".js-get-cookie");
var btnAdd = document.querySelector(".js-add-cookie");
var btnSetUrl = document.querySelector(".js-seturl-cookie");
var btnDelete = document.querySelector(".js-delete-cookie");

btnGet?.addEventListener("click", () => {
  pageCookie.getCookie();
});

btnAdd?.addEventListener("click", () => {
  pageCookie.setCookie({
    cookieName: "user",
    value: String(Math.random()),
  });
});

btnSetUrl?.addEventListener("click", () => {
  pageCookie.generateCookieAsUrl();
});

btnDelete?.addEventListener("click", () => {
  pageCookie.deleteCookie();
});
