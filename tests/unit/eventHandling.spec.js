import { ref } from 'vue'
import { mount } from '@vue/test-utils'

const Component = {
  template: `
    <div>
      <button data-test="button" @click="increment">Increment</button>
      <p data-test="count">{{count}}</p>
    </div>
  `,
  setup () {
    const count = ref(0)
    const increment = () => {
      count.value += 1
    }

    return {
      count,
      increment
    }
  }
}

// Case 1: button 應該要存在。 
test('render button', () => {
  const wrapper = mount(Component)
  
  expect(wrapper.get('[data-test="button"]').exists()).toBe(true)
})
  
// Case 2: count 的初始值為 0。
test('The initial value of count is 0', () => {
  const wrapper = mount(Component)
  
  expect(wrapper.get('[data-test="count"]').text()).toBe('0')
})
  
// Case 3: click 一次 button 後，count 的值變成 1。
test('after click, count will be 1', async () => {
  const wrapper = mount(Component)
  
  await wrapper.get('[data-test="button"]').trigger('click')
  
  expect(wrapper.get('[data-test="count"]').text()).toBe('1')
})  