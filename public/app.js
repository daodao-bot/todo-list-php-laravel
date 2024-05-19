(function () {

    function alert(message) {
        let element = document.querySelector('#alert')
        element.innerText = message
        setTimeout(() => {
            element.innerText = ''
        }, 3000)
    }

    function all() {
        return fetch('/api/todo')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.message)
                    return []
                }
                return data
            })
            .catch(error => {
                alert('Error: ' + error)
            })
    }

    function get(id) {
        return fetch('/api/todo/' + id)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.message)
                    return {}
                }
                return data
            })
            .catch(error => {
                alert('Error: ' + error)
            })
    }

    function add(data) {
        return fetch('/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.message)
                    return {}
                }
                return data
            })
            .catch(error => {
                alert('Error: ' + error)
            })
    }

    function put(id, data) {
        return fetch('/api/todo/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.message)
                    return {}
                }
                return data
            })
            .catch(error => {
                alert('Error: ' + error)
            })
    }

    function del(id) {
        return fetch('/api/todo/' + id, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                }
            })
            .then(data => {
                if (data && data.error) {
                    alert('Error: ' + data.message)
                }
            })
            .catch(error => {
                alert('Error: ' + error)
            })
    }

    function clear() {
        return fetch('/api/todo', {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                }
            })
            .then(data => {
                if (data && data.error) {
                    alert('Error: ' + data.message)
                }
            })
            .catch(error => {
                alert('Error: ' + error)
            })
    }

    function render() {
        all().then(data => {
            const list = document.querySelector('#list')
            list.innerHTML = ''
            let all = data.length
            let done = data.filter(item => item.done).length
            data.forEach(item => {
                list.innerHTML += `
          <div>
            <input type="hidden" value="${item.id}">
            <input type="checkbox" class="done" ${item.done ? 'checked' : ''}/>
            <input type="text" class="name" value="${item.name}">
            <button class="del">-</button>
          </div>
        `
            })
            document.querySelector('span#count').innerText = `${done}/${all}`
            document.querySelectorAll("input.name").forEach((element) => {
                element.onkeydown = (event) => {
                    if (event.key === "Enter") {
                        putTodo(event)
                    }
                }
            })
            document.querySelectorAll("input.done").forEach((element) => {
                element.addEventListener("click", putTodo)
            })
            document.querySelectorAll("button.del").forEach((element) => {
                element.addEventListener("click", delTodo)
            })
        })
    }

    function addTodo(event) {
        event.preventDefault()
        const name = document.querySelector('#name').value
        const done = document.querySelector('#done').checked
        add({name, done}).then(() => {
            render()
        })
    }

    function putTodo(event) {
        const target = event.target
        let id = target.parentElement.querySelector("input[type=hidden]").value
        const name = target.parentElement.querySelector("input[type=text]").value
        const done = target.checked
        id = parseInt(id)
        put(id, {id, name, done}).then(() => {
            render()
        })
    }

    function delTodo(event) {
        const target = event.target
        let id = target.parentElement.querySelector("input[type=hidden]").value
        id = parseInt(id)
        del(id).then(() => {
            render()
        })
    }

    function clearTodo() {
        clear().then(() => {
            render()
        })
    }

    function allTodo(event) {
        const done = event.target.checked
        all().then(data => {
            data.forEach(item => {
                put(item.id, {id: item.id, name: item.name, done}).then(() => {
                    render()
                })
            })
        })
    }

    document.querySelector('button#add').addEventListener('click', addTodo)

    document.querySelector("input#name").onkeydown = (event) => {
        if (event.key === "Enter") {
            addTodo(event)
        }
    }

    document.querySelector("input#done").addEventListener("click", allTodo)

    document.querySelector("button#clear").addEventListener("click", clearTodo)

    render()

})()
