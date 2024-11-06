
<template>
  <div>
    <!-- Título de la página -->
    <h1 class="mb-4">Gestión de Tipos de Servicio</h1>
    <div class="row">
      <!-- Formulario para agregar o editar tipos de servicio -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>{{ editMode ? 'Editar Tipo de Servicio' : 'Agregar Tipo de Servicio' }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="descripcionTipoServicio" class="form-label">Descripción del Tipo de Servicio</label>
                <input
                    type="text"
                    id="descripcionTipoServicio"
                    v-model="form.descripcion"
                    class="form-control"
                    required
                />
              </div>
              <button type="submit" class="btn btn-primary" style="margin-right: 1rem !important;">
                {{ editMode ? 'Actualizar' : 'Agregar' }}
              </button>
              <button type="button" class="btn btn-secondary" v-if="editMode" @click="cancelEdit">Cancelar</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Tabla para listar tipos de servicio -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5>Listado de Tipos de Servicio</h5>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="tipo in tiposServicio" :key="tipo.id">
                <td>{{ tipo.id }}</td>
                <td>{{ tipo.descripcion }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editTipo(tipo)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="deleteTipo(tipo.id)">Eliminar</button>
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
      tiposServicio: [],
      form: {
        descripcion: "",
      },
      editMode: false,
      editId: null,
    };
  },
  methods: {
    async fetchTiposServicio() {
      try {
        const response = await api.get("/tipos_servicios");
        this.tiposServicio = response.data;
      } catch (error) {
        console.error("Error al obtener tipos de servicio:", error);
      }
    },
    async handleSubmit() {
      try {
        if (this.editMode) {
          await api.put(`/tipos_servicios/${this.editId}`, { descripcion: this.form.descripcion });
          this.editMode = false;
          this.editId = null;
        } else {
          await api.post("/tipos_servicios", { descripcion: this.form.descripcion });
        }
        this.form.descripcion = "";
        this.fetchTiposServicio();
      } catch (error) {
        console.error("Error al guardar el tipo de servicio:", error);
      }
    },
    editTipo(tipo) {
      this.form.descripcion = tipo.descripcion;
      this.editMode = true;
      this.editId = tipo.id;
    },
    cancelEdit() {
      this.editMode = false;
      this.editId = null;
      this.form.descripcion = "";
    },
    async deleteTipo(id) {
      try {
        await api.delete(`/tipos_servicios/${id}`);
        this.fetchTiposServicio();
      } catch (error) {
        console.error("Error al eliminar el tipo de servicio:", error);
      }
    },
  },
  mounted() {
    this.fetchTiposServicio();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
