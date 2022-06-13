import PopupDialog from '@/components/PopupDialog'
import NewsPopupDialog from '@/components/PopupDialog/newsPopup'
import Vue from 'vue'

function create(Component) {
  return ({ className, ...props }, slots = {}) => {
    return new Promise((resolve,) => {
      const node = document.createElement('div')
      document.body.appendChild(node)

      const
        ok = data => {
          resolve(data)
          vm.$el.parentNode.removeChild(vm.$el);
        },
        cancel = () => {
          vm.$el.parentNode.removeChild(vm.$el);
        }
      const vm = new Vue({
        el: node,
        data() {
          return { props }
        },
        render(h) {
          return h(Component, {
            slots,
            props,
            ref: 'modal',
            'class': className,
            on: {
              ok,
              cancel
            }
          })
        },
        mounted() {
          this.$refs.modal.show()
        }
      })
    })
  }
}

export const Popup = {
  create: create(PopupDialog)
}

export const NewsPopup = {
  create: create(NewsPopupDialog)
}