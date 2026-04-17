import Swal from 'sweetalert2';

const NexoraSwal = Swal.mixin({
    customClass: {
        container: 'nexora-swal-container',
        popup: 'nexora-swal-popup',
        title: 'nexora-swal-title',
        confirmButton: 'nexora-swal-confirm',
        cancelButton: 'nexora-swal-cancel',
        icon: 'nexora-swal-icon'
    },
    buttonsStyling: false,
    color: '#0f172a',
    background: '#ffffff',
    scrollbarPadding: false,
});

export const confirmDestructive = async (title, text, confirmText = 'Confirm Action') => {
    return NexoraSwal.fire({
        title: title.toUpperCase(),
        html: `<p style="font-family: serif; font-style: italic; font-size: 14px; color: #64748b;">${text}</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: 'CANCEL',
        reverseButtons: true,
        iconColor: '#b91c1c',
    });
};

export default NexoraSwal;
