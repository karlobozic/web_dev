// import { array } from "joi";
import { db } from "../models/db.js";

export const adminController = {
        index: {
          handler: async function (request, h) {
            const users = await db.userStore.getAllUsers();
            // const user = await db.userStore.getUserById(request.params.id);
            const loggedInUser = request.auth.credentials;
            let err;
            let num = {};
            for (let i = 0; i < users.length; i++) {
              // err = users[i]._id;
              num[i] = await db.riverStore.getUserRiver(users[i]._id);
              console.log(num[i]);
            }
            // console.log(num);

            let test = false;

            if (loggedInUser.email == "admin@admin.ie") {
              test = true;
            }
            const viewData = {
              title: "Admin Page",
              user: loggedInUser,
              users: users,
              num: num,
              test: test,

            };
            return h.view("admin-view", viewData);
          },
        },
        deleteUser: {
            handler: async function(request, h) {
              const user = await db.userStore.getUserById(request.params.id);
              await db.userStore.deleteUserById(request.params.userid);
              return h.redirect(`/admin`);
            },
          },
      };
