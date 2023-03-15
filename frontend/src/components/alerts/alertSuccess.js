import Swal from 'sweetalert2'

const AlertSuccess = (props) => {
    Swal.fire({
        icon: 'success',
        title: '¡MUY BIEN!',
        text: props.text,
        timer: 2000,
        timerProgressBar: true,
    })
}

export default AlertSuccess;