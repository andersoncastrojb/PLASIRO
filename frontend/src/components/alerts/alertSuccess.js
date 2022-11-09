import Swal from 'sweetalert2'

const AlertSuccess = (props) => {
    Swal.fire({
        icon: 'warning',
        title: '¡MUY BIEN!',
        text: props.text,
    })
}

export default AlertSuccess;