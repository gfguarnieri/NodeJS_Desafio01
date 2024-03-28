import { buildRoutePath } from "./utils/build-route-path.js";

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handle: function(req, res){

        }
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handle: function(req, res){

        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks"),
        handle: function(req, res){

        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handle: function(req, res){

        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handle: function(req, res){

        }
    },
];