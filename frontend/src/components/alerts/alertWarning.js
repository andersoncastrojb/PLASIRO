import Swal from 'sweetalert2'

const AlertWarning = (props) => {
    Swal.fire({
        icon: 'warning',
        title: '¡Ups!',
        text: props.text,
    })
}

export default AlertWarning;