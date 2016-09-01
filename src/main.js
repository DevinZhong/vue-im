/**
 * @ignore  =====================================================================================
 * @fileoverview 应用入口脚本
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-31
 * @ignore  =====================================================================================
 */

import router from './router'
import App from './App'


/**
 * 将App组件作为根组件启动应用
 */
router.start(App, 'app')
