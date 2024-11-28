// no babel or typescript step so we need to add .js to our imports
import API from "./API.js";

const Store = {
  menu: null,
  cart: [],
};

const proxiedStore = new Proxy(Store, {
  set(target, propety, value) {
    target[propety] = value;
    if (property == "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property == "cart") {
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true;
  },
  get(target, propety) {
    return target[propety];
  },
});

export default proxiedStore;
