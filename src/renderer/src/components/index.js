import Portal from './Portal/index.vue'
import CheckBar from './CheckBar/index.vue'
import Tips from './Tips/index.vue'
import Modal from './Modal/index'
import { directive_loading } from './ViewLoading/index.js'
import * as Upload from './Upload/index'
export default function install(app) {
  app.component('Portal', Portal)
  app.component('CheckBar', CheckBar)
  app.component('Tips', Tips)
  app.component('UploadImg', Upload.Img)
  app.component('UploadFile', Upload.File)
  directive_loading(app)
}

export { Modal }
