
<template>
  <div class="container">
    <h1 class="mb-4">Editar Reservación</h1>
    <div class="row">
      <!-- Columna para el formulario de la reservación -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="nombre_cliente" class="form-label">Nombre del Cliente</label>
                <input type="text" id="nombre_cliente" v-model="form.nombre_cliente" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input type="date" id="fecha" v-model="form.fecha" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="hora" class="form-label">Hora</label>
                <input type="text" id="hora" v-model="form.hora" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="numero_personas" class="form-label">Número de Personas</label>
                <input type="number" id="numero_personas" v-model="form.numero_personas" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
              <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
            </form>
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
      form: {
        nombre_cliente: "",
        fecha: "",
        hora: "",
        numero_personas: 1,
      },
    };
  },
  methods: {
    async fetchReservacion() {
      const id = this.$route.params.id;
      try {
        const response = await api.get(`/reservaciones/${id}`);
        this.form = response.data;
      } catch (error) {
        console.error("Error al obtener los datos de la reservación:", error);
      }
    },
    async handleSubmit() {
      const id = this.$route.params.id;
      try {
        await api.put(`/reservaciones/${id}`, this.form);
        this.$router.push("/reservaciones"); // Redirigir a la lista de reservaciones
      } catch (error) {
        console.error("Error al actualizar la reservación:", error);
      }
    },
    cancelar() {
      this.$router.push("/reservaciones");
    },
  },
  mounted() {
    this.fetchReservacion();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
