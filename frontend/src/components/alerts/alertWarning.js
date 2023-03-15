import Swal from 'sweetalert2'

const AlertWarning = (props) => {
    Swal.fire({
        icon: 'warning',
        title: '¡Ups!',
        text: props.text,
        timer: 2000,
        timerProgressBar: true,
    })
}

export default AlertWarning;