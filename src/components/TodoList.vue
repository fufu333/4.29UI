<template>
    <div>
        <label class="tou">
            <input type="checkbox" class="custom-checkbox" v-model="allChecked" @change="toggleAll"> <span>全选</span>
            <button type="text" class="all" @click="clearAllTodos">全部删除</button>
        </label>

        <ul class="todo-list-items" ref="todoListItems">
            <li v-for="(todo, index) in todos" :key="index">
                <input type="checkbox" :value="todo.done" v-model="todo.done" @change="updateTodo(index, $event)">
                <span>{{ todo.text }}</span>
                <button class="shan" @click="removeTodo(index)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue';
import { bus } from '@/bus';

export default defineComponent({
    name: 'TodoList',
    setup() {
        let todos = ref([]);
        let allChecked = ref(false);

        onMounted(() => {
            bus.on('addTodo', (newTodo) => {
                todos.value.push(newTodo);
            });

            // 当组件卸载时，取消事件监听
            return () => {
                bus.off('addTodo');
            };
        });

        watch(() => todos.value.every(todo => todo.done), (newValue) => {
            allChecked.value = newValue;
        });

        function addTodo(text) {
            if (text.trim()) {
                todos.value.push({ text, done: false });
            }
        }

        function clearAllTodos() {
            todos.value = [];
        }

        function updateTodo(index, event) {
            todos.value[index].done = event.target.checked;
        }

        function removeTodo(index) {
            todos.value.splice(index, 1);
        }

        function toggleAll() {
            todos.value.forEach((todo) => {
                todo.done = allChecked.value;
            });
        }

        return {
            todos,
            allChecked,
            addTodo,
            clearAllTodos,
            updateTodo,
            removeTodo,
            toggleAll,
        };
    },
});
</script>

<style scoped>
.action-buttons {
    display: flex;
    justify-content: flex-end;
}


.all {
    padding: 10px 0;
    margin-left: 10px;
    color: inherit;
    background-color: rgba(238, 46, 46, 0.719);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 15vh !important;
    font-size: 2vh;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;


}

.shan {
    width: 10vh !important;
    height: 5vh;
}

li {
    margin-bottom: 10px;
    align-items: center;
    display: flex;
    justify-content: space-between;


}

li input[type="checkbox"] {
    height: 20px;
    width: 20px;
    margin-right: 15px;
}

.custom-checkbox {
    width: 20px;
    height: 20px;
}

span {
    color: #ffffff;
    size: 10px;
}

.todo-list-items {
    margin-top: 5%;
    margin-left: 2%;
    height: 40vh;
    overflow-y: auto;
    list-style-type: none;

    ul {
        list-style-type: none;
        padding: 0;
        text-align: left;
    }
}
</style>