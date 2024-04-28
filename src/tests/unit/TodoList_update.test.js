import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../../components/TodoList.vue'

describe('TodoList.vue', () => {
  it('updates a todo whe click the checkbox button', async () => {
    const wrapper = mount(TodoList, async () => {
      // 提供默认数据
    const initialTodos = [
      { text: 'Initial todo', done: false },
    ];

    const wrapper = mount(TodoList, {
      propsData: { todos: initialTodos }, // 为组件提供默认todos数据
    });

    // 获取第一个Todo项的复选框元素
    const todoCheckbox = wrapper.findAll('.todo-list-items li input[type="checkbox"]')[0];

    // 模拟点击复选框
    await todoCheckbox.setChecked(true);

    // 验证Todo状态是否已更新
    expect(initialTodos[0].done).toBe(true); // 假设Vue能够响应式地更新props中的对象

    // 或者，获取经过Vue渲染后的真实数据（确保是响应式更新后的结果）
    const updatedTodos = wrapper.vm.todos;
    expect(updatedTodos[0].done).toBe(true);
  });
});})

    // })

    // wrapper.find('input').setValue('New todo')
    // const findEl =  wrapper.find("#app > div.semi-transparent-background > button")
    // console.log(findEl[0], 'find')
    // addButton.trigger('click')
    // expect(wrapper.findAll('li').length).toBe(1)
    // findEl.trigger('click')
    // await wrapper.find("#app > div.semi-transparent-background > button").trigger('click')

    // await wrapper.find("#app > div:nth-child(2) > ul > li > input[type=checkbox]").setValue(true)
    
    // expect(wrapper.find("#app > div:nth-child(2) > ul > li > input[type=checkbox]").attributes('value')).toBe("true")
//   })

