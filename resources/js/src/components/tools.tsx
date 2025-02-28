import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

/**
 * Menampilkan konfirmasi delete dengan SweetAlert
 * @param selectedRecords - Data yang dipilih untuk dihapus
 * @param deleteCategory - Fungsi untuk menghapus data
 * @param storeId - ID Store terkait
 * @param refetch - Fungsi untuk refresh data setelah delete
 */
export const deleteConfirmation = async (
    selectedRecords: any[],
    deleteCategory: (params: { storeId: string; id: string }) => any,
    refetch: () => void,
    storeId?: string,
) => {
    if (!selectedRecords.length) {
        Swal.fire({
            icon: "info",
            title: "No Selection",
            text: "Please select at least one record to delete.",
            // customClass: "sweet-alerts",
            customClass: {
                popup: "sweet-alerts", 
                confirmButton: "btn-confirm", 
                cancelButton: "btn-cancel", 
            },
        });
        return;
    }

    const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        padding: "2em",
        // customClass: "sweet-alerts",
        customClass: {
            popup: "sweet-alerts", 
            confirmButton: "btn-confirm", 
            cancelButton: "btn-cancel", 
        },
    });

    if (result.isConfirmed) {
        try {
            // Iterasi dan hapus setiap item
            // const deletePromises = selectedRecords.map((record) =>
            //     deleteCategory({ storeId, id: record.id }).unwrap()
            // );

            const deletePromises = selectedRecords.map((record: any) => {
                const params = storeId ? { storeId, id: record.id } : record.id;
                // console.log(params)
                return deleteCategory(params);
            });

            // Tunggu semua penghapusan selesai
            await Promise.all(deletePromises);

            // Tampilkan notifikasi sukses
            Swal.fire({
                title: "Deleted!",
                text: "Selected records have been deleted.",
                icon: "success",
                // customClass: "sweet-alerts",
                customClass: {
                    popup: "sweet-alerts", 
                    confirmButton: "btn-confirm", 
                    cancelButton: "btn-cancel", 
                },
            });

            // Refresh data setelah delete
            refetch();
        } catch (error) {
            console.error("Error deleting users:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting records.",
                icon: "error",
                // customClass: "sweet-alerts",
                customClass: {
                    popup: "sweet-alerts", 
                    confirmButton: "btn-confirm", 
                    cancelButton: "btn-cancel", 
                },
            });
        }
    }
};


export function capitalizeFirstLetter(str: string): string {
    // return str.charAt(0).toUpperCase() + str.slice(1);
    return str
        .split('-') // Pisahkan kata berdasarkan tanda '-'
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
        .join(' '); // Gabungkan kembali dengan spasi
}

export const generateSlug = (text:any) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter non-alphanumeric
        .replace(/\s+/g, '-')        // Ganti spasi dengan tanda hubung
        .replace(/-+/g, '-');        // Ganti tanda hubung berulang dengan satu tanda hubung
};

export const formatRupiah = (number: number): string => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Menghilangkan desimal
    }).format(number);
};

export const formatNumber = (num: any) => {
    return num?.toLocaleString(); // Format angka dengan titik setiap 3 digit
};

export const formatDate = (dateString: string | number | Date): string => {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta',
    }).format(new Date(dateString));
};

export const entityUrl = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const entity = pathnames[0];

    return entity;
}

/**
 * Mengubah kata tunggal menjadi bentuk plural.
 * @param {string} word - Kata yang akan diubah.
 * @returns {string} - Kata dalam bentuk plural.
 */
export const toPlural = (word) => {
    // Aturan dasar untuk mengubah kata menjadi plural
    const pluralRules = [
        { pattern: /(s|sh|ch|x|z)$/i, replace: '$1es' }, // Kata yang berakhiran s, sh, ch, x, z
        { pattern: /([^aeiou])y$/i, replace: '$1ies' }, // Kata yang berakhiran y dan didahului oleh konsonan
        { pattern: /(f|fe)$/i, replace: 'ves' }, // Kata yang berakhiran f atau fe
        { pattern: /(o)$/i, replace: '$1es' }, // Kata yang berakhiran o
    ];

    // Cek aturan plural
    for (const rule of pluralRules) {
        if (rule.pattern.test(word)) {
            return word.replace(rule.pattern, rule.replace);
        }
    }

    // Default: tambahkan 's' di akhir kata
    return word + 's';
}

/**
 * Mengubah kata atau kalimat menjadi format slug.
 * @param {string} text - Teks yang akan diubah.
 * @returns {string} - Teks dalam format slug.
 */
export const toSlug = (text) => {
    return text
        .toLowerCase() // Ubah ke huruf kecil
        .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung (-)
        .replace(/[^\w\-]+/g, '') // Hapus karakter non-alphanumeric (kecuali tanda hubung)
        .replace(/\-\-+/g, '-') // Ganti multiple tanda hubung dengan satu tanda hubung
        .replace(/^-+/, '') // Hapus tanda hubung di awal
        .replace(/-+$/, ''); // Hapus tanda hubung di akhir
}