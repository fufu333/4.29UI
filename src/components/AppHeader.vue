<!-- src/components/AppHeader.vue -->
<template>
    <div class="semi-transparent-background">
        <van-field 
            v-model="newTodo"
            placeholder="要添加点什么好呢"
            input-align="center"
            @keyup.enter="addTodo"
            clearable
            class="custom-input"

        />
        <van-button round block type="primary" @click="addTodo">添加</van-button>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Field, Button } from 'vant';
import { bus } from '../bus'; 

export default defineComponent({
    name: 'AppHeader',
    components: {
        VanField: Field,
        VanButton: Button
    },
    setup() {
        const newTodo = ref('');

        const addTodo = () => {
            if (newTodo.value.trim()) {
                bus.emit('addTodo', { text: newTodo.value, done: false });
                newTodo.value = '';
            }
        };

        return {
            newTodo,
            addTodo
        };
    }
});
</script>

<style>
body {
  display: flex; /* 让body成为flex容器 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh;
  margin: 0; 
}

.semi-transparent-background {
    background-color: rgba(255, 255, 255, 0.652);
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center !important;
    width: 90%;
    margin-top: 5vh;
    margin-bottom: 2vh;
    margin-left: 4vw;

    
}

.custom-input {
    width: 80%;
    height: 30px;
    top: 45%;
    margin-left: 10px;
    border-radius: 32px;
    background-color: rgba(255, 255, 255, 0);
    
    

    input[type="text" i]{
        height: 80%;
        padding: 6px;
        width: 100%;
        border-radius: 32px;
        /* border-color: rgb(255, 255, 255) !important; */
        margin-top: -10px !important;
        font-size: 16px;
    }

}

button {
    width: 25% !important;
    color: inherit;
    background-color: rgba(238, 46, 46, 0.822) !important;
    border: none !important;
    border-radius: 5px;
    cursor: pointer;
    font-size: 30%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}


</style>