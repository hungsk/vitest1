import { ref, computed } from 'vue'
import { mount } from '@vue/test-utils'


const Component = {
  template: `
    <div>
      <input data-test="password" v-model="password">
      <p v-if="showError && isError" data-test="errorMsg">Password must be at least {{minLength}} characters.</p>
    </div>
  `,
  props: {
    minLength: {
      type: Number,
      required: true
    },
    showError: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const password = ref('')
    const isError = computed(() => password.value.length < props.minLength)

    return {
      isError,
      password
    }
  }
}

describe('Props & Computed', () => {
    let wrapper
    const minLength = 6
    beforeEach(() => {
      wrapper = mount(Component, {
        props: {
          minLength
        }
      })
    })
    
    // Case 1: 密碼在大於或等於最短長度限制時，不會出現錯誤訊息。
    test(`not renders an error if length is more than or equal to ${minLength}`, async () => {
      await wrapper.get('[data-test="password"]').setValue('123456')
  
      expect(wrapper.find('[data-test="errorMsg"]').exists()).toBe(false)
    })
  
    // Case 2: 密碼少於最短長度限制時，出現錯誤訊息。
    test(`renders an error if length is less than ${minLength}`, async () => {
      await wrapper.get('[data-test="password"]').setValue('12345')
  
      expect(wrapper.html()).toContain(`Password must be at least ${minLength} characters`)
    })
  
    // Case 3: 當 showError 為 false 時，不顯示錯誤訊息。
    test('not renders an error if showError is false ', async () => {
      await wrapper.get('[data-test="password"]').setValue('12345')
  
      expect(wrapper.html()).toContain(`Password must be at least ${minLength} characters`)
  
      await wrapper.setProps({ showError: false })
  
      expect(wrapper.find('[data-test="errorMsg"]').exists()).toBe(false)
    })
  })