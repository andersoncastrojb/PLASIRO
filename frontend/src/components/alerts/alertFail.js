import Swal from 'sweetalert2'

const AlertFail = (props) => {
    Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: props.text,
    })
}

export default AlertFail;