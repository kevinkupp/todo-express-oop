import { Todo } from '../models/todo.js'
import {fileManager} from "../data/files.js";

class todoController {
    constructor() {
        this.todosReady = this.initTodos()
    }

    async createTodo(req, res) {
        await this.todosReady
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)

        const updatedTodos = [...this.TODOS, newTodo]

        await fileManager.writeFile('./data/todos.json', updatedTodos)
        this.TODOS = updatedTodos

        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    async initTodos() {
        const todosData = await fileManager.readFile('./data/todos.json')

        if(todosData !== null) {
            this.TODOS = todosData
        } else {
            this.TODOS = []
        }
    }

    async getTodos(req, res) {
        await this.todosReady
        res.json({tasks: this.TODOS})
    }

    async updateTodo(req, res) {
        await this.todosReady
        const todoId = req.params.id
        const updatedTask = req.body.task

        console.log(req.body)
        console.log(req.params)

        const todoIndex = this.TODOS.findIndex((todo) => todo.id ===todoId)

        if(todoIndex <0 ) {
            return res.status(404).json({
                message: `Could not find todo with ID ${todoId}`
            })
        }

        const updatedTodos = [...this.TODOS]
        updatedTodos[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        await fileManager.writeFile('./data/todos.json', updatedTodos)
        this.TODOS = updatedTodos

        res.json({
            message: 'todo is updated',
            updatedTask: updatedTodos[todoIndex]
        })
    }

    async deleteTodo(req, res) {
        await this.todosReady
        const todoId = req.params.id

        const todoIndex = this.TODOS.findIndex((todo) => todo.id ===todoId)

        if(todoIndex <0 ) {
            return res.status(404).json({
                message: `Could not find todo with ID ${todoId}`
            })
        }

        const deletedTask = this.TODOS[todoIndex]
        const updatedTodos = this.TODOS.filter((todo) => todo.id !== todoId)
        await fileManager.writeFile('./data/todos.json', updatedTodos)
        this.TODOS = updatedTodos

        res.json({
            message: 'todo is deleted',
            deletedTask
        })
    }
}

export const TodoController = new todoController()
