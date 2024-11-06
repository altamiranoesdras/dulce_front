import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Reservaciones from "@/views/Reservaciones.vue";
import TiposServicio from '../views/TiposServicio.vue';
import CrearReservacion from "@/views/CrearReservacion.vue";
import EditarReservacion from "@/views/EditarReservacion.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/reservaciones', name: 'Reservaciones', component: Reservaciones },
    { path: '/crear-reservacion', name: 'CrearReservacion', component: CrearReservacion },
    { path: '/editar-reservacion/:id', name: 'EditarReservacion', component: EditarReservacion, props: true },
    { path: '/tipos-servicio', name: 'TiposServicio', component: TiposServicio },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
