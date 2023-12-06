import { ref } from 'vue'
import { mount } from '@vue/test-utils'

const Component = {
  template: `
    <div>
      <input type="email" v-model="email" data-test="email" />
    </div>
  `,
  setup () {
    const email = ref('')

    return {
      email
    }
  }
}

// Case 1：於 input 輸入值 my@mail.com 後，是否有輸入成功
test('value of input element should be my@mail.com', async () => {
    const wrapper = mount(Component)
    const input = wrapper.get('[data-test="email"]')
  
    await input.setValue('my@mail.com')
  
    expect(input.element.value).toBe('my@mail.com')
  })

//Case 2: 於 input 輸入值 my@mail.com 後，email 是否有相對應的值
  test('after setted value, value of email should be my@mail.com', async () => {
    const wrapper = mount(Component)
  
    await wrapper.get('[data-test="email"]').setValue('my@mail.com')
  
    expect(wrapper.vm.email).toBe('my@mail.com')
  })