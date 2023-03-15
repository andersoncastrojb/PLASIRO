import Swal from 'sweetalert2'

const AlertFail = (props) => {
    Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: props.text,
        timer: 2000,
        timerProgressBar: true,
    })
}

export default AlertFail;