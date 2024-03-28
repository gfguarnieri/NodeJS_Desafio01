import { buildRoutePath } from "./utils/build-route-path.js";
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const table = 'tasks';

const db = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: function (req, res) {
            const { search } = req.query;
            return res.end(JSON.stringify(db.select(table, search ? {
                title: search,
                description: search
            } : null)));
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: function (req, res) {
            const { title, description } = req.body;
            db.insert(table, {
                id: randomUUID(),
                title, description,
                created_at: new Date(),
                updated_at: new Date(),
                completed_at: null
            });
            return res.writeHead(201).end();
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: function (req, res) {
            const { id } = req.params;
            const { title, description } = req.body;
            if (title && description) {
                db.update(table, id, { title, description, updated_at: new Date() });
                return res.writeHead(204).end();
            }
            return res.writeHead(404).end();
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: function (req, res) {
            const { id } = req.params;
            if (db.delete(table, id)) {
                return res.writeHead(204).end();
            }
            return res.writeHead(404).end();
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: function (req, res) {
            const { id } = req.params;
            const task = db.find(table, id);
            if (task) {
                task.completed_at = task.completed_at ? null : new Date();
                task.updated_at = new Date();
                db.update(table, id, task);
                return res.writeHead(204).end();
            }
            return res.writeHead(404).end();

        }
    },
];