$(document).ready(function () {
    $('#nombre').on('input', function () {
      const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
      if (!regex.test($(this).val())) {
        $(this).removeClass('is-valid').addClass('is-invalid');
        $('#nombreError').text('El nombre solo debe contener letras.');
      } else {
        $(this).removeClass('is-invalid').addClass('is-valid');
        $('#nombreError').text('');
      }
    });

    $('#apellidos').on('input', function () {
      const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
      if (!regex.test($(this).val())) {
        $(this).removeClass('is-valid').addClass('is-invalid');
        $('#apellidosError').text('El apellido solo debe contener letras.');
      } else {
        $(this).removeClass('is-invalid').addClass('is-valid');
        $('#apellidosError').text('');
      }
    });

    $('#gmail').on('input', function () {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test($(this).val())) {
        $(this).removeClass('is-valid').addClass('is-invalid');
        $('#gmailError').text('Ingrese un correo electrónico válido.');
      } else {
        $(this).removeClass('is-invalid').addClass('is-valid');
        $('#gmailError').text('');
      }
    });

    $('#celular').on('input', function () {
      const regex = /^9[0-9]{8}$/;
      if (!regex.test($(this).val())) {
        $(this).removeClass('is-valid').addClass('is-invalid');
        $('#celularError').text('Debe comenzar con 9 y tener 9 dígitos.');
      } else {
        $(this).removeClass('is-invalid').addClass('is-valid');
        $('#celularError').text('');
      }
    });

    $('#consultaForm').on('submit', function (e) {
      e.preventDefault();
      if ($('.is-invalid').length === 0) {
        Swal.fire({
          title: 'Consulta registrada',
          text: 'Su consulta ha sido registrada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.submit();
        });
      } else {
        Swal.fire({
          title: 'Errores en el formulario',
          text: 'Corrija los campos marcados en rojo antes de enviar.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  });