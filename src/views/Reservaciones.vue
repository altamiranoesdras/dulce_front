
<template>
  <div>
    <!-- Título de la página con botón para crear una nueva reservación -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestión de Reservaciones</h1>
      <button class="btn btn-primary" @click="crearReservacion">
        <i class="fas fa-plus"></i> Nueva Reservación
      </button>
    </div>

    <!-- Listado de reservaciones -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5>Listado de Reservaciones</h5>
          </div>
          <div class="card-body">
            <table class="table table-sm table-bordered table-striped">
              <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Cliente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Número de Personas</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="reservacion in reservaciones" :key="reservacion.id">
                <td>{{ reservacion.id }}</td>
                <td>{{ reservacion.nombre_cliente }}</td>
                <td>{{ formatFecha(reservacion.fecha) }}</td>
                <td>{{ formatHora(reservacion.hora) }}</td>
                <td>{{ reservacion.numero_personas }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editarReservacion(reservacion.id)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="eliminarReservacion(reservacion.id)">Eliminar</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      reservaciones: [],
    };
  },
  methods: {
    formatFecha(fecha) {
      if (!fecha) return "";
      return new Date(fecha).toLocaleDateString();
    },
    formatHora(hora) {
      if (!hora) return "";
      return new Date(hora).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
    async fetchReservaciones() {
      try {
        const response = await api.get("/reservaciones");
        this.reservaciones = response.data;
      } catch (error) {
        console.error("Error al obtener reservaciones:", error);
      }
    },
    crearReservacion() {
      this.$router.push("/crear-reservacion");
    },
    editarReservacion(id) {
      this.$router.push(`/editar-reservacion/${id}`);
    },
    async eliminarReservacion(id) {
      try {
        await api.delete(`/reservaciones/${id}`);
        this.fetchReservaciones();
      } catch (error) {
        console.error("Error al eliminar la reservación:", error);
      }
    },
  },
  mounted() {
    this.fetchReservaciones();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
