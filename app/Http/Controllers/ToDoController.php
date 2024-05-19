<?php

namespace App\Http\Controllers;

use App\Models\ToDo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ToDoController extends Controller
{

    function all(): JsonResponse
    {
        $todos = ToDo::all();
        return response()->json($todos);
    }

    function get(int $id): JsonResponse
    {
        $todo = ToDo::query()->findOrFail($id);
        return response()->json($todo);
    }

    function add(Request $request): JsonResponse
    {
        $input = $request->all();
        $todo = new ToDo();
        $todo['name'] = $input['name'];
        $todo['done'] = $input['done'];
        $todo->save();
        return response()->json($todo);
    }

    function put(int $id, Request $request): JsonResponse
    {
        $input = $request->all();
        $todo = ToDo::query()->findOrFail($id);
        $todo['name'] = $input['name'];
        $todo['done'] = $input['done'];
        $todo->save();
        return response()->json($todo);
    }

    function del(int $id): void
    {
        $todo = ToDo::query()->findOrFail($id);
        $todo->delete();
    }

    function clear(): void
    {
        ToDo::destroy(ToDo::all()->pluck('id')->toArray());
    }

}
