import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import HomePage from '../components/views/HomePage.vue'
import ExperimentStart from '../components/views/ExperimentStart.vue'
import ParamdigmSelect from '../components/views/ParamdigmSelect.vue'
import EvaluateResult from '../components/views/EvaluateResult.vue'
import ExperimentChoice from '../components/views/ExperimentChoice.vue'
import ExperimentResultOfSomeone from '../components/views/ExperimentResultOfSomeone.vue'
import ParadigmDetail from '../components/views/ParadigmDetail.vue'
import ExperimentWindow from '../components/evaluateResult/experimentWindow.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/start',component:ExperimentStart},
        {
            path: '/result',
            component: EvaluateResult
        },
        {
            path:'/result/detail/:id',
            component:ExperimentWindow
        },   

        { path: '/paramdigm',component:ParamdigmSelect},
        { path: '/choice',component:ExperimentChoice},
        { path: '/result/details',component:ExperimentResultOfSomeone},
        { path: '/paramdigm/paradigmVideo',component:ParadigmDetail},

    ]
}); 
export default router;