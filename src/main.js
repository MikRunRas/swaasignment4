import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import MenuComponent from './components/MenuComponent.vue'
import ProfileComponent from './components/ProfileComponent.vue'
import HighScoreComponent from './components/HighscoreComponent.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //{ path: '/', component: GameComponent },
        { path: '/user/:userId', name: 'UserProfile', component: ProfileComponent, props: route => ({ userId: route.params.userId }) },
        { path: '/highscores/:userId', name: 'Highscores', component: HighScoreComponent, props: route => ({ userId: route.params.userId }) },
    ]
});

const app = createApp(App)
app.component("MenuComponent", MenuComponent)
app.use(router);

app.mount('#app')