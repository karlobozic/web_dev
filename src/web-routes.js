import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { poiController } from "./controllers/poi-controller.js";
import { adminController } from "./controllers/admin-controller.js";



export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },
  


  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{userid}", config: adminController.deleteUser },


  { method: "POST", path: "/dashboard/addPOI", config: dashboardController.addPOI },
  { method: "GET", path: "/dashboard/deletepoi/{id}", config: dashboardController.deletePOI },
  { method: "GET", path: "/map", config: dashboardController.map },

  { method: "GET", path: "/poi/{id}", config: poiController.index },
  { method: "POST", path: "/poi/{id}/addriver", config: poiController.addRiver },

  { method: "GET", path: "/poi/{id}/deleteriver/{riverid}", config: poiController.deleteRiver },
  { method: "POST", path: "/poi/{id}/uploadimage", config: poiController.uploadImage },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];