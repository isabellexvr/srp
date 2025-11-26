import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function FlashMessages() {
    const { props } = usePage();
    const flash = props.flash || {};
    
    // Log para debugging (remova depois que estiver funcionando)
    console.log('Flash props:', flash);

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
        
        if (flash.error) {
            toast.error(flash.error);
        }
        
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return null;
}