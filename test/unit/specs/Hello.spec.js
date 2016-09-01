import Vue from 'vue'
// import Hello from 'src/components/Hello'

// describe('Hello.vue', () => {
//   it('should render correct contents', () => {
//     const vm = new Vue({
//       template: '<div><hello></hello></div>',
//       components: { Hello }
//     }).$mount()
//     expect(vm.$el.querySelector('.hello h1').textContent).to.contain('Hello World!')
//   })
// })

import { updateState } from 'src/vuex/mutations/dataMutations'

describe('updateState', () => {
  it('将修改state值', () => {
    const state = {
      'friends': {
        '11': {
          note: 'la',
        },
      },
    }
    updateState(state, 'friends', {
      '22': {
        note: 'kong',
      },
    })
    expect(state).to.be({
      'friends': {
        '11': {
          note: 'la',
        },
        '22': {
          note: 'kong',
        },
      },
    })
  })
})