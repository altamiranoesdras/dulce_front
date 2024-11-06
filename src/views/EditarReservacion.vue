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
              <button type="submit" class="btn btn-primary">Actualizar</button>
              <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Columna para la tabla y formulario de servicios -->
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header">
            <h5>Servicios de la Reservación</h5>
          </div>
          <div class="card-body">
            <table class="table table-sm table-bordered table-striped">
              <thead>
              <tr>
                <th>Descripción</th>
                <th>Tipo de Servicio</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-show="servicios.length==0">
                <td colspan="3" class="text-center">No hay servicios registrados</td>
              </tr>
              <tr v-for="servicio in servicios" :key="servicio.id">
                <td>{{ servicio.descripcion }}</td>
                <td>{{ servicio.tipo_servicio_descripcion }}</td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="eliminarServicio(servicio)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Formulario para agregar un nuevo servicio -->
        <div class="card">
          <div class="card-header">
            <h5>Agregar Servicio</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="agregarServicio">
              <div class="mb-3">
                <label for="tipo_servicio" class="form-label">Tipo de Servicio</label>
                <select id="tipo_servicio" v-model="nuevoServicio.id_tipo_servicio" class="form-control" required>
                  <option v-for="tipo in tiposServicios" :key="tipo.id" :value="tipo.id">{{ tipo.descripcion }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <input type="text" id="descripcion" v-model="nuevoServicio.descripcion" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Agregar Servicio</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
  name: 'EditarReservacion',
  data() {
    return {
      form: {
        nombre_cliente: '',
        fecha: '',
        hora: '',
        numero_personas: 1,
      },
      servicios: [],
      tiposServicios: [], // Lista de tipos de servicios para el selector
      nuevoServicio: {
        descripcion: '',
        id_tipo_servicio: null,
        id_reservacion: null,
      },
    };
  },
  async created() {
    await this.cargarReservacion();
    await this.cargarServicios();
    await this.cargarTiposServicios();
  },
  methods: {
    async cargarReservacion() {
      try {
        const id = this.$route.params.id;
        const response = await api.get(`/reservaciones/${id}`);
        const reservacion = response.data[0];

        this.form = {
          nombre_cliente: reservacion.nombre_cliente,
          fecha: moment(reservacion.fecha).format('YYYY-MM-DD'),
          hora: reservacion.hora,
          numero_personas: reservacion.numero_personas,
        };
        this.nuevoServicio.id_reservacion = reservacion.id;
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al cargar la reservación', 'error');
        console.error('Error al cargar la reservación:', error);
      }
    },
    async cargarServicios() {
      try {
        const id_reservacion = this.$route.params.id;
        const response = await api.get(`/servicios_reservacion/${id_reservacion}`);
        this.servicios = response.data;
      } catch (error) {
        const message = error.response.data || 'Hubo un problema al cargar los servicios de la reservación';
        Swal.fire('Advertencia', message, 'warning');
        console.error('Error al cargar los servicios:', error);
      }
    },
    async cargarTiposServicios() {
      try {
        const response = await api.get('/tipos_servicios');
        this.tiposServicios = response.data;
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al cargar los tipos de servicios', 'error');
        console.error('Error al cargar los tipos de servicios:', error);
      }
    },
    async agregarServicio() {
      try {
        this.nuevoServicio.id_reservacion = this.$route.params.id;
        await api.post(`/servicios_reservacion`, this.nuevoServicio);
        Swal.fire('Agregado', 'El servicio fue agregado exitosamente', 'success');
        this.cargarServicios();
        this.nuevoServicio.descripcion = '';
        this.nuevoServicio.id_tipo_servicio = null;
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el servicio', 'error');
        console.error('Error al agregar el servicio:', error);
      }
    },
    async eliminarServicio(servicio) {
      try {
        await api.delete(`/servicios_reservacion/${servicio.id}`);
        Swal.fire('Eliminado', 'El servicio fue eliminado exitosamente', 'success');
        this.cargarServicios();
      } catch (error) {
        const message = error.response.data || 'Hubo un problema al eliminar el servicio';
        Swal.fire('Advertencia', message, 'warning');
        console.error('Error al eliminar el servicio:', error);
      }
    },
    async handleSubmit() {
      try {
        const id = this.$route.params.id;
        await api.put(`/reservaciones/${id}`, this.form);
        Swal.fire('Actualizado', 'La reservación fue actualizada exitosamente', 'success');
        this.$router.push('/reservaciones');
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al actualizar la reservación', 'error');
        console.error('Error al actualizar la reservación:', error);
      }
    },
    cancelar() {
      this.$router.push('/reservaciones');
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
