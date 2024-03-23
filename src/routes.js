import { buildRoutePath } from "./utils/build-route-path";

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/task"),
        handle: function(req, res){

        }
    },
    {
        method: "POST",
        path: buildRoutePath("/task"),
        handle: function(req, res){

        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/task"),
        handle: function(req, res){

        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/task/:id"),
        handle: function(req, res){

        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/task/:id/complete"),
        handle: function(req, res){

        }
    },
]