const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });
    // Event handler for URL changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    // Check the initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          pageElement.dataset.productId = route.substring(
            route.lastIndexOf("/") + 1,
          );
        }
        break;
    }
    if (pageElement) {
      document.querySelector("main").innerHTML = "";
      document.querySelector("main").appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      // 404
      document.querySelector("main").innerHTML = "Oops, 404";
    }
  },
};

export default Router;
