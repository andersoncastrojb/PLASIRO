import Swal from 'sweetalert2'

const AlertSuccess = (props) => {
    Swal.fire({
        icon: 'success',
        title: '¡MUY BIEN!',
        text: props.text,
    })
}

export default AlertSuccess;