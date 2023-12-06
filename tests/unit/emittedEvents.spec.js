import { ref } from 'vue'
import { mount } from '@vue/test-utils'

const Component = {
  template: `
    <div>
      <button data-test="button" @click="increment">Increment</button>
    </div>
  `,
  emits: ['increment'],
  setup (props, context) {
    const count = ref(0)
    const increment = () => {
      count.value += 1
      context.emit('increment', count.value)
    }

    return {
      count,
      increment
    }
  }
}

// Case 2: count 的初始值為 0。
test('The initial value of count is 0', async () => {
  const wrapper = mount(Component)
  
  expect(wrapper.vm.count).toBe(0)
})

// Case 3: click 後觸發 emit('increment') 事件。
test('emits an event when clicked', async () => {
  const wrapper = mount(Component)
  
  await wrapper.get('[data-test="button"]').trigger('click')
  
  expect(wrapper.emitted()).toHaveProperty('increment')
})

// Case 4: emit('increment') 將最新的 count 值拋出。
test('after clicked, it will emit value 1', async () => {
  const wrapper = mount(Component)
  
  await wrapper.get('[data-test="button"]').trigger('click')
  
  const incrementEvent = wrapper.emitted('increment')
  
  expect(incrementEvent[0]).toEqual([1])
})