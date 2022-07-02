export const aboutController = {
    index: {
      handler: function (request, h) {
        const loggedInUser = request.auth.credentials;
        let test = false;
        if (loggedInUser.email == "admin@admin.ie") {
          test = true;
        }
        const viewData = {
          title: "About POI Placemarker",
          user: loggedInUser,
          test: test,
        };
        return h.view("about-view", viewData);
      },
    },
  };
  