
<template>
  <div class="container">
    <h1 class="mb-4">Crear Nueva Reservación</h1>
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
          <button type="submit" class="btn btn-primary">Guardar</button>
          <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
        </form>
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
    async handleSubmit() {
      try {
        await api.post("/reservaciones", this.form);
        this.$router.push("/reservaciones"); // Redirigir a la lista de reservaciones después de guardar
      } catch (error) {
        console.error("Error al crear la reservación:", error);
      }
    },
    cancelar() {
      this.$router.push("/reservaciones");
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
