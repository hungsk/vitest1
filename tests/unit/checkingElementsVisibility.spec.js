import { mount, shallowMount } from '@vue/test-utils'

const Component = {
    template: `
      <nav>
        <a id="user" href="/profile">My Profile</a>
        <ul v-show="expandDropdown" id="user-dropdown">
          <!-- dropdown content -->
        </ul>
      </nav>
    `,
    data () {
      return {
        expandDropdown: false
      }
    }
  }

  test('does not show the user dropdown', () => {
    const wrapper = mount(Component)
  
    expect(wrapper.get('#user-dropdown').isVisible()).toBe(false)
  })